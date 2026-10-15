import { settingsSection } from './settings-ui.js';
import { messages, selectedLanguage, languageSelector, element, safeLink } from './locale.js';
const app = document.querySelector('#app');
let config = {}, version = '';
function render(language) {
  const t = messages[language]; document.documentElement.lang = language; app.replaceChildren();
  const header = element('header'), icon = element('img'); icon.src='icons/icon-128.png'; icon.width=64; icon.height=64; icon.alt='';
  const brand=element('div','PREVIEW & SHORTS CONTROLS'); brand.append(element('br'),element('small',`Lenged · ${version}`)); header.append(icon,brand);
  app.append(header,languageSelector(language,render),element('p',t.free,'eyebrow'),element('h1',t.headline),element('p',t.intro,'lead'));
  app.append(settingsSection(language));
  const usage=element('section'), steps=element('ol'); t.steps.forEach(text=>steps.append(element('li',text)));
  usage.append(element('h2',t.usage),steps,element('p',t.native)); app.append(usage);
  const fundingUrl=safeLink(config.fundingUrl);
  if(fundingUrl) { const section=element('section'),link=element('a',t.donateButton,'button'); section.id='funding'; link.id='funding-link'; link.href=fundingUrl; link.target='_blank'; link.rel='noopener noreferrer'; section.append(element('h2',t.donateTitle),element('p',t.donate),link,element('p',t.payment,'small')); app.append(section); }
  const compatibility=element('section'); compatibility.append(element('h2',t.compatibilityTitle),element('p',t.compatibility),element('p',t.independent)); app.append(compatibility);
  const footer=element('footer'),privacy=element('a',t.privacyTitle); privacy.href=`privacy.html?lang=${encodeURIComponent(language)}`; footer.append(privacy);
  const supportUrl=safeLink(config.supportUrl); if(supportUrl) { const support=element('a',t.contact); support.id='support'; support.href=supportUrl; support.target='_blank'; support.rel='noopener noreferrer'; footer.append(support); }
  footer.append(element('p',`© Lenged · ${t.footer}`)); app.append(footer);
}
async function initialize() {
  const [settings,manifest]=await Promise.all([fetch('release-config.json').then(r=>{if(!r.ok)throw new Error('config');return r.json();}).catch(()=>({})),fetch('manifest.json').then(r=>r.json()).catch(()=>({}))]);
  config=settings; version=globalThis.chrome?.runtime?.getManifest?.().version||manifest.version||''; render(selectedLanguage());
}
initialize();
