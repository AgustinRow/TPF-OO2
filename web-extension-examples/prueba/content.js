document.body.style.border = "5px solid red";

class ContentMatchesManager {
  launch(hostName) {
    return browser.runtime
      .sendMessage({
        host: hostName,
        searchQuery: currentSearchEngine.getStringFromSearch(),
      })
      .then((response) => {
        return response;
      });
  }
  settingDivForContainer(div) {
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.right = "0";
    return div;
  }

  createContainer(position1, position2) {
    var divContainer = document.createElement("div");
    divContainer = this.settingDivForContainer(divContainer);
    divContainer.style.display = "flex";
    var divResult = document.createElement("div");
    divResult.style.backgroundColor = "white";
    divResult.style.display = "flex";
    var divNumber = document.createElement("div");
    divNumber.textContent = position1 + 1;
    divNumber.style.fontSize = "18px";

    divResult.appendChild(divNumber);
    divResult.appendChild(
      this.createImageContainer(position1 + 1, this.image1)
    );
    var divNumber2 = document.createElement("div");
    divResult.appendChild(divNumber2);
    divNumber2.textContent = position2 + 1;
    divNumber2.style.fontSize = "18px";

    divResult.appendChild(
      this.createImageContainer(position2 + 1, this.image2)
    );
    divContainer.appendChild(divResult);
    return divContainer;
  }

  createImageContainer(position, image) {
    var div = document.createElement("div");
    div.style.padding = "2px 9px 2px 9px";
    div.style.width = "48px";
    div.style.height = "48px";
    div.style.fontSize = "15px";
    div.style.margin = "0";
    div.style.color = "white";
    //div.textContent = position;
    div.style.backgroundRepeat = "no-repeat";
    //TODO: cambiar la url con concatenar "url(image)"
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
  renderSearchResult(searchEngine1, searchEngine2) {
    const myDOMelements = this.parseDOM(document);
    console.log(searchEngine1);
    console.log(searchEngine2);
    console.log(myDOMelements);
    for (const element of myDOMelements) {
      let url = element.href;

      const position1 = searchEngine1.findIndex((element) => {
        //TODO: cambiar esto element.split("//")[1] a una function removeHTTPFromBeging()
        return element.split("//")[1] === url.split("//")[1];
      });
      const position2 = searchEngine2.findIndex(
        (element) => element.split("//")[1] === url.split("//")[1]
      );
      var div = this.createContainer(position1, position2);
      element.parentElement.style.width = "100%";
      element.insertAdjacentHTML("afterend", div.outerHTML);
    }
  }

  parseDOM() {
    return Array.from(this.getDOMElementsFromSearch()).map((result) =>
      this.filterDOMElements(result)
    );
  }
}
//TODO: refactorizar images
class GoogleSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    //TODO cambiar nombre image a urlImage
    this.image1 =
      "url(https://www.shareicon.net/data/48x48/2016/08/01/639857_internet_512x512.png)";
    this.image2 =
      "url(https://www.shareicon.net/data/48x48/2016/07/09/118235_bing_512x512.png)";
  }
  async launchSearch() {
    const ddgResult = await this.launch("duckduckgo");
    const bingResult = await this.launch("bing");
    this.renderSearchResult(ddgResult, bingResult); // primero ddg y segundo bing
  }

  filterDOMElements(doc) {
    return doc.getElementsByTagName("a")[0];
  }
  getDOMElementsFromSearch() {
    return document.getElementsByClassName("g");
  }
}
//TODO: refactorizar images
class DdgSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.image1 =
      "url(https://www.shareicon.net/data/48x48/2015/09/25/107042_new_512x512.png)";
    this.image2 =
      "url(https://www.shareicon.net/data/48x48/2016/07/09/118235_bing_512x512.png)";
  }
  async launchSearch() {
    const googleResult = await this.launch("google");
    const bingResult = await this.launch("bing");
    this.renderSearchResult(googleResult, bingResult); // primero google y segundo bing
  }
  filterDOMElements(doc) {
    return doc.getElementsByClassName("result__a")[0];
  }
  getDOMElementsFromSearch() {
    return document.getElementsByClassName("result");
  }
}
//TODO: refactorizar images
class BingSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.image1 =
      "url(https://www.shareicon.net/data/48x48/2015/09/25/107042_new_512x512.png)";
    this.image2 =
      "url(https://www.shareicon.net/data/48x48/2016/08/01/639857_internet_512x512.png)";
  }
  async launchSearch() {
    const googleResult = await this.launch("google");
    const ddgResult = await this.launch("duckduckgo");
    this.renderSearchResult(googleResult, ddgResult); // primero google y segundo ddg
  }
  settingDivForContainer(div) {
    div.style.justifyContent = "flex-end";
    return div;
  }
  filterDOMElements(doc) {
    return doc.getElementsByTagName("a")[0];
  }
  getDOMElementsFromSearch() {
    return document.getElementsByClassName("b_algo");
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

currentSearchEngine.launchSearch();

//"www.google.com"
//"duckduckgo.com"
//"www.bing.com"
