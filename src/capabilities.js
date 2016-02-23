class Capabilities {
  constructor() {
    const ua = window.navigator.userAgent;

    // updated 2/16/16 by Konogan
    // updated 10/5/15 by JNusz
    // based on : https://gist.github.com/paulirish/5558557


    this.capabilities = {
      // Mobile Detection
      Android: !!ua.match(/Android/ig),
      Blackberry: !!ua.match(/BlackBerry/ig),
      iOS: !!ua.match(/iPhone|iPad|iPod/ig),
      OperaMini: !!ua.match(/Opera Mini/ig),
      Windows: !!ua.match(/IEMobile/ig),
      WebOS: !!ua.match(/webOS/ig),

      // Browser Detection
      Arora: !!ua.match(/Arora/ig),
      Chrome: !!ua.match(/Chrome/ig),
      Epiphany: !!ua.match(/Epiphany/ig),
      Firefox: !!ua.match(/Firefox/ig),
      InternetExplorer: !!ua.match(/MSIE/ig),
      Midori: !!ua.match(/Midori/ig),
      Opera: !!ua.match(/Opera/ig),
      Safari: !!ua.match(/Safari/ig),

      webgl: this.isWebGl(),
      localStorage: this.isLocalStorageSupported()

    };
    this.capabilities.mobile = this.capabilities.Android || this.capabilities.Blackberry || this.capabilities.iOS || this.capabilities.OperaMini || this.capabilities.Windows || this.capabilities.WebOS;

  }

  isLocalStorageSupported() {
    let mod = "test";
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  }

  isWebGl() {
      try {
        return !!window.WebGLRenderingContext && !!(document.createElement('canvas').getContext('webgl') || document.createElement('canvas').getContext('experimental-webgl'));
      } catch (e) {
        return false;
      }
    }

    isMobile() {
      return this.capabilities.mobile;
    }

    isCardBoard() {
      return this.capabilities.mobile && this.capabilities.webgl && this.capabilities.Chrome;
    }
}


export default Capabilities;
