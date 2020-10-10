document.body.style.border = "5px solid red";

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
    //este div es donde va a almacenar el boton
    var divButton = document.createElement("div");
    divButton.style.display = "flex";
    divButton.style.alignItems = "flex-end";
    divButton.style.justifyContent = "flex-end";
    divButton.style.flexDirection = "column";
    var divPopUp = this.createPopUpContent();
    console.log(divPopUp);
    divButton.appendChild(this.button());

    divButton.appendChild(divPopUp);
    return divButton;
  }
  addMashUpButton() {
    var divContainerForButton = document.getElementById(this.id);
    //button contiene un div y ahi dentro el boton
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

var button = new MashUpResults("hdtbSum");
button.addMashUpButton();
/*
<div
    display: inline-block;
    content: "";
    position: absolute;
    top: 80px;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
    background-color: white;
    right: -100px;>
        <div width: 160px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 8px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -80px;>
}

*/
