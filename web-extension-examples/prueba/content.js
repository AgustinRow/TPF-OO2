document.body.style.border = "5px solid red";

class ContentMatchesManager {
  constructor() {
    this.bingIcon =
      "url(https://www.shareicon.net/data/48x48/2016/07/09/118235_bing_512x512.png)";
    this.googleIcon =
      "url(https://www.shareicon.net/data/48x48/2015/09/25/107042_new_512x512.png)";
    this.ddgIcon =
      "url(https://www.shareicon.net/data/48x48/2016/08/01/639857_internet_512x512.png)";
    this.notFound =
      "url(https://www.shareicon.net/data/16x16/2016/04/14/492935_no_34x34.png)";
  }

  async launch(engine1, engine2) {
    const searchResult1 = await this.launchBackground(engine1);
    const searchResult2 = await this.launchBackground(engine2);
    this.renderSearchResult(
      this.filterEmptyOrUndefinedElementsFromArray(searchResult1),
      this.filterEmptyOrUndefinedElementsFromArray(searchResult2)
    );

    return [searchResult1, searchResult2];
  }

  filterEmptyOrUndefinedElementsFromArray(array) {
    return array.filter((e) => e !== undefined && e !== "");
  }

  launchBackground(hostName) {
    return browser.runtime
      .sendMessage({
        host: hostName,
        searchQuery: currentSearchEngine.getStringFromSearch(),
      })
      .then((response) => {
        return response;
      });
  }
  //TODO: refact... agregar icon 1 y icon 2 como argumento a esta funcion. Asi elimino las variables de cada clase
  renderSearchResult(searchEngine1, searchEngine2) {
    const DOMelements = this.filterEmptyOrUndefinedElementsFromArray(
      this.parseDOM()
    );
    console.log(DOMelements);
    console.log(searchEngine2);
    console.log(searchEngine1);
    for (const eachDomElement of DOMelements) {
      let url = eachDomElement.href;
      const position1 = this.findPositionFromMatch(searchEngine1, url);
      const position2 = this.findPositionFromMatch(searchEngine2, url);
      var div = this.renderMatches(position1 + 1, position2 + 1);
      eachDomElement.parentElement.style.width = "100%";
      eachDomElement.insertAdjacentHTML("afterend", div.outerHTML);
    }
  }

  findPositionFromMatch(searchEngine, url) {
    return searchEngine.findIndex((element) => {
      return (
        this.removeHTTPFromBegin(element) === this.removeHTTPFromBegin(url)
      );
    });
  }

  removeHTTPFromBegin(url) {
    let result = url.split("//")[1];
    if (result.startsWith("www.")) {
      return result.split("www.")[1];
    } else {
      return result;
    }
  }
  //TODO: aregar icon1 y icon2 como argumentos de esta funcion
  renderMatches(position1, position2) {
    var divIconContainer = document.createElement("div");
    divIconContainer = this.stylingDivForIconContainer(divIconContainer);
    divIconContainer.style.display = "flex";
    //------------------//
    var divResult = document.createElement("div");
    divResult.style.backgroundColor = "white";
    divResult.style.display = "flex";
    divResult.style.zIndex = "1";
    //------------------//
    divResult.appendChild(this.stylingDivForPosition(position1));
    divResult.appendChild(this.createIconContainer(this.icon1));
    //------------------//
    divResult.appendChild(this.stylingDivForPosition(position2));
    divResult.appendChild(this.createIconContainer(this.icon2));
    //------------------//
    divIconContainer.appendChild(divResult);
    return divIconContainer;
  }

  stylingDivForIconContainer(div) {
    div.style.position = "absolute";
    div.style.top = ";0";
    div.style.right = "0";
    return div;
  }

  stylingDivForPosition(position) {
    var div = document.createElement("div");
    if (position == 0) {
      div.style.backgroundImage = this.notFound;
      div.style.width = "16px";
      div.style.height = "16px";
    } else {
      div.textContent = position;
    }
    div.style.fontSize = "18px";
    return div;
  }

  createIconContainer(image) {
    var div = document.createElement("div");
    div.style.padding = "2px 9px 2px 9px";
    div.style.width = "48px";
    div.style.height = "48px";
    div.style.fontSize = "15px";
    div.style.margin = "0";
    div.style.color = "white";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundImage = image;
    return div;
  }
  getStringFromSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("q");
    console.log("String de busqueda: " + searchQuery);
    return searchQuery;
  }

  parseDOM() {
    return Array.from(this.getDOMElementsFromSearch()).map((result) =>
      this.filterDOMElements(result)
    );
  }
}
//------------------------------------------------------------//

class GoogleSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.icon1 = this.ddgIcon;
    this.icon2 = this.bingIcon;
  }

  async launchSearch() {
    const results = await this.launch("duckduckgo", "bing");
    console.log(results[0]);
    const myResults = this.parseDOM();
    console.log(myResults);
    var mashUp = new RenderMashUpResults(
      "hdtbSum",
      myResults,
      results[0],
      results[1]
    );
    mashUp.render();
  }

  filterDOMElements(doc) {
    return doc.getElementsByTagName("a")[0];
  }
  getDOMElementsFromSearch() {
    return document.getElementsByClassName("g");
  }
}

