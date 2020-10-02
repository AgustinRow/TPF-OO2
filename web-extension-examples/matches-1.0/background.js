class BackgroundResult {
  //async launchSearches(searchQuery) {
  //  this.initializeSearchEngines();
  //  let r1 = await google.launchSearch(searchQuery);
  //  let r2 = await ddg.launchSearch(searchQuery);
  //  let estructura = {
  //    busqueda1: r1,
  //    busqueda2: r2,
  //  };
  //
  //  return estructura;
  //}
  getMyUrl() {
    return this.url;
  }
  launchSearch(searchQuery) {
    return new Promise((resolve, reject) => {
      let oReq = new XMLHttpRequest();
      let url = this.getMyUrl();
      oReq.onload = () => {
        //me quedo en result con un array de urls que se buscaron en la request
        var parser = new DOMParser();
        var doc = parser.parseFromString(oReq.response, "text/html");

        resolve(this.parse(doc));
      };

      console.log(url + searchQuery);
      oReq.open("GET", url + searchQuery, true);
      oReq.send();
    });
  }

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
}

class BingResult extends BackgroundResult {
  constructor() {
    super();
    this.url = "https://www.bing.com/search?q=";
  }

  //initializeSearchEngines() {
  //  let google = new GoogleResult();
  //  let ddg = new DDGResult();
  //}

  async launchSearches(searchQuery) {
    let google = new GoogleResult();
    let ddg = new DDGResult();
    let r1 = await google.launchSearch(searchQuery);
    let r2 = await ddg.launchSearch(searchQuery);
    let estructura = {
      busqueda1: r1, //google
      busqueda2: r2, //ddg
    };

    return estructura;
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
    this.url = "https://www.google.com/search?q=";
  }
  async launchSearches(searchQuery) {
    let ddg = new DDGResult();
    let bing = new BingResult();
    let r1 = await ddg.launchSearch(searchQuery);
    let r2 = await bing.launchSearch(searchQuery);
    let estructura = {
      busqueda1: r1, //ddg
      busqueda2: r2, //bing
    };

    return estructura;
  }
  filterDOMElements(doc) {
    return doc.getElementsByTagName("a")[0].href;
  }
  getDOMElementsFromSearch(doc) {
    return doc.getElementsByClassName("r");
  }
}

class DDGResult extends BackgroundResult {
  constructor() {
    super();
    this.url = "https://html.duckduckgo.com/html/?q=";
  }
  async launchSearches(searchQuery) {
    let google = new GoogleResult();
    let bing = new BingResult();
    let r1 = await google.launchSearch(searchQuery);
    let r2 = await bing.launchSearch(searchQuery);
    let estructura = {
      busqueda1: r1, //google
      busqueda2: r2, //bing
    };
    return estructura;
  }
  filterDOMElements(doc) {
    return doc.getElementsByClassName("result__a")[0].href;
  }
  getDOMElementsFromSearch(doc) {
    return doc.getElementsByClassName("result");
  }
}

function startBack(hostName) {
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

var ddg = new DDGResult();
console.log(ddg);
//var google = new GoogleResult();
//var bing = new BingResult();

browser.runtime.onMessage.addListener((request, sender) => {
  console.log(
    "Data received on background: " + request.searchQuery,
    "y ",
    request.host
  );

  let host = startBack(request.host);
  console.log("host");
  return Promise.resolve(host.launchSearches(request.searchQuery));
});
