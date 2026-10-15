// Only a fixed local CSS file can be inserted, into the sending YouTube document.
chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (message?.type !== 'install-native-visibility-css' ||
      sender.id !== chrome.runtime.id || sender.frameId !== 0 ||
      !Number.isInteger(sender.tab?.id)) return false;
  let url;
  try { url = new URL(sender.url); } catch { return false; }
  if (url.origin !== 'https://www.youtube.com') return false;
  const target = { tabId: sender.tab.id };
  if (sender.documentId) target.documentIds = [sender.documentId];
  else target.frameIds = [0];
  chrome.scripting.insertCSS({
    target,
    files: ['native-visibility.css'],
    origin: 'USER'
  }).then(() => respond({ ok: true }), () => respond({ ok: false }));
  return true;
});

// Open the bundled information page only after an explicit toolbar click.
chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());