//--------------------------------------------------//
class DdgSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.icon1 = this.googleIcon;
    this.icon2 = this.bingIcon;
  }

  async launchSearch() {
    try {
      const results = await this.launch("google", "bing");
      const myResults = this.parseDOM();

      var mashUp = new RenderMashUpResults(
        "header_wrapper",
        results[0],
        results[1],
        myResults
      );
      mashUp.render();
    } catch (e) {
      console.log("error", e);
    }
  }

  filterDOMElements(doc) {
    return doc.getElementsByClassName("result__a")[0];
  }
  getDOMElementsFromSearch() {
    return document.getElementsByClassName("result");
  }
}

//----------------------------------------------------------//

class BingSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.icon1 = this.googleIcon;
    this.icon2 = this.ddgIcon;
  }

  async launchSearch() {
    const results = await this.launch("google", "duckduckgo");
    const myResults = this.parseDOM();
    var mashUp = new RenderMashUpResults(
      "b_header",
      results[0],
      myResults,
      results[1]
    );
    mashUp.render();
  }

  stylingDivForIconContainer(div) {
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
//----------------------------------------//

class RenderMashUpResults {
  constructor(DOMlocation, googleResults, ddgResults, bingResults) {
    this.id = DOMlocation;
    this.google = googleResults;
    this.ddg = ddgResults;
    this.bing = bingResults;
  }
  render() {
    console.log("mash");
    var divTargetForButton = document.getElementById(this.id);
    var mashUpContainer = this.createMashUpContainer();
    const popUp = this.createPopUpContent();
    const button = this.button();
    mashUpContainer.appendChild(button);
    mashUpContainer.appendChild(popUp);
    divTargetForButton.insertAdjacentElement("beforeend", mashUpContainer);
    button.addEventListener("click", this.openPopupResults);
  }

  button() {
    var button = document.createElement("button");
    button.innerHTML = "MashUp Result";
    return button;
  }

  createMashUpContainer() {
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "flex-end";
    div.style.justifyContent = "flex-end";
    div.style.flexDirection = "column";
    div.style.position = "absolute";
    div.style.top = "70px";
    div.style.right = "20px";
    return div;
  }

  openPopupResults(e) {
    var popUp = document.getElementById("popup");
    if (popUp.style.visibility == "visible") {
      popUp.style.visibility = "hidden";
    } else {
      popUp.style.visibility = "visible";
    }
  }

  createPopUpContent() {
    var divContainerForPopup = document.createElement("div");
    divContainerForPopup.id = "popup";
    divContainerForPopup.style.display = "flex";
    divContainerForPopup.style.backgroundColor = "white";
    divContainerForPopup.style.zIndex = "1";
    divContainerForPopup.style.borderColor = "black";
    divContainerForPopup.style.borderStyle = "outset";
    divContainerForPopup.style.borderRadius = "15px";
    divContainerForPopup.style.visibility = "hidden";
    divContainerForPopup.style.padding = "10px 10px";
    var popupText = document.createElement("div");
    var title = document.createElement("h2");
    title.innerHTML = "Mash Up Results";
    popupText.appendChild(title);
    popupText.style.padding = "10px 20px";
    var results = this.processArrayOfUrls();
    popupText.appendChild(this.createListResult(results));
    divContainerForPopup.appendChild(popupText);
    return divContainerForPopup;
  }

  createListResult(results) {
    var ul = document.createElement("ul");
    for (const each of results) {
      var li = document.createElement("li");
      li.insertAdjacentHTML("beforeend", each);
      ul.appendChild(li);
    }
    return ul;
  }

  processArrayOfUrls() {
    var contador = -1;
    function process(elem, str) {
      return elem ? insertUrlIntotLink(elem, str) : undefined;
    }

    function insertUrlIntotLink(myHref, text) {
      return "<a href=" + myHref + ">" + text + "</a>";
    }

    function numberToWord(number) {
      const position = [
        "Primer",
        "Segundo",
        "Tercer",
        "Cuarto",
        "Quinto",
        "Sexto",
        "Septimo",
        "Octavo",
        "Noveno",
        "Decimo",
        "Undécimo",
        "Duodécimo",
        "Decimotercero",
        "Decimocuarto",
        "Decimoquinto",
        "Decimosexto",
        "Decimoséptimo",
        "Decimoctavo",
        "Decimonoveno",
        "vigésimo",
        "Vigésimo primero",
        "Vigésimo segundo",
        "Vigésimo tercero",
        "Vigésimo cuarto",
        "Vigésimo quinto",
        "Vigésimo sexto",
        "Vigésimo séptimo",
        "Vigésimo octavo",
        "Vigésimo noveno",
        "Trigésimo",
        "Trigésimo primero",
        "Trigésimo segundo",
        "Trigésimo terceros",
      ];
      return position[number];
    }
    var result = _.zipWith(this.google, this.ddg, this.bing, function (
      a,
      b,
      c
    ) {
      contador++;
      return [
        process(a, numberToWord(contador) + " resultado de Google"),
        process(b, numberToWord(contador) + " resultado de DuckDuckGo"),
        process(c, numberToWord(contador) + " resultado de Bing"),
      ];
    })
      .flat()
      .filter((elem) => elem != undefined);

    return result;
  }
}

function getHostName() {
  return window.location.hostname
    .split(".")
    .filter((words) => words.length > 3)
    .toString();
}
//initialize search engine manager object
var currentSearchEngine = (function () {
  switch (getHostName()) {
    case "google":
      return new GoogleSearchManager();
      break;
    case "duckduckgo":
      return new DdgSearchManager();
      break;
    case "bing":
      return new BingSearchManager();
      break;
  }
})();
//starting the search for matches
currentSearchEngine.launchSearch();
