document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById('apply-css');

  function updateButton(isEnabled) {
    button.textContent = isEnabled ? "Disable" : "Enable";
  }

  chrome.storage.sync.get('enabled', (data) => {
    const isEnabled = data.enabled || false;
    updateButton(isEnabled);
  });

  button.addEventListener('click', () => {
    chrome.storage.sync.get('enabled', (data) => {
      const isEnabled = !data.enabled; 
      chrome.storage.sync.set({ enabled: isEnabled });

      updateButton(isEnabled);

      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;

        if (isEnabled) {
          chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["styles.css"]
          });
        } else {
          chrome.scripting.removeCSS({
            target: {tabId: tabId},
            files: ["styles.css"]
          });
        }
      });
    });
  });
});
