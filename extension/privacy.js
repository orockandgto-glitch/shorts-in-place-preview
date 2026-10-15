import { messages, selectedLanguage, languageSelector, element, safeLink } from './locale.js';
let config={};
function render(language) {
  const t=messages[language],app=document.querySelector('#app'); app.replaceChildren(); document.documentElement.lang=language; document.title=`${t.privacyTitle} · Preview & Shorts Controls for YouTube`;
  const back=element('a',`← ${t.back}`); back.href=`options.html?lang=${encodeURIComponent(language)}`;
  app.append(back,languageSelector(language,render),element('h1',t.privacyTitle),element('p','2026-10-14 · Lenged · 0.5.2'),element('p',t.policyIntro));
  t.policy.forEach(([title,text])=>{const section=element('section');section.append(element('h2',title),element('p',text));app.append(section);});
  const preferences={ko:'기능 선택, 대기 시간 및 음량은 chrome.storage.local에 저장됩니다. 개발자에게 전송되지 않습니다. 확장을 삭제하면 확장 저장소도 제거됩니다.',en:'Feature choices, hover delay and volume are saved in chrome.storage.local. They are not sent to the developer. Uninstalling removes extension storage.',ja:'機能の選択、待機時間、音量は chrome.storage.local に保存されます。開発者には送信されません。アンインストールすると拡張機能の保存データも削除されます。','zh-CN':'功能选择、悬停等待时间和音量保存在 chrome.storage.local 中，不会发送给开发者。卸载将删除扩展存储。','zh-TW':'功能選擇、懸停等待時間和音量儲存在 chrome.storage.local 中，不會傳送給開發者。解除安裝會刪除擴充功能儲存資料。'};
  app.append(element('p',preferences[language]||preferences.en));
  const footer=element('footer');
  for(const [value,label] of [[config.supportUrl,t.contact],[config.privacyPolicyUrl,t.publicPolicy],[config.fundingUrl,'Buy Me a Coffee']]) {const href=safeLink(value);if(!href)continue;const link=element('a',label);link.href=href;link.target='_blank';link.rel='noopener noreferrer';footer.append(link);}
  app.append(footer);
}
fetch('release-config.json').then(r=>r.json()).catch(()=>({})).then(settings=>{config=settings;render(selectedLanguage());});

