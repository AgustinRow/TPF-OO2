document.body.style.border = "5px solid red";

class MashUpResults {
  constructor() {
    this.id = "hdtbSum";
  }
  button() {
    var button = document.createElement("button");
    button.innerHTML = "MashUp Result";
    //button.addEventListener("click", this.popupResults);
    return button;
  }

  mashUpButton() {
    //este div es donde va a almacenar el boton
    var divButton = document.createElement("div");
    divButton.style.display = "flex";
    divButton.style.alignItems = "flex-end";
    divButton.style.justifyContent = "flex-end";
    divButton.appendChild(this.button());
    return divButton;
  }
  addMashUpButton() {
    var divContainerForButton = document.getElementById(this.id);
    //button contiene un div y ahi dentro el boton
    var button = this.mashUpButton();
    divContainerForButton.insertAdjacentElement("beforeend", button);
    button.addEventListener("click", this.openPopupResults);
  }

  openPopupResults() {
    console.log("me clickeaste");
    //a partir de aca es cuando se debe mostrar el popup
    var popUpContent = createPopUpContent();
    this.id.appendChild(popUpContent);
  }

  createPopUpContent() {
    var popup = document.createElement("div");
    popup.innerText = "lorem ipsum bla bla";
    popup.style.position = "fixed";
    popup.style.top = "%50";
    popup.style.left = "%50";
    popup.style.border = "1px solid black ";
    popup.style.borderRadius = "10 px";
    popup.style.zIndex = "10";
    popup.style.backgroundColor = "white";
    popup.style.width = "100px";
    popup.style.maxWidth = "%80";
    return popup;
  }
}

var button = new MashUpResults();
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
