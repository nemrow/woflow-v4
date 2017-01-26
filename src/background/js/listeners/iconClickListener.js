(() => {
  chrome.browserAction.onClicked.addListener((tab) => {
    chrome.storage.local.get("isActive", ({ isActive }) => {
      chrome.storage.local.set({ isActive: !isActive });
    });
  });
})()
