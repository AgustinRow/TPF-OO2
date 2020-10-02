document.body.style.border = "5px solid red";

class ContentMatchesManager {
  createContainer(position1, position2) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.right = "0";
    div.style.display = "flex";
    //-------------------------//
    div.appendChild(this.createImageContainer(position1 + 1, this.image1));
    div.appendChild(this.createImageContainer(position2 + 1, this.image2));
    return div;
  }

  createImageContainer(position, image) {
    var div = document.createElement("div");
    div.style.padding = "2px 9px 2px 9px";
    div.style.width = "48px";
    div.style.height = "48px";
    div.style.fontSize = "15px";
    div.style.margin = "0";
    div.style.color = "white";
    div.textContent = position;
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundImage = image;
    return div;
  }
  getStringFromSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("q");
    console.log("string de busqueda: " + searchQuery);
    return searchQuery;
  }
  //TODO: chequear igualdad de url de distintos navegadores www de google vs https de bing y ddg
  renderSearchResult(searches) {
    console.log("render");
    const myDOMelements = this.parseDOM();
    console.log(myDOMelements);
    console.log(searches.busqueda1);
    console.log(searches.busqueda2);

    for (const element of myDOMelements) {
      let url = element.href;
      const _urlParams = new URLSearchParams(url);
      //TODO: search cambia segun el buscador... RESOLVER
      const position1 = searches.busqueda1.findIndex(
        (element) => element === url
      );
      const position2 = searches.busqueda2.findIndex(
        (element) => element === url
      );
      var div = this.createContainer(position1, position2);
      element.insertAdjacentHTML("afterend", div.outerHTML);
    }
  }

  parseDOM() {
    return Array.from(this.getDOMElementsFromSearch()).map((result) =>
      this.filterDOMElements(result)
    );
  }
}
//TODO: refactorizar DOMelements()
class GoogleSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.image2 =
      "url(https://www.shareicon.net/data/48x48/2017/06/21/887353_microsoft_512x512.png)";
    this.image1 =
      "url(https://www.shareicon.net/data/48x48/2016/08/01/639857_internet_512x512.png)";
  }

  filterDOMElements(doc) {
    return doc.getElementsByTagName("a")[0];
  }
  getDOMElementsFromSearch() {
    return document.getElementsByClassName("r");
  }
}
//TODO: refactorizar DOMelements()
class DdgSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.image1 =
      "url(https://www.shareicon.net/data/48x48/2015/09/25/107042_new_512x512.png)";
    this.image2 =
      "url(https://www.shareicon.net/data/48x48/2017/06/21/887353_microsoft_512x512.png)";
  }
  filterDOMElements(doc) {
    return doc.getElementsByClassName("result__a")[0];
  }
  getDOMElementsFromSearch() {
    return document.getElementsByClassName("result");
  }
}
//TODO: refactorizar DOMelements()
class BingSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.image1 =
      "url(https://www.shareicon.net/data/48x48/2015/09/25/107042_new_512x512.png)";
    this.image2 =
      "url(https://www.shareicon.net/data/48x48/2016/08/01/639857_internet_512x512.png)";
  }
  filterDOMElements(doc) {
    return doc.getElementsByTagName("a")[0];
  }
  getDOMElementsFromSearch() {
    return document
      .getElementById("b_results")
      .getElementsByClassName("b_algo");
  }
}
function getHostName() {
  return window.location.hostname
    .split(".")
    .filter((words) => words.length > 3)
    .toString();
}

var google = new GoogleSearchManager();
var ddg = new DdgSearchManager();
var bing = new BingSearchManager();

var currentSearchEngine = (function () {
  switch (getHostName()) {
    case "google":
      return google;
      break;
    case "duckduckgo":
      return ddg;
      break;
    case "bing":
      return bing;
      break;
  }
})();

var query = currentSearchEngine.getStringFromSearch();
console.log(query);

browser.runtime
  .sendMessage({
    host: getHostName(),
    searchQuery: currentSearchEngine.getStringFromSearch(),
  })
  .then((response) => {
    currentSearchEngine.renderSearchResult(response);
  });

//"www.google.com"
//"duckduckgo.com"
//"www.bing.com"
