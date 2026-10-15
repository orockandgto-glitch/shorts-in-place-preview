/* Scoped media-property gate. Never changes main/watch/Shorts-page players. */
(() => {
  'use strict';
  const KEY = Symbol.for('lenged.preview-audio-guard');
  window[KEY]?.dispose();
  const root = document.documentElement;
  const proto = HTMLMediaElement.prototype;
  const muted = Object.getOwnPropertyDescriptor(proto, 'muted');
  const volume = Object.getOwnPropertyDescriptor(proto, 'volume');
  const play = proto.play;
  if (!muted?.get || !muted?.set || !muted.configurable || !volume?.set || !volume.configurable) {
    root.dataset.pvcGuard = 'unavailable'; return;
  }
  const original = new Map();
  let disposed = false;
  let mainLease = null;
  function identity(video) {
    if (!(video instanceof HTMLVideoElement)) return null;
    const owned = video.closest('.sip-surface');
    const kind=owned?.getAttribute('data-sip-context');
    if(owned && !['shorts','related'].includes(kind))return null;
    if(kind==='shorts' && (location.pathname!=='/' || root.dataset.pvcShorts!=='true'))return null;
    if(kind==='related' && (location.pathname!=='/watch' || root.dataset.pvcRelated!=='true'))return null;
    if(!owned && (location.pathname!=='/' || root.dataset.pvcNative!=='true'))return null;
    const preview = video.closest('ytd-video-preview');
    if (!preview && !owned) return null;
    const link = owned?.closest('a[href]') || preview?.querySelector('a[href*="/watch?"], a[href*="/shorts/"]');
    return (link?.getAttribute('href') || owned?.getAttribute('data-sip-context') || 'preview') + '|' + (video.getAttribute('src') || '');
  }
  function applies(video) {
    return !disposed && ['/','/watch'].includes(location.pathname) && root.dataset.pvcEnabled !== 'false' && !root.hasAttribute('data-pvc-suspended') && identity(video) !== null;
  }
  function audible(video) {
    return video.dataset.pvcAudio === 'on' && video.dataset.pvcConsent === identity(video) && Number(video.dataset.pvcVolume) > 0;
  }
  function desiredVolume(video) {
    const level = Number(video.dataset.pvcVolume);
    return Number.isFinite(level) ? Math.max(0, Math.min(1, level)) : 0.25;
  }
  function remember(video) {
    if (!original.has(video)) original.set(video, { muted: muted.get.call(video), volume: volume.get.call(video) });
  }
  function gate(video) {
    if (!applies(video)) return;
    remember(video);
    // Muting runs synchronously, even before metadata/media decoding is ready.
    muted.set.call(video, !audible(video));
    if (audible(video)) volume.set.call(video, desiredVolume(video));
  }
  function restoreMain() {
    const lease=mainLease;mainLease=null;
    if(!lease || !lease.video.isConnected || location.pathname!=='/watch' || location.href!==lease.url || lease.video.getAttribute('src')!==lease.src)return;
    volume.set.call(lease.video,lease.volume);
    muted.set.call(lease.video,lease.muted);
    root.dataset.pvcMainAudio='restored';
  }
  function syncMain() {
    // Seek buffering is not mouseleave: keep the audio lease until consent is revoked.
    const audiblePreview=location.pathname==='/watch' && [...document.querySelectorAll('.sip-surface[data-sip-context="related"] video')].find(v=>v.isConnected && applies(v) && audible(v));
    if(!audiblePreview){restoreMain();return;}
    const main=document.querySelector('#movie_player video');
    if(!main || main.closest('.sip-surface')){restoreMain();return;}
    if(mainLease && (mainLease.video!==main || mainLease.url!==location.href || mainLease.src!==main.getAttribute('src')))restoreMain();
    if(!mainLease)mainLease={video:main,muted:muted.get.call(main),volume:volume.get.call(main),url:location.href,src:main.getAttribute('src')};
    muted.set.call(main,true);
    root.dataset.pvcMainAudio='temporarily-muted';
  }
  const mutedSetter = function(value) {
    if(mainLease?.video===this && location.href===mainLease.url && this.getAttribute('src')===mainLease.src)return muted.set.call(this,true);
    if (applies(this)) { remember(this); return muted.set.call(this, !audible(this)); }
    return muted.set.call(this, value);
  };
  const volumeSetter = function(value) {
    if (applies(this)) {
      remember(this);
      return volume.set.call(this, audible(this) ? desiredVolume(this) : value);
    }
    return volume.set.call(this, value);
  };
  const playWrapper = function(...args) { gate(this); return play.apply(this, args); };
  Object.defineProperty(proto, 'muted', { ...muted, set: mutedSetter });
  Object.defineProperty(proto, 'volume', { ...volume, set: volumeSetter });
  proto.play = playWrapper;
  function sweep() {
    for (const video of document.querySelectorAll('ytd-video-preview video, .sip-surface video')) gate(video);
    syncMain();
    for (const [video, prior] of original) {
      if (!video.isConnected) { original.delete(video); continue; }
      if (!applies(video)) {
        // A preview transferred into a watch player belongs to YouTube now.
        if (video.closest('ytd-video-preview,.sip-surface') && (root.dataset.pvcEnabled === 'false' || (video.closest('.sip-surface') ? (video.closest('.sip-surface').getAttribute('data-sip-context')==='related'?root.dataset.pvcRelated:root.dataset.pvcShorts) !== 'true' : root.dataset.pvcNative !== 'true'))) {
          muted.set.call(video, prior.muted);
          volume.set.call(video, prior.volume);
        }
        original.delete(video);
      }
    }
  }
  const observer = new MutationObserver(sweep);
  observer.observe(root, { childList: true, subtree: true, attributes: true,
    attributeFilter: ['href', 'src', 'data-pvc-enabled', 'data-pvc-suspended', 'data-pvc-native', 'data-pvc-shorts', 'data-pvc-related'] });
  const events = new AbortController();
  document.addEventListener('timeupdate', event => {
    const v=event.target;
    if(mainLease || v?.closest?.('.sip-surface[data-sip-context=related]'))syncMain();
    if(applies(v)) {
      const bytes=Number(v.webkitAudioDecodedByteCount);
      if(Number.isFinite(bytes)) v.dataset.pvcAudioBytes=String(bytes);
    }
  }, {capture:true,signal:events.signal});
  for (const name of ['play', 'playing', 'pause', 'loadstart', 'loadedmetadata', 'emptied']) {
    document.addEventListener(name, event => { if (event.target instanceof HTMLVideoElement) {gate(event.target);syncMain();} }, { capture: true, signal: events.signal });
  }
  document.addEventListener('pvc-audio-state', () => {
    for (const video of document.querySelectorAll('ytd-video-preview video, .sip-surface video')) {
      if (!applies(video) || !audible(video)) continue;
      // Keep the native player's internal mute state consistent with the
      // media element. Some inline players reapply their internal mute flag.
      const player = video.closest('.html5-video-player');
      try {
        player?.unMute?.(false);
        player?.setVolume?.(desiredVolume(video) * 100);
        video.dataset.pvcNativeAudio = typeof player?.unMute === 'function' ? 'synced' : 'element-only';
      } catch { video.dataset.pvcNativeAudio = 'sync-failed'; }
    }
    sweep();
  }, { signal: events.signal });
  document.addEventListener('pvc-seek-request', event=>{
    const video=event.target;
    if(!(video instanceof HTMLVideoElement) || location.pathname!=='/watch' || root.dataset.pvcSeek!=='true' || !video.closest('.sip-surface[data-sip-context="related"]'))return;
    const value=Number(video.dataset.pvcSeekTo);
    if(!Number.isFinite(value) || !Number.isFinite(video.duration) || video.duration<=0)return;
    const target=Math.max(0,Math.min(video.duration-0.05,value));
    const player=video.closest('.html5-video-player');
    try{if(typeof player?.seekTo==='function')player.seekTo(target,true);else video.currentTime=target;video.dataset.pvcSeekStatus='requested';}
    catch{video.dataset.pvcSeekStatus='failed';}
  },{signal:events.signal});
  root.dataset.pvcGuard = 'ready';
  window[KEY] = { dispose() {
    restoreMain();
    disposed = true;
    observer.disconnect(); events.abort();
    if (Object.getOwnPropertyDescriptor(proto,'muted')?.set === mutedSetter) Object.defineProperty(proto,'muted',muted);
    if (Object.getOwnPropertyDescriptor(proto,'volume')?.set === volumeSetter) Object.defineProperty(proto,'volume',volume);
    if (proto.play === playWrapper) proto.play = play;
    for (const [video, prior] of original) if (video.isConnected && identity(video) !== null) {
      muted.set.call(video,prior.muted); volume.set.call(video,prior.volume);
    }
    original.clear(); root.removeAttribute('data-pvc-guard'); delete window[KEY];
  } };
  sweep();
})();
