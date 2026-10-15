// An isolated content script can message the worker; MAIN cannot use runtime.
chrome.runtime.sendMessage({ type: 'install-native-visibility-css' })
  .then(result => {
    document.documentElement.dataset.sipVisibilityCss = result?.ok ? 'ready' : 'failed';
  })
  .catch(() => {
    document.documentElement.dataset.sipVisibilityCss = 'failed';
  });
