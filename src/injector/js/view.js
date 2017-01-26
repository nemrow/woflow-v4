export default class View {
  constructor() {
    this.iframe = this._findOrCreateIframe();
  }

  _findOrCreateIframe () {
    let iframe = document.getElementById("woflow-iframe");
    if (iframe) {
      return iframe
    } else {
      let iframe = this._createIframe()
      this._appendIframe(iframe)
      return iframe
    }
  }

  _appendIframe (iframe) {
    document.body.appendChild(iframe);
  }

  _createIframe () {
    var iframe = document.createElement('iframe');
    iframe.id = "woflow-iframe";
    iframe.classList.add("woflow-iframe")
    iframe.src = chrome.runtime.getURL('iframe.html');
    return iframe
  }

  show() {
    setTimeout(() => {
      this.iframe.classList.add("woflow-iframe-show");
    })
  }

  hide() {
    this.iframe.classList.remove("woflow-iframe-show")
    setTimeout(() => {
      this.iframe.remove()
    }, 1000)
  }
}
