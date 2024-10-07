chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    applyCSSIfEnabled(tabId);
  }
});

function applyCSSIfEnabled(tabId) {
  chrome.storage.sync.get('enabled', (data) => {
    if (data.enabled) {
      chrome.scripting.insertCSS({
        target: {tabId: tabId},
        files: ["styles.css"]
      });
    }
  });
}
