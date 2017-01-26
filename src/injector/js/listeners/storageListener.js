import View from '../view';

(() => {
  chrome.storage.onChanged.addListener( (changes) => {
    if (changes.isActive != undefined) {
      let view = new View
      if (changes.isActive.newValue) {
        view.show()
      } else {
        view.hide()
      }
    }
  })
})()
