(() => {
  'use strict';
  const root=document.documentElement;
  const defaults={homeShorts:true,watchRelated:true,homeVolume:true,homeSeek:true,shortsVolume:true,shortsSeek:true,shortsInfoHidden:true,relatedVolume:true,relatedSeek:true,hoverDelay:375,volume:0.25};
  let previous=null;
  function publish(value={}) {
    const settings={...defaults};
    for(const key of ['homeShorts','watchRelated','homeVolume','homeSeek','shortsVolume','shortsSeek','shortsInfoHidden','relatedVolume','relatedSeek']) if(typeof value[key]==='boolean')settings[key]=value[key];
    if(Number.isFinite(value.hoverDelay))settings.hoverDelay=Math.round(Math.max(150,Math.min(1500,value.hoverDelay)));
    if(Number.isFinite(value.volume))settings.volume=Math.max(0,Math.min(1,value.volume));
    const restart=!previous || ['homeShorts','watchRelated','hoverDelay'].some(key=>settings[key]!==previous[key]);
    root.dataset.sipSettings=JSON.stringify(settings);
    root.dataset.pvcNative=String(settings.homeVolume);
    root.dataset.pvcNativeSeek=String(settings.homeSeek);
    root.dataset.pvcShorts=String(settings.homeShorts && settings.shortsVolume);
    root.dataset.pvcShortsSeek=String(settings.homeShorts && settings.shortsSeek);
    root.dataset.pvcRelated=String(settings.watchRelated && settings.relatedVolume);
    root.dataset.pvcSeek=String(settings.watchRelated && settings.relatedSeek);
    root.dataset.pvcEnabled=String(settings.homeVolume || settings.homeSeek || (settings.homeShorts && (settings.shortsVolume || settings.shortsSeek)) || (settings.watchRelated && (settings.relatedVolume || settings.relatedSeek)));
    previous=settings;
    document.dispatchEvent(new CustomEvent('sip-settings-changed',{detail:{restart}}));
  }
  chrome.storage.onChanged.addListener((changes,area)=>{if(area==='local' && changes.sipSettings)publish(changes.sipSettings.newValue);});
  chrome.storage.local.get('sipSettings').then(result=>publish(result.sipSettings)).catch(()=>publish());
})();
