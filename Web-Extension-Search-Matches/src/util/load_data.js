'use strict';

var backgroundPage_1 = browser.extension.getBackgroundPage();
var p2pExtension = backgroundPage_1.dbp2p;
var printData=document.getElementById("result");


function printDataHTML(item){
	try {
		for (let i in item){
            if (item.hasOwnProperty(i)){
              printData.value=printData.value + item[i].data;
              printData.value=printData.value + ",";
            }
        };
	} catch(e) {
		console.log("Error al imprimir texto.");
		console.error(e);
	}
}

function loadData(){
	try {
		let key=p2pExtension.getDataP2P();
		let store = p2pExtension.getStore();
		store.getItem(key,printDataHTML);
	} catch(e) {
		console.log("Error al usar loadData.");
		console.log(e);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	loadData();
});
