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
  //TODO: refactorizar
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
  //TODO: refact
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

  removeHTTPFromBegin(url) {
    return url.split("//")[1];
  }
  //TODO: chequear igualdad de url de distintos navegadores www de google vs https de bing y ddg
  renderSearchResult(searchEngine1, searchEngine2) {
    const myDOMelements = this.parseDOM(document);

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
  // addMashUpButton() {
  //   var divContainerForButton = document.getElementById("hdtbSum");
  //   var button = this.mashUpButton();
  //   divContainerForButton.insertAdjacentElement("beforeend", button);
  // }

  async launchSearch() {
    const ddgResult = await this.launch("duckduckgo");
    const bingResult = await this.launch("bing");
    var mashUp = new MashUpResults();
    mashUp.addMashUpButton("hdtbSum");
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
  // addMashUpButton() {
  //   var divContainerForButton = document.getElementById("header");
  //   divContainerForButton.insertAdjacentElement(
  //     "beforeend",
  //     this.mashUpButton()
  //   );
  // }
  async launchSearch() {
    const googleResult = await this.launch("google");
    const bingResult = await this.launch("bing");
    var mashUp = new MashUpResults();
    mashUp.addMashUpButton("header");
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
  // addMashUpButton() {
  //   var divContainerForButton = document.getElementById("b_header");
  //   console.log(divContainerForButton);
  //   divContainerForButton.insertAdjacentElement(
  //     "beforeend",
  //     this.mashUpButton()
  //   );
  // }
  async launchSearch() {
    const googleResult = await this.launch("google");
    const ddgResult = await this.launch("duckduckgo");
    var mashUp = new MashUpResults();
    mashUp.addMashUpButton("b_header");
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
//----------------------------------------//

class MashUpResults {
  button() {
    var button = document.createElement("button");
    button.innerHTML = "MashUp Result";
    //button.addEventListener("click", this.popupResults);
    return button;
  }

  mashUpButton() {
    var divButton = document.createElement("div");
    divButton.style.display = "flex";
    divButton.style.alignItems = "flex-end";
    divButton.style.justifyContent = "flex-end";
    //creando span para popup//
    //
    divButton.appendChild(this.button());
    return divButton;
  }
  addMashUpButton(id) {
    var divContainerForButton = document.getElementById(id);
    var button = this.mashUpButton();
    divContainerForButton.insertAdjacentElement("beforeend", button);
    button.addEventListener("click", this.popupResults());
  }

  popupResults() {
    console.log("pop");
    //var span = document.createElement("span");
    //span.innerHTML = "Mash Up de Resultados";
    //id.appendChild(span);
  }
}
//width: 160px;
//background-color: #555;
//color: #fff;
//text-align: center;
//border-radius: 6px;
//padding: 8px 0;
//position: absolute;
//z-index: 1;
//bottom: 125%;
//left: 50%;
//margin-left: -80px;
//----------------------------------------//

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
