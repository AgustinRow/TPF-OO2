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
  stylingDivForContainer(div) {
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.right = "0";

    return div;
  }
  //TODO: refactorizar
  createContainer(position1, position2) {
    //
    var divImageContainer = document.createElement("div");
    divImageContainer = this.stylingDivForContainer(divImageContainer);
    divImageContainer.style.display = "flex";
    //------------------
    var divResult = document.createElement("div");
    divResult.style.backgroundColor = "white";
    divResult.style.display = "flex";
    //------------------
    var divNumber = document.createElement("div");
    if (position1 + 1 == 0) {
      divNumber.style.backgroundImage = this.notFound;
      divNumber.style.width = "16px";
      divNumber.style.height = "16px";
    } else {
      divNumber.textContent = position1 + 1;
    }
    divNumber.style.fontSize = "18px";
    divResult.appendChild(divNumber);
    divResult.appendChild(this.createImageContainer(this.image1));
    //------------------
    var divNumber2 = document.createElement("div");
    divResult.appendChild(divNumber2);

    if (position2 + 1 == 0) {
      divNumber2.style.backgroundImage = this.notFound;
      divNumber2.style.width = "16px";
      divNumber2.style.height = "16px";
    } else {
      divNumber2.textContent = position2 + 1;
    }
    divNumber2.style.fontSize = "18px";

    divResult.appendChild(this.createImageContainer(this.image2));
    divImageContainer.appendChild(divResult);
    return divImageContainer;
  }
  //TODO: refact
  createImageContainer(image) {
    var div = document.createElement("div");
    div.style.padding = "2px 9px 2px 9px";
    div.style.width = "48px";
    div.style.height = "48px";
    div.style.fontSize = "15px";
    div.style.margin = "0";
    div.style.color = "white";
    div.style.backgroundRepeat = "no-repeat";
    //TODO: cambiar la url con concatenar "url(image)"
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
      var div = this.createContainer(position1, position2);
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

class GoogleSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.image1 = this.ddgIcon;
    this.image2 = this.bingIcon;
  }

  async launchSearch() {
    const ddgResult = await this.launchBackground("duckduckgo");
    const bingResult = await this.launchBackground("bing");
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

class DdgSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.image1 = this.googleIcon;
    this.image2 = this.bing;
  }

  async launchSearch() {
    const googleResult = await this.launchBackground("google");
    const bingResult = await this.launchBackground("bing");
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

class BingSearchManager extends ContentMatchesManager {
  constructor() {
    super();
    this.image1 = this.googleIcon;
    this.image2 = this.ddgIcon;
  }

  async launchSearch() {
    const googleResult = await this.launchBackground("google");
    const ddgResult = await this.launchBackground("duckduckgo");
    var mashUp = new MashUpResults("b_header");
    mashUp.addMashUpButton();
    this.renderSearchResult(googleResult, ddgResult); // primero google y segundo ddg
  }
  stylingDivForContainer(div) {
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
  constructor(location) {
    this.id = location;
  }
  button() {
    var button = document.createElement("button");
    button.innerHTML = "MashUp Result";
    return button;
  }

  mashUpContainer() {
    //divButton es donde va a almacenar el boton
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
//initialize search engine object
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
