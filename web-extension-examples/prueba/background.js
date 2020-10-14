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
