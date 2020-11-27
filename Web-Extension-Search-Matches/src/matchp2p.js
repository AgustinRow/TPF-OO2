/*
 * Copyright ragonzalez@disroot.org. Licensed under MIT
 * See license text at https://mit-license.org/license.txt
 */
var url_text = "";
var remoteuser = "";
var jquery_link;
var popper_link;
var bootstrap_link;
var boostrap_css;
var tabActive = null;

//variables que usa el process local

var remoteuser;
var remoteResponse = null;
var ports = [];
var portFromCS;

function loadLibrary() {
  jquery_link = browser.runtime.getURL("lib/jquery-3.4.1.slim.min.js");
  popper_link = browser.runtime.getURL("lib/popper.min.js");
  bootstrap_link = browser.runtime.getURL("lib/bootstrap.min.js");
  boostrap_css = browser.runtime.getURL("lib/bootstrap.min.css");
}

function updateActiveTab(tabs) {
  let currentTab;

  function isSupportedProtocol(urlString) {
    var supportedProtocols = ["https:", "http:", "ftp:", "file:"];
    var url = document.createElement("a");
    url.href = urlString;
    return supportedProtocols.indexOf(url.protocol) != -1;
  }

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      if (isSupportedProtocol(currentTab.url)) {
        tabActive = currentTab;
      }
    }
  }

  var gettingActiveTab = browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  gettingActiveTab.then(updateTab);
}

class PanelScript {
  constructor(url) {
    this.url_resource = browser.extension.getURL(url);
    this.modePanel = "";
  }

  setUrl(url) {
    this.url_resource = url;
  }

  setMode(mode) {
    this.modePanel = mode;
  }

  createWindow() {
    try {
      let createData;
      switch (this.modePanel) {
        case "popup":
          createData = {
            type: "popup",
            url: this.url_resource,
            height: 350,
            width: 300,
          };

          console.log("iniciando popup");
          break;
      }
      return createData;
    } catch (e) {
      console.log("Error al generar json de window");
      console.log(e);
    }
  }

  show() {
    try {
      if (this.modePanel == "") {
        browser.tabs.create({
          url: this.url_resource,
        });
      } else {
        console.log("solo create tabs");
      }
    } catch (e) {
      // statements
      console.log(e);
    }
  }

  close() {}
}

function getDataResultadoP2P() {
  return remoteResponse;
}

function getRemoteUser() {
  try {
    return remoteuser;
  } catch (e) {
    console.log("Error el retornar usuario peer");
    console.log(e);
  }
}

class BackgroundResult {
  launchSearch(searchQuery) {
    return new Promise((resolve, reject) => {
      let oReq = new XMLHttpRequest();
      //let url = this.getMyUrl();
      oReq.onload = () => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(oReq.response, "text/html");
        // remove links that are ads

        var results = this.filterAdds(this.parse(doc));
        resolve(results);
      };
      oReq.open("GET", this.url + searchQuery, true);
      oReq.send();
    });
  }

  //TODO: filtrar "" y undefined
  parse(doc) {
    return Array.from(this.getDOMElementsFromSearch(doc)).map((result) =>
      this.filterDOMElements(result)
    );
  }

  getCurrentTab(callback) {
    return browser.tabs.query({
      active: true,
      currentWindow: true,
    });
  }
  filterAdds(urls) {
    return urls;
  }
}

class BingResult extends BackgroundResult {
  constructor() {
    super();
    this.url = "https://www.bing.com/search?ar-es&q=";
  }

  filterDOMElements(doc) {
    return doc.getElementsByTagName("a")[0].href;
  }
  getDOMElementsFromSearch(doc) {
    return doc.getElementById("b_results").getElementsByClassName("b_algo");
  }
}

class GoogleResult extends BackgroundResult {
  constructor() {
    super();
    this.url = "https://www.google.com/search?ar-es&q=";
  }

  filterDOMElements(doc) {
    return doc.getElementsByTagName("a")[0].href;
  }
  getDOMElementsFromSearch(doc) {
    return doc.getElementsByClassName("g");
  }
}

class DDGResult extends BackgroundResult {
  constructor() {
    super();
    this.url = "https://html.duckduckgo.com/html/?kl=ar-es&q=";
  }
  filterDOMElements(doc) {
    return doc.getElementsByClassName("result__a")[0].href;
  }
  getDOMElementsFromSearch(doc) {
    return doc.getElementsByClassName("result");
  }
  filterAdds(urls) {
    return urls.filter(
      (result) => !result.startsWith("https://duckduckgo.com/y.js")
    );
  }
}

function startBackground(hostName) {
  switch (hostName) {
    case "google":
      return new GoogleResult();
      break;
    case "duckduckgo":
      return new DDGResult();
      break;
    case "bing":
      return new BingResult();
      break;
  }
}

browser.runtime.onMessage.addListener((request, sender) => {
  console.log(
    "Data received on background: " + request.searchQuery,
    "y ",
    request.host
  );

  let host = startBackground(request.host);
  return host.launchSearch(request.searchQuery);
});

class MatchP2P extends AbstractP2PExtensionBackground {
  constructor() {
    super();
    this.listado = {};
    this.dataTemp = null;
    this.setExtensionName("TPF-OO2");
    this.setExtensionId("searchMatches@oncosmos.com");
  }
  saveItem(item) {
    this.listado[item] = 1;
  }

  deleteItem(item) {
    this.listado[item] = 0;
  }

  getItems() {
    return this.listado;
  }

  initialize() {}

  async processRequest(msg, peer) {
    try {
      remoteuser = peer;
      if (msg) {
        console.log("Arriba contenido de Remoto: ");
        if (msg.type == "searchResult") {
          console.log(msg.data);
        }
      }
      browser.notifications.create({
        type: "basic",
        iconUrl: browser.extension.getURL("icons/lupa-48.png"),
        title: "SEARCH FULL.",
        message: "BUSQUEDA REALZIADA CON EXITO.",
      });
    } catch (e) {
      console.log("Error al realizar processRequest.");
      console.log(e);
    }
  }

  automaticProcessing(extractor, peer) {
    console.log("Automatic procesing...");
    console.log(extractor);
    console.log("Automatic procesing finished...");
  }
  getDataP2P() {
    try {
      return this.dataTemp;
    } catch (e) {
      console.log("Error al intentar acceder al traductor");
      console.log(e);
    }
  }

  setDataP2P(data) {
    try {
      this.dataTemp = data;
    } catch (e) {
      console.log("Error al intentar acceder al traductor");
      console.log(e);
    }
  }
}

var dbp2p = new MatchP2P();
dbp2p.connect();
