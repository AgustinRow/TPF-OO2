function findMatchesInDDG(args) {
  let xhr = new XMLHttpRequest();

  // open and send the request.
  xhr.open(
    "GET",
    "https://html.duckduckgo.com/html/?q=" + args.searchQuery,
    true
  );

  xhr.onload = function () {
    // this function will be called when the results come in, this line gets a list of links
    let results = Array.from(
      this.responseXML.getElementsByClassName("result")
    ).map((result) => result.getElementsByClassName("result__a")[0].href);
    // remove links that are ads
    results = results.filter(
      (result) => !result.startsWith("https://html.duckduckgo.com/y.js")
    );
    // pass the array of links to the applyResults function
    console.log(results);
    console.log(args.searchQuery);

    //Tengo que enviarle la info al content
    getCurrentTab().then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        args: results,
      });
    });
  };

  xhr.responseType = "document";
  xhr.send();

  function getCurrentTab(callback) {
    return browser.tabs.query({
      active: true,
      currentWindow: true,
    });
  }
}

browser.runtime.onMessage.addListener(findMatchesInDDG);
