(() => {
  let overrides = {}

  let defaults = {
    isActive: false
  }

  chrome.storage.local.get(response => {
    for (var key of Object.keys(defaults)) {
      if (response[key] == undefined) {
        overrides[key] = defaults[key]
      }
    }

    chrome.storage.local.set(overrides);
  })
})()
