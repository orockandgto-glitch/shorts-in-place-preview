(() => {
  'use strict';
  const KEY = '__lengedPreviewVolume';
  window[KEY]?.dispose();
  const events = new AbortController();
  const root = document.documentElement;
  let enabled = false;
  let volume = 0.25;
  let active = null;
  let timer = 0;
  let saveTimer = 0;
  let disposed = false;
  const code=navigator.language.toLowerCase();
  const text=code.startsWith('ko')?['미리보기 소리 켜기','미리보기 음소거','미리보기 볼륨','클릭해서 소리를 켜주세요']
    :code.startsWith('ja')?['プレビューの音声を有効にする','プレビューをミュート','プレビュー音量','クリックして音声を有効にしてください']
    :code.startsWith('zh')?['开启预览声音','静音预览','预览音量','点击开启声音']
    :['Unmute preview','Mute preview','Preview volume','Click to enable sound'];
  function listen(target,name,fn,options={}) { target.addEventListener(name,fn,{...options,signal:events.signal}); }
  const CARD='ytm-shorts-lockup-view-model, ytd-reel-item-renderer, ytd-rich-item-renderer, yt-lockup-view-model, ytd-compact-video-renderer';
  function context(video) {
    if (!enabled || root.hasAttribute('data-pvc-suspended') || !['/','/watch'].includes(location.pathname) || !video.isConnected || (video.readyState < 2 && video!==active?.video)) return null;
    const related=video.closest('.sip-surface[data-sip-context="related"]');
    if(related && location.pathname==='/watch' && related.hasAttribute('data-sip-playing') && (root.dataset.pvcRelated==='true' || root.dataset.pvcSeek==='true'))return {anchor:related.parentElement,identity:related,card:related.closest(CARD),kind:'related',audioEnabled:root.dataset.pvcRelated==='true',seekEnabled:root.dataset.pvcSeek==='true'};
    if(location.pathname!=='/')return null;
    const owned = video.closest('.sip-surface[data-sip-context="shorts"]');
    if (owned && root.dataset.pvcShorts === 'true' && owned.hasAttribute('data-sip-playing')) return {anchor:owned.parentElement,identity:owned,card:owned.closest(CARD),kind:'shorts'};
    if (video.closest('.sip-surface') || root.dataset.pvcNative !== 'true') return null;
    const preview = video.closest('ytd-video-preview');
    if (!preview) return null;
    const r = preview.getBoundingClientRect();
    const style = getComputedStyle(preview);
    if (r.width <= 0 || r.height <= 0 || style.opacity === '0' || style.visibility === 'hidden') return null;
    const link = preview.querySelector('a[href*="/watch?"], a[href*="/shorts/"]');
    if (!link) return null;
    const player=video.closest('.html5-video-player');
    if(!player || player.getBoundingClientRect().height<=0)return null;
    let card=null;
    try {
      const id=new URL(link.href,location.origin).searchParams.get('v');
      for(const candidate of document.querySelectorAll('ytd-browse[page-subtype="home"] a[href*="/watch?"]')) {
        if(new URL(candidate.href,location.origin).searchParams.get('v')===id) {card=candidate.closest(CARD);break;}
      }
    } catch { /* no corresponding visible home card */ }
    return {anchor:player,identity:preview,card,kind:'native',href:link.getAttribute('href')};
  }
  function mediaKey(video) {
    const owned=video.closest('.sip-surface');
    const preview=video.closest('ytd-video-preview');
    const link=owned?.closest('a[href]') || preview?.querySelector('a[href*="/watch?"], a[href*="/shorts/"]');
    return (link?.getAttribute('href') || owned?.getAttribute('data-sip-context') || 'preview')+'|'+(video.getAttribute('src') || '');
  }
  function notifyGuard() { document.dispatchEvent(new Event('pvc-audio-state')); }
  function clear() {
    const s=active; active=null;
    if (!s) return;
    // Never restore an audible state on mouseleave: the next hover is muted.
    s.video.dataset.pvcAudio='off';
    s.video.removeAttribute('data-pvc-consent');
    if(s.video.isConnected && s.video.closest('ytd-video-preview,.sip-surface')) s.video.muted=true;
    clearTimeout(s.seekTimer);
    s.bar.remove();s.seekBar?.remove();
    if (s.relative) s.anchor.removeAttribute('data-pvc-position');
    s.anchor.removeAttribute('data-pvc-anchor');

    root.dataset.pvcStatus='idle';
    notifyGuard();
  }
  function formatTime(value){if(!Number.isFinite(value)||value<0)return '--:--';const n=Math.floor(value);return n>=3600?Math.floor(n/3600)+':'+String(Math.floor(n/60)%60).padStart(2,'0')+':'+String(n%60).padStart(2,'0'):Math.floor(n/60)+':'+String(n%60).padStart(2,'0');}
  function render() {
    const s=active;
    if (!s) return;
    const audible=!s.video.muted && s.video.volume>0;
    s.button.textContent=audible?'🔊':'🔇';
    s.button.setAttribute('aria-label',text[audible?1:0]);
    s.button.setAttribute('aria-pressed',String(audible));
    s.button.title=s.bar.hasAttribute('data-pvc-blocked')?text[3]:text[audible?1:0];
    if (document.activeElement!==s.slider) s.slider.value=String(Math.round(s.video.volume*100));
    s.output.textContent=Math.round(s.video.volume*100)+'%';
    s.bar.dataset.pvcMeasuredVolume=String(s.video.volume);
    s.bar.dataset.pvcMeasuredMuted=String(s.video.muted);
    if(s.seekSlider){const duration=s.video.duration;const valid=Number.isFinite(duration)&&duration>0;s.seekSlider.disabled=!valid;s.seekSlider.max=String(valid?duration:1);if(!s.scrubbing && s.pendingSeek===undefined)s.seekSlider.value=String(valid?s.video.currentTime:0);s.seekOutput.textContent=formatTime(s.pendingSeek===undefined?s.video.currentTime:s.pendingSeek)+' / '+formatTime(duration);s.seekSlider.setAttribute('aria-valuetext',s.seekOutput.textContent);}
    root.dataset.pvcStatus=s.bar.hasAttribute('data-pvc-blocked')?'autoplay-blocked':audible?'audible':'muted';
  }
  function apply(userGesture=false) {
    const s=active;
    if (!s) return;
    const wasPlaying=!s.video.paused;
    if(s.audioEnabled===false){render();return;}
    s.video.dataset.pvcVolume=String(volume);
    s.video.dataset.pvcConsent=s.key;
    s.video.dataset.pvcAudio=s.userSound && volume>0?'on':'off';
    s.video.volume=volume;
    s.video.muted=!s.userSound || volume===0;
    notifyGuard();
    s.bar.removeAttribute('data-pvc-blocked');
    render();
    if (wasPlaying || userGesture) {
      s.video.play().catch(() => {
        if (active!==s) return;
        s.userSound=false;
        s.video.dataset.pvcAudio='off';
        s.video.muted=true;
        notifyGuard();
        s.bar.dataset.pvcBlocked='';
        s.button.title=text[3];
        s.video.play().catch(()=>{});
        render();
      });
    }
  }
  function mount(video,c) {
    clear();
    const bar=document.createElement('div');
    bar.className='pvc-bar';bar.dataset.pvcContext=c.kind;
    bar.dataset.pvcControl='';
    bar.setAttribute('role','group');
    bar.setAttribute('aria-label',text[2]);
    bar.hidden=c.audioEnabled===false;
    const button=document.createElement('button'); button.type='button'; button.dataset.pvcMute='';
    const slider=document.createElement('input'); slider.type='range';slider.min='0';slider.max='100';slider.step='1';slider.dataset.pvcVolume='';slider.setAttribute('aria-label',text[2]);
    const output=document.createElement('output');output.setAttribute('aria-hidden','true');
    bar.append(button,slider,output);
    const relative=getComputedStyle(c.anchor).position==='static';
    if(relative)c.anchor.dataset.pvcPosition='';
    c.anchor.dataset.pvcAnchor='';
    active={...c,video,bar,button,slider,output,relative,key:mediaKey(video),userSound:false};
    c.anchor.append(bar);
    if(c.seekEnabled){const seekBar=document.createElement('div');seekBar.className='pvc-timeline';seekBar.dataset.pvcControl='';const seekSlider=document.createElement('input');seekSlider.type='range';seekSlider.min='0';seekSlider.max='1';seekSlider.step='0.1';seekSlider.setAttribute('aria-label',code.startsWith('ko')?'미리보기 재생 위치':code.startsWith('ja')?'プレビュー再生位置':code.startsWith('zh')?'预览播放位置':'Preview playback position');const seekOutput=document.createElement('output');seekOutput.setAttribute('aria-hidden','true');seekBar.append(seekSlider,seekOutput);Object.assign(active,{seekBar,seekSlider,seekOutput});c.anchor.append(seekBar);}
    apply();
  }
  function scan() {
    timer=0;
    if(disposed)return;
    if(active){
      const c=context(active.video);
      if(c && c.identity===active.identity && c.href===active.href && mediaKey(active.video)===active.key && active.bar.isConnected){render();return;}
      clear();
    }
    if(!enabled || !['/','/watch'].includes(location.pathname))return;
    const videos=[...document.querySelectorAll('.sip-surface video, ytd-video-preview video')];
    // Prefer the hovered/playing preview, not a stale offscreen native player.
    for(const video of videos){
      const c=context(video);
      if(c && !video.paused){mount(video,c);return;}
    }
  }
  function schedule(){if(!disposed&&!timer)timer=setTimeout(scan,80);}
  function insidePreview(node) {
    return node instanceof Element && active &&
      [active.card,active.identity,active.bar,active.seekBar].some(part=>part?.contains(node));
  }
  listen(window,'pointerout',event=>{
    if(insidePreview(event.target) && !insidePreview(event.relatedTarget))clear();
  },{capture:true,passive:true});
  listen(window,'pointerover',event=>{
    if(!active || !(event.target instanceof Element) || insidePreview(event.target))return;
    const card=event.target.closest(CARD);
    if(card && card!==active.card)clear();
  },{capture:true,passive:true});
  listen(window,'blur',clear);
  // Window capture runs before the older preview extension's document click
  // cleanup. Only our controls are intercepted; all card links keep working.
  function ownControl(element){if(!(element instanceof Element))return false;const control=element.closest('[data-pvc-control]');return !!control && (control===active?.bar || control===active?.seekBar);}
  listen(window,'click',event=>{
    const control=event.target instanceof Element?event.target.closest('[data-pvc-control]'):null;
    if(!control || !ownControl(event.target))return;
    event.preventDefault();event.stopImmediatePropagation();
    if(event.target.closest('[data-pvc-mute]')){
      active.userSound=active.video.muted || active.video.volume===0;
      if(active.userSound && volume===0)volume=0.25;
      apply(true);
    }
  },{capture:true});
  function commitSeek(s) {
    clearTimeout(s.seekTimer);s.seekTimer=0;
    if(active!==s || s.pendingSeek===undefined)return;
    const target=s.pendingSeek;s.pendingSeek=undefined;
    s.video.dataset.pvcSeekTo=String(target);
    s.video.dispatchEvent(new Event('pvc-seek-request',{bubbles:true}));
    // Native players may momentarily pause while the target segment loads.
    // Resume the same preview without changing its user-selected audio state.
    s.video.play().catch(()=>{});
    render();
  }
  for(const name of ['pointerdown','pointerup','mousedown','mouseup','dblclick'])listen(window,name,event=>{
    if(event.target===active?.seekSlider){if(name==='pointerdown')active.scrubbing=true;if(name==='pointerup'){active.scrubbing=false;commitSeek(active);}}
    if(ownControl(event.target))event.stopImmediatePropagation();
  },{capture:true});
  listen(window,'input',event=>{
    if(event.target===active?.seekSlider){event.stopImmediatePropagation();const s=active;s.pendingSeek=Number(event.target.value);clearTimeout(s.seekTimer);if(!s.scrubbing)s.seekTimer=setTimeout(()=>commitSeek(s),120);render();return;}
    if(event.target!==active?.slider)return;
    event.stopImmediatePropagation();
    volume=Math.max(0,Math.min(1,Number(event.target.value)/100));
    active.userSound=volume>0;
    apply(true);
    clearTimeout(saveTimer);saveTimer=setTimeout(()=>chrome.storage.local.set({sipSettings:{...JSON.parse(root.dataset.sipSettings || '{}'),volume}}).catch(()=>{}),150);
  },{capture:true});
  listen(window,'change',event=>{if(event.target===active?.seekSlider){event.stopImmediatePropagation();active.scrubbing=false;commitSeek(active);}},{capture:true});
  listen(window,'keydown',event=>{
    if(ownControl(event.target))event.stopImmediatePropagation();
  },{capture:true});
  for(const name of ['playing','loadeddata','emptied','pause','durationchange'])listen(document,name,event=>{if(event.target instanceof HTMLVideoElement)schedule();},{capture:true,passive:true});
  listen(document,'timeupdate',event=>{if(event.target===active?.video)render();},{capture:true,passive:true});
  listen(document,'volumechange',event=>{if(event.target===active?.video)render();},{capture:true,passive:true});
  listen(document,'yt-navigate-start',()=>{clear();root.setAttribute('data-pvc-suspended','');});
  listen(document,'yt-navigate-finish',()=>{root.removeAttribute('data-pvc-suspended');schedule();});
  listen(document,'visibilitychange',()=>{if(document.hidden)clear();else schedule();});
  listen(window,'pagehide',clear);
  const observer=new MutationObserver(changes=>{
    if(changes.some(m=>{
      const t=m.target;
      if(t instanceof Element && t.closest('[data-pvc-control]'))return false;
      if(m.type==='attributes')return t instanceof Element && (t.matches('ytd-video-preview,.sip-surface')||m.attributeName==='href');
      return true;
    }))schedule();
  });
  observer.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['href','class','data-sip-playing']});
  let featureKey = null;
  function refreshSettings() {
    let settings={}; try { settings=JSON.parse(root.dataset.sipSettings || '{}'); } catch {}
    enabled=root.dataset.pvcEnabled==='true';
    volume=Number.isFinite(settings.volume)?Math.max(0,Math.min(1,settings.volume)):0.25;
    const nextKey=root.dataset.pvcNative+'|'+root.dataset.pvcShorts+'|'+root.dataset.pvcRelated+'|'+root.dataset.pvcSeek;
    if(nextKey!==featureKey){clear();featureKey=nextKey;}else if(active)apply();
    schedule();
  }
  listen(document,'sip-settings-changed',refreshSettings);
  root.dataset.pvcVersion='0.5.2';
  refreshSettings();
  window[KEY]={dispose(){disposed=true;root.dataset.pvcEnabled='false';clear();clearTimeout(timer);clearTimeout(saveTimer);observer.disconnect();events.abort();root.removeAttribute('data-pvc-version');root.removeAttribute('data-pvc-status');delete window[KEY];}};
  schedule();
})();


