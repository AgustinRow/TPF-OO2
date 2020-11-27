

var objBack=browser.extension.getBackgroundPage();

objBack.loadLibrary();

function addCSS(filename){
    
    let head = document.getElementsByTagName('head')[0];
    let style = document.createElement('link');
    style.href = filename;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);

}

function addScript(filename){
 
 let head = document.getElementsByTagName('head')[0];
 let script = document.createElement('script');
 script.src = filename;
 script.type = 'text/javascript';
 head.append(script);

}

function loadWhenReady(){
    addScript(objBack.bootstrap_link);
    addCSS(objBack.boostrap_css);            
}

document.addEventListener("DOMContentLoaded",function (){
    
    try {

        addScript(objBack.popper_link);
        addScript(objBack.jquery_link);
        setTimeout(loadWhenReady, 150);

    } catch (error) {
        console.log(error);
    }
   
});
