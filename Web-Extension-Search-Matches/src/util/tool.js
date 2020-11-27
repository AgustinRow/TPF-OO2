var backgroundPage_1 = browser.extension.getBackgroundPage();

var usuarios = document.getElementById("listusers");
//var listItems = document.getElementById("listitems");
//var tab = backgroundPage_1.tabActive;
const hostsInput = "*://*.com/*,";
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("q");
//const codeInput = document.querySelector("#code");
var uuid = "";
var p2pExtension = backgroundPage_1.dbp2p;
var searchManagerGoogle = backgroundPage_1.startBackground("google");
//searchManagerGoogle.launchSearch()
function loadUsersCustom(event) {
  try {
    let listaUsuarios = p2pExtension.getDataCallBack();

    if (
      listaUsuarios != null ||
      listaUsuarios != undefined ||
      listaUsuarios !== "undefined"
    ) {
      let usuarios = document.getElementById("listusers");
      let optionOne = new Option("All", "All");
      usuarios.options.length = 0;
      usuarios.options[usuarios.options.length] = optionOne;
      for (let i in listaUsuarios.peers) {
        if (listaUsuarios.peers.hasOwnProperty(i)) {
          let optionNew = new Option(
            listaUsuarios.peers[i].username,
            listaUsuarios.peers[i].username
          );
          usuarios.options[usuarios.options.length] = optionNew;
        }
      }
    }
  } catch (e) {
    console.log("Error al cargar lista de usuarios");
    console.log(e);
  }
}

async function launchSearches(item) {
  try {
    debugger;
    let usuarioSelected = usuarios.selectedIndex;
    console.log("Seleccion: " + usuarios.options[usuarioSelected].value);
    let usuario = usuarios.options[usuarioSelected].value;
    console.group("Estoy en LaunchSearch de tool");
    console.log(JSON.stringify(item)); //item no tiene nada interesante
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("q");
    console.log(searchQuery);
    const result = await searchManagerGoogle.launchSearch(searchQuery);
    console.log(result);
    p2pExtension.sendRequest(
      {
        type: "searchResult",
        data: result,
        hosts: "www.google.com", //y aca? deberia el motor de bsuqueda?
        automatic: false,
      },
      usuario
    );
  } catch (e) {
    console.log("Error al utilizar sendData.");
    console.log(e);
  }
}
//function launchBackground(hostName, query) {
//  console.log("se lanza la webext?");
//  return browser.runtime
//    .sendMessage({
//      host: hostName,
//      searchQuery: query,
//    })
//    .then((response) => {
//      return response;
//    });
//}

document.addEventListener("DOMContentLoaded", function () {
  //document.querySelector('#syncdata').addEventListener('click', syncData);
  document.querySelector("#launch").addEventListener("click", launchSearches);
  //document.querySelector('#viewdata').addEventListener('click', viewData);
  //document.querySelector('#saveurl').addEventListener('click', saveUrl);

  p2pExtension.getQueryP2P(loadUsersCustom, "peers", {});
});
