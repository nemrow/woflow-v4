import View from './view';

(() => {
  chrome.storage.local.get("isActive", ({ isActive }) => {
    let view = new View
    if (isActive) {
      view.show()
    } else {
      view.hide()
    }
  })
})()
