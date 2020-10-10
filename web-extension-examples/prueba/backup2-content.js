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
      div.textContent = position + 1;
    }
    div.style.fontSize = "18px";
    console.log(div);
    return div;
  }

  //TODO: refactorizar
  createContainerWithPositionFromMatch(position1, position2) {
    var divIconContainer = document.createElement("div");
    divIconContainer = this.stylingDivForIconContainer(divIconContainer);
    divIconContainer.style.display = "flex";
    //------------------
    var divResult = document.createElement("div");
    divResult.style.backgroundColor = "white";
    divResult.style.display = "flex";
    //------------------
    divResult.appendChild(this.stylingDivForPosition(position1 + 1));
    divResult.appendChild(this.createIconContainer(this.icon1));
    //------------------
    divResult.appendChild(this.stylingDivForPosition(position2 + 1));
    divResult.appendChild(this.createIconContainer(this.icon2));
    //------------------
    divIconContainer.appendChild(divResult);
    return divIconContainer;
  }
  //TODO: refact
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

  removeHTTPFromBegin(url) {
    return url.split("//")[1];
  }

  findPositionFromMatch(searchEngine, url) {
    return searchEngine.findIndex((element) => {
      return (
        this.removeHTTPFromBegin(element) === this.removeHTTPFromBegin(url)
      );
    });
  }

  renderSearchResult(searchEngine1, searchEngine2) {
    const DOMelements = this.parseDOM(document);
    for (const eachDomElement of DOMelements) {
      let url = eachDomElement.href;
      const position1 = this.findPositionFromMatch(searchEngine1, url);
      const position2 = this.findPositionFromMatch(searchEngine2, url);
      var div = this.createContainerWithPositionFromMatch(position1, position2);
      eachDomElement.parentElement.style.width = "100%";
      eachDomElement.insertAdjacentHTML("afterend", div.outerHTML);
    }
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
    const ddgResult = await this.launchBackground("duckduckgo");
    const bingResult = await this.launchBackground("bing");
    //Chequear si cuando se hace new se puede ejecutar un metodo automaticamente
    //para que instancie el boton solo haciendo new
    var mashUp = new MashUpResults("hdtbSum");
    mashUp.addMashUpButton();
    this.renderSearchResult(ddgResult, bingResult);
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
    const googleResult = await this.launchBackground("google");
    const bingResult = await this.launchBackground("bing");
    //Chequear si cuando se hace new se puede ejecutar un metodo automaticamente
    //para que instancie el boton solo haciendo new
    var mashUp = new MashUpResults("header_wrapper");
    mashUp.addMashUpButton();
    this.renderSearchResult(googleResult, bingResult);
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
    const googleResult = await this.launchBackground("google");
    const ddgResult = await this.launchBackground("duckduckgo");
    //Chequear si cuando se hace new se puede ejecutar un metodo automaticamente
    //para que instancie el boton solo haciendo new
    var mashUp = new MashUpResults("b_header");
    mashUp.addMashUpButton();
    this.renderSearchResult(googleResult, ddgResult); // primero google y segundo ddg
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

class MashUpResults {
  constructor(DOMlocation) {
    this.id = DOMlocation;
  }
  button() {
    var button = document.createElement("button");
    button.innerHTML = "MashUp Result";
    return button;
  }

  mashUpContainer() {
    //divButton es donde va a contener el boton
    var divButton = document.createElement("div");
    divButton.style.display = "flex";
    divButton.style.alignItems = "flex-end";
    divButton.style.justifyContent = "flex-end";
    divButton.style.flexDirection = "column";
    divButton.style.position = "absolute";
    divButton.style.top = "70px";
    divButton.style.right = "20px";
    var divPopUp = this.createPopUpContent();
    divButton.appendChild(this.button());
    divButton.appendChild(divPopUp);
    return divButton;
  }
  addMashUpButton() {
    var divContainerForButton = document.getElementById(this.id);
    var button = this.mashUpContainer();
    divContainerForButton.insertAdjacentElement("beforeend", button);
    button.addEventListener("click", this.openPopupResults);
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
    popupText.appendChild(this.createListResult());
    divContainerForPopup.appendChild(popupText);
    return divContainerForPopup;
  }

  createListResult() {
    var ul = document.createElement("ul");
    for (let i = 1; i < 18; i++) {
      var li = document.createElement("li");
      li.innerText = "Primer elemento de GOoogle";
      ul.appendChild(li);
    }
    return ul;
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
      return (google = new GoogleSearchManager());
      break;
    case "duckduckgo":
      return (ddg = new DdgSearchManager());
      break;
    case "bing":
      return (bing = new BingSearchManager());
      break;
  }
})();

//starting the search for matches
currentSearchEngine.launchSearch();
