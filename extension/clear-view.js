(() => {
  'use strict';
  const key = '__lengedShortsClearView';
  window[key]?.dispose();
  const events = new AbortController();
  const records = new Map();
  const root = document.documentElement;
  root.dataset.scvVersion = '0.6.0';
  let mode = 'off';
  let frame = 0;
  let disposed = false;
  function on(target, name, fn, options = {}) {
    target.addEventListener(name, fn, { ...options, signal: events.signal });
  }
  function enabled() { return /^\/shorts\/[A-Za-z0-9_-]{11}\/?$/.test(location.pathname) && mode !== 'off'; }
  function remove(record) {
    record.anchor.removeAttribute('data-scv-video');
    record.metadata.removeAttribute('data-scv-metadata');
    record.card.removeAttribute('data-scv-card');
    record.card.removeAttribute('data-scv-reveal');
    records.delete(record.card);
  }
  function scan() {
    frame = 0;
    if (disposed) return;
    root.dataset.scvMode = mode;
    root.toggleAttribute('data-scv-page', enabled());
    for (const record of records.values()) {
      if (!enabled() || !record.card.isConnected || !record.card.contains(record.metadata) || !record.card.contains(record.anchor) || record.metadata.querySelector('yt-paid-content-overlay-renderer, ytm-paid-content-overlay-renderer, ytd-paid-content-overlay-renderer')) remove(record);
    }
    if (!enabled()) return;
    for (const card of document.querySelectorAll('ytd-reel-video-renderer')) {
      if (records.has(card)) continue;
      // Current native CoW metapanel, plus the legacy metadata wrapper.
      // Never select the entire overlay: action buttons and captions stay intact.
      const metapanel = card.querySelector('yt-reel-metapanel-view-model');
      let metadata = metapanel;
      const overlay = metapanel?.closest('yt-reel-player-overlay-view-model');
      if (metapanel && overlay) {
        while (metadata.parentElement && metadata.parentElement !== overlay &&
            !metadata.parentElement.querySelector('reel-action-bar-view-model')) metadata = metadata.parentElement;
      }
      metadata ||= card.querySelector('ytd-reel-player-overlay-renderer #metadata-container');
      const anchor = card.querySelector('#short-video-container');
      if (!metadata || !anchor) continue;
      // Leave paid-content/disclosure areas visible rather than guessing.
      if (metadata.querySelector('yt-paid-content-overlay-renderer, ytm-paid-content-overlay-renderer, ytd-paid-content-overlay-renderer')) continue;
      metadata.dataset.scvMetadata = '';
      card.dataset.scvCard = '';
      anchor.dataset.scvVideo = '';
      records.set(card, { card, metadata, anchor });
    }
  }
  function schedule() { if (!disposed && !frame) frame = requestAnimationFrame(scan); }
  on(document, 'yt-navigate-start', () => {
    root.removeAttribute('data-scv-page');
    for (const record of records.values()) remove(record);
  });
  on(document, 'yt-navigate-finish', schedule);
  on(document, 'yt-page-data-updated', schedule);
  const observer = new MutationObserver(changes => {
    if (changes.some(change => {
      const target = change.target;
      if (!(target instanceof Element)) return true;
      if (target.closest('[data-scv-control], #shorts-player, .html5-video-player')) return false;
      if (!change.addedNodes.length && !change.removedNodes.length) return false;
      return enabled() || target.matches('ytd-page-manager') || !!target.closest('ytd-page-manager');
    })) schedule();
  });
  observer.observe(root, { childList: true, subtree: true });
  function refreshSettings() {
    let value={};try{value=JSON.parse(root.dataset.sipSettings || '{}');}catch{}
    const next=value.shortsInfoHidden===true?'auto':'off';
    if(next!==mode){mode=next;for(const record of records.values())remove(record);}
    schedule();
  }
  on(document,'sip-settings-changed',refreshSettings);
  refreshSettings();
  window[key] = { dispose() {
    disposed = true;
    cancelAnimationFrame(frame);
    events.abort();
    observer.disconnect();
    for (const record of records.values()) remove(record);
    root.removeAttribute('data-scv-page');
    root.removeAttribute('data-scv-mode');
    root.removeAttribute('data-scv-version');
    delete window[key];
  } };
  schedule();
})();
