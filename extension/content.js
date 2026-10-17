/* Native YouTube inline-preview adapter. No iframe or remote extension code. */
(() => {
  'use strict';
  const KEY = Symbol.for('shorts-inplace-preview.v1');
  window[KEY]?.dispose();
  const listeners = new AbortController();
  const records = new Map();
  const nativeOptions = new WeakMap();
  const nativeVisibility = new Map();
  let active = null;
  let pending = null;
  let scanTimer = null;
  let sequence = 0;
  let navigating = false;
  let disposed = false;
  const SHORTS_CARD = 'ytm-shorts-lockup-view-model, ytd-reel-item-renderer, ytd-rich-item-renderer';
  const RELATED_CARD = 'yt-lockup-view-model, ytd-compact-video-renderer';
  const CARD = SHORTS_CARD + ', ' + RELATED_CARD;

  function videoId(href) {
    try {
      const u = new URL(href, location.origin);
      if (u.origin !== location.origin) return null;
      const id = u.pathname === '/watch' ? u.searchParams.get('v')
        : /^\/shorts\/([A-Za-z0-9_-]{11})\/?$/.exec(u.pathname)?.[1];
      return /^[A-Za-z0-9_-]{11}$/.test(id || '') ? id : null;
    } catch { return null; }
  }
  function settings() { try { return JSON.parse(document.documentElement.dataset.sipSettings || '{}'); } catch { return {}; } }
  function home() { return location.pathname === '/' && !navigating; }
  function watchPage() { return location.pathname === '/watch' && !navigating; }
  function enabled() { return home() || watchPage(); }
  function inScope(record) {
    return record.kind === 'shorts'
      ? settings().homeShorts === true && home() && !!record.card.closest('ytd-browse[page-subtype="home"] ytd-rich-shelf-renderer')
      : settings().watchRelated === true && watchPage() && !!record.card.closest('ytd-watch-next-secondary-results-renderer');
  }
  function status(value) { document.documentElement.dataset.sipStatus = value; }
  function controller(el) { return el?.polymerController || el?.inst || el; }
  function listen(target, name, handler, options = {}) {
    target.addEventListener(name, handler, { ...options, signal: listeners.signal });
  }
  function restoreNativeVisibility(video) {
    const previous = nativeVisibility.get(video);
    if (!previous) return;
    if (video.style.getPropertyValue('display') === 'block' &&
        video.style.getPropertyPriority('display') === 'important') {
      if (previous.value) video.style.setProperty('display', previous.value, previous.priority);
      else video.style.removeProperty('display');
    }
    video.removeAttribute('data-sip-native-visible');
    nativeVisibility.delete(video);
  }
  function visibleNativePreview(video) {
    const preview = video.closest('ytd-video-preview');
    if (!preview || preview.closest('.sip-surface') || !preview.isConnected || video.paused || video.readyState < 2) return false;
    const r = preview.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0 || getComputedStyle(preview).visibility === 'hidden') return false;
    const link = preview.querySelector('#media-container-link, a[href*="/watch?"]');
    try { const url = new URL(link?.getAttribute('href'), location.origin); return url.origin === location.origin && url.pathname === '/watch'; }
    catch { return false; }
  }
  function repairNativeVisibility() {
    for (const video of nativeVisibility.keys()) {
      if (!home() || !video.isConnected || !visibleNativePreview(video)) {
        restoreNativeVisibility(video);
      }
    }
    if (!home()) return;
    for (const preview of document.querySelectorAll('ytd-video-preview')) {
      if (preview.closest('.sip-surface')) continue;
      const video = preview.querySelector('video');
      if (!video || !visibleNativePreview(video) || getComputedStyle(video).display !== 'none') continue;
      if (!nativeVisibility.has(video)) nativeVisibility.set(video, {
        value: video.style.getPropertyValue('display'),
        priority: video.style.getPropertyPriority('display')
      });
      // Some injected cosmetic styles hide the video while audio/captions play.
      // Repair visibility only; keep YouTube's original player and hover logic.
      video.style.setProperty('display', 'block', 'important');
      video.setAttribute('data-sip-native-visible', '');
    }
  }
  function cancelPending() {
    if (pending) clearTimeout(pending.timer);
    pending = null;
  }
  function stop() {
    cancelPending();
    const s = active;
    active = null;
    if (!s) return;
    clearTimeout(s.timeout);
    s.events.abort();
    s.watch.disconnect();
    s.resize.disconnect();
    try { s.preview.opts = null; } catch { /* detached native wrapper */ }
    for (const v of s.surface.querySelectorAll('video')) {
      v.pause();
      v.removeAttribute('src');
      v.load();
    }
    try { s.component?.deactivate?.(); } catch { /* detached component */ }
    try { s.api?.cancelPlayback?.(); } catch { /* already destroyed */ }
    try { s.api?.stopVideo?.(); } catch { /* already destroyed */ }
    try { s.api?.destroy?.(); } catch { /* detached player */ }
    s.surface.remove();
    s.record.thumbnail.removeAttribute('data-sip-anchor');
    s.record.card.dataset.sipState = 'idle';
    status(enabled() ? 'ready' : 'inactive');
  }
  function fail(s, reason) {
    if (active !== s) return;
    const card = s.record.card;
    // Local initialization diagnostics; no requests or console output.
    card.dataset.sipDiagnostic = JSON.stringify({
      reason,
      width: s.record.thumbnail.clientWidth,
      height: s.record.thumbnail.clientHeight,
      previewConnected: s.preview.isConnected,
      previewChildren: s.preview.childElementCount,
      previewClass: s.preview.className,
      players: s.preview.querySelectorAll('ytd-player').length,
      videos: [...s.surface.querySelectorAll('video')].map(v => ({
        paused: v.paused, ready: v.readyState, time: v.currentTime,
        error: v.error?.code || null, display: getComputedStyle(v).display
      }))
    });
    stop();
    card.dataset.sipState = 'error';
    card.dataset.sipError = reason;
    status(reason);
  }
  function endpoint(id) {
    return {
      commandMetadata: { webCommandMetadata: {
        url: '/watch?v=' + id, webPageType: 'WEB_PAGE_TYPE_WATCH',
        rootVe: 3832, apiUrl: '/youtubei/v1/player'
      } },
      watchEndpoint: { videoId: id }
    };
  }
  function fullVideo(data, record) {
    const id = record.id;
    // Preserve native playback/signing parameters, but remove preview truncation.
    const ep = data?.inlinePlaybackEndpoint || endpoint(id);
    const watch = { ...(ep.watchEndpoint || {}), videoId: id };
    delete watch.startTimeSeconds;
    delete watch.endTimeSeconds;
    const inline = { ...ep, watchEndpoint: watch };
    delete inline.impStartTimeSeconds;
    return { ...data, inlinePlaybackEndpoint: inline,
      navigationEndpoint: data?.navigationEndpoint || (record.kind === 'shorts' ? {
        commandMetadata: { webCommandMetadata: { url: '/shorts/' + id } },
        reelWatchEndpoint: { videoId: id }
      } : endpoint(id)) };
  }
  function options(record, s) {
    const cached = nativeOptions.get(record.card);
    const data = Array.isArray(cached?.videoPreviewData)
      ? cached.videoPreviewData[0] : cached?.videoPreviewData;
    return {
      mediaRenderer: record.card, thumbnail: record.thumbnail,
      // Native preview repeats a one-item array when the whole video ends.
      videoPreviewData: [fullVideo(data, record)],
      isAutoplay: false, showPlayerControls: false, forceMutedVolume: true,
      forceCaptionsOff: true, centerCrop: false,
      mouseleaveCallback: () => { if (active === s && !document.documentElement.hasAttribute('data-pvc-dragging')) stop(); },
      onPlaybackResult: result => {
        if (active === s && result === 0) fail(s, 'native-preview-request-declined');
        if (active === s && result === 1) fail(s, 'native-playback-failed');
      }
    };
  }
  function attachVideo(s) {
    for (const v of s.surface.querySelectorAll('video')) {
      if (s.videos.has(v)) continue;
      s.videos.add(v);
      // Mark only the ancestor chain belonging to our own video. This works
      // with both legacy ID-based templates and the current CoW template.
      for (let part = v.parentElement; part && part !== s.surface; part = part.parentElement) {
        part.setAttribute('data-sip-player-part', '');
      }
      v.muted = true;
      v.defaultMuted = true;
      v.autoplay = true;
      v.playsInline = true;
      v.controls = false;
      v.loop = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      // Native API handles loop/stream renewal, not a short thumbnail animation.
      const playing = () => {
        if (active !== s) { v.pause(); return; }
        clearTimeout(s.timeout);
        s.surface.dataset.sipPlaying = '';
        s.record.card.dataset.sipState = 'playing';
        status('playing');
      };
      v.addEventListener('playing', playing, { signal: s.events.signal });
      if (!v.paused && v.readyState >= 2) playing();
      v.addEventListener('error', () => {
        if (v.error) fail(s, 'media-error-' + v.error.code);
      }, { signal: s.events.signal });
    }
  }
  async function start(record) {
    stop();
    if (!inScope(record) || !record.card.isConnected || !record.card.matches(':hover')) return;
    record.id = videoId(record.link.getAttribute('href'));
    if (!record.id) return;
    record.card.removeAttribute('data-sip-error');
    record.card.removeAttribute('data-sip-diagnostic');
    const surface = document.createElement('div');
    surface.className = 'sip-surface';
    surface.dataset.sipContext = record.kind;
    surface.setAttribute('aria-hidden', 'true');
    const preview = document.createElement('ytd-video-preview');
    surface.append(preview);
    record.thumbnail.setAttribute('data-sip-anchor', '');
    const s = { record, surface, preview, events: new AbortController(),
      videos: new WeakSet(), api: null, component: null };
    s.watch = new MutationObserver(() => attachVideo(s));
    s.watch.observe(surface, { childList: true, subtree: true });
    s.resize = new ResizeObserver(() => {
      if (active !== s || !s.component) return;
      const r = record.thumbnail.getBoundingClientRect();
      s.component.previewWidth = r.width;
      s.component.previewHeight = r.height;
      s.component.aspectRatio = r.width / r.height;
      s.api?.setSize?.(r.width, r.height);
    });
    active = s;
    record.card.dataset.sipState = 'loading';
    status('loading');
    record.thumbnail.append(surface);
    s.resize.observe(record.thumbnail);
    s.timeout = setTimeout(() => fail(s, 'player-initialization-timeout'), 15000);
    try {
      await customElements.whenDefined('ytd-video-preview');
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (active !== s) return;
      const pc = controller(preview);
      s.component = pc;
      if (typeof pc.handleOpenVideoPreviewAction !== 'function') {
        // Current YouTube CoW components expose reactive input properties
        // instead of the old Polymer controller methods. The opts setter
        // initializes the same native inline player and its playback loop.
        if ('opts' in preview) {
          const nativePlayer = controller(preview.querySelector('ytd-player'));
          const behavior = nativePlayer?.ytPlayerBehavior;
          if (!behavior) { fail(s, 'native-player-behavior-unavailable'); return; }
          // A second inline context otherwise resolves YouTube's shared
          // inline-preview-player, leaving our thumbnail container empty.
          const playerId = 'sip-native-' + (++sequence);
          nativePlayer.playerId = playerId;
          behavior.playerId = playerId;
          preview.previewWidth = record.thumbnail.clientWidth;
          preview.previewHeight = record.thumbnail.clientHeight;
          preview.aspectRatio = record.thumbnail.clientWidth / record.thumbnail.clientHeight;
          if (record.kind === 'related') {
            // The CoW preview rejects watch-page requests when YouTube's
            // watch-next inline feature is disabled. Initialize only our
            // private native player instead, using its video-ID loader.
            record.card.dataset.sipEngine = 'native-player';
            record.card.dataset.sipStage = 'player-requested';
            behavior.preparePlayer();
            const api = await behavior.getPlayerPromise();
            if (active !== s) { api?.cancelPlayback?.(); api?.destroy?.(); return; }
            s.api = api;
            record.card.dataset.sipStage = 'player-ready';
            if (typeof api.loadVideoById !== 'function') {
              fail(s, 'native-video-loader-unavailable'); return;
            }
            api.mute?.();
            api.setInlinePreview?.(true);
            api.setCenterCrop?.(false);
            api.loadVideoById({ videoId: record.id, startSeconds: 0 });
            api.playVideo?.();
            attachVideo(s);
            return;
          }
          preview.opts = options(record, s);
          record.card.dataset.sipEngine = 'native-cow';
          record.card.dataset.sipStage = 'player-requested';
          const api = await behavior.getPlayerPromise();
          if (active !== s) { api?.cancelPlayback?.(); api?.destroy?.(); return; }
          s.api = api;
          record.card.dataset.sipStage = 'player-ready';
          api.mute?.();
          api.setCenterCrop?.(false);
          attachVideo(s);
          return;
        }
        fail(s, 'native-preview-api-unavailable');
        return;
      }
      if (record.kind === 'related') {
        // This is our private, muted player, not YouTube's shared watch preview.
        // Some watch deployments disable that shared preview and only animate
        // the thumbnail. Use the home inline path on this instance alone.
        Object.defineProperty(pc, 'isWatchPage', { value: false, configurable: true });
      }
      const r = record.thumbnail.getBoundingClientRect();
      pc.previewWidth = r.width;
      pc.previewHeight = r.height;
      pc.aspectRatio = r.width / r.height;
      const player = controller(preview.querySelector('ytd-player'));
      if (player) player.playerId = 'sip-native-' + (++sequence);
      const outcome = await pc.handleOpenVideoPreviewAction(options(record, s));
      if (active !== s) return;
      if (outcome === 0 || outcome === 1) {
        fail(s, outcome === 0 ? 'native-preview-request-declined' : 'native-playback-failed');
        return;
      }
      if (typeof pc.getPlayerApiPromise === 'function') {
        const api = await pc.getPlayerApiPromise();
        if (active !== s) {
          api?.cancelPlayback?.(); api?.destroy?.();
          return;
        }
        s.api = api;
        api.mute?.();
        api.setCenterCrop?.(false);
        attachVideo(s);
      }
    } catch { fail(s, 'player-initialization-failed'); }
  }
  function hovered(event) {
    if (!enabled() || !(event.target instanceof Element)) return null;
    let el = event.target.closest(CARD);
    while (el) {
      if (records.has(el)) return records.get(el);
      el = el.parentElement?.closest(CARD);
    }
    return null;
  }
  function enter(event) {
    const record = hovered(event);
    if (!record || record.card.contains(event.relatedTarget)) return;
    stop();
    pending = { record, timer: setTimeout(() => {
      pending = null;
      void start(record);
    }, settings().hoverDelay || 375) };
  }
  function leave(event) {
    const record = hovered(event);
    if (record && !record.card.contains(event.relatedTarget) &&
        (active?.record === record || pending?.record === record)) stop();
  }
  function scan() {
    scanTimer = null;
    if (disposed) return;
    repairNativeVisibility();
    if (!enabled()) { stop(); records.clear(); status('inactive'); return; }
    for (const [card, record] of records) {
      if (!card.isConnected || !card.contains(record.thumbnail) ||
          !inScope(record) ||
          videoId(record.link.getAttribute('href')) !== record.id) {
        if (active?.record === record || pending?.record === record) stop();
        records.delete(card);
      }
    }
    const page = home()
      ? document.querySelector('ytd-browse[page-subtype="home"]')
      : document.querySelector('ytd-watch-flexy:not([hidden]) ytd-watch-next-secondary-results-renderer, ytd-watch-grid:not([hidden]) ytd-watch-next-secondary-results-renderer');
    if (!page) return;
    const kind = home() ? 'shorts' : 'related';
    const links = kind === 'shorts'
      ? page.querySelectorAll('ytd-rich-shelf-renderer a[href*="/shorts/"]')
      : page.querySelectorAll('a[href*="/watch?"], a[href*="/shorts/"]');
    for (const link of links) {
      const id = videoId(link.getAttribute('href'));
      if (!id || !link.querySelector('img')) continue;
      if (link.closest('ytd-ad-slot-renderer, ytd-in-feed-ad-layout-renderer')) continue;
      const card = link.closest(kind === 'shorts' ? SHORTS_CARD : RELATED_CARD);
      const imageHost = link.querySelector('yt-thumbnail-view-model, ytd-thumbnail');
      const thumbnail = (kind === 'shorts' ? imageHost?.parentElement : imageHost)
        || link.querySelector('img')?.parentElement;
      if (!card || !thumbnail || records.has(card) || !inScope({kind,card})) continue;
      records.set(card, { card, thumbnail, link, id, kind });
      card.dataset.sipState = 'idle';
    }
    document.documentElement.dataset.sipCards = String(records.size);
    if (!active) status('ready');
  }
  function scheduleScan() {
    if (active && (!active.record.card.isConnected || !inScope(active.record))) stop();
    if (!scanTimer) scanTimer = setTimeout(scan, 100);
  }
  // YouTube already installs preview handlers on Shorts and watch recommendations.
  // Capture their request data, and prevent a second player for these cards only.
  listen(document, 'yt-action', event => {
    const action = event.detail;
    if (!enabled() || !action || !(event.target instanceof Element) ||
        event.target.closest('.sip-surface')) return;
    const opts = action.args?.[0];
    const card = opts?.mediaRenderer?.closest?.(CARD) || event.target.closest(CARD);
    if (!records.has(card) || !inScope(records.get(card))) return;
    if (action.actionName === 'yt-open-video-preview-action') {
      nativeOptions.set(card, opts);
      event.stopImmediatePropagation();
    } else if (action.actionName === 'yt-terminate-video-preview-action') {
      event.stopImmediatePropagation();
    }
  }, { capture: true });
  listen(document, 'pointerover', enter, { capture: true, passive: true });
  listen(document, 'pointerout', leave, { capture: true, passive: true });
  listen(document, 'pvc-preview-exit', stop);
  // Do not preventDefault/stopPropagation: retain the original YouTube link.
  listen(document, 'click', event => { if (hovered(event)) stop(); }, { capture: true });
  listen(document, 'sip-settings-changed', event => { if (event.detail?.restart) stop(); scheduleScan(); });
  listen(document, 'yt-navigate-start', () => {
    navigating = true; stop(); records.clear(); repairNativeVisibility();
  });
  listen(document, 'yt-navigate-finish', () => { navigating = false; scheduleScan(); });
  listen(document, 'yt-page-data-updated', scheduleScan);
  listen(document, 'visibilitychange', () => { if (document.hidden) stop(); });
  for (const name of ['playing', 'loadeddata', 'timeupdate']) {
    listen(document, name, event => {
      if (home() && event.target instanceof HTMLVideoElement &&
          event.target.closest('ytd-video-preview') && !event.target.closest('.sip-surface')) {
        repairNativeVisibility();
      }
    }, { capture: true, passive: true });
  }
  listen(window, 'blur', stop);
  listen(window, 'pagehide', stop);
  listen(window, 'scroll', () => {
    if (!active) return;
    const r = active.record.thumbnail.getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= innerHeight) stop();
  }, { passive: true });
  const observer = new MutationObserver(mutations => {
    if (mutations.some(m => m.type === 'attributes' && ['active', 'class', 'hidden'].includes(m.attributeName) &&
        m.target instanceof Element && m.target.matches('ytd-video-preview') &&
        !m.target.closest('.sip-surface'))) repairNativeVisibility();
    // Ignore player animation/progress DOM changes.
    if (mutations.some(m => (m.type === 'childList' ||
        ['href', 'page-subtype', 'hidden'].includes(m.attributeName)) &&
        (!(m.target instanceof Element) || !m.target.closest('.sip-surface, ytd-video-preview')))) scheduleScan();
  });
  observer.observe(document.documentElement, {
    childList: true, subtree: true, attributes: true,
    attributeFilter: ['href', 'page-subtype', 'active', 'class', 'hidden']
  });
  window[KEY] = { dispose() {
    disposed = true;
    stop();
    clearTimeout(scanTimer);
    observer.disconnect();
    listeners.abort();
    for (const video of nativeVisibility.keys()) restoreNativeVisibility(video);
    records.clear();
    delete window[KEY];
  } };
  document.documentElement.dataset.sipVersion = '0.6.0';
  scheduleScan();
})();

