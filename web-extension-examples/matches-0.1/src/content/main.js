document.body.style.border = "5px solid red";

function getStringSearched(queryString) {
  const urlParams = new URLSearchParams(queryString);
  const searchQuery = urlParams.get("q");
  console.log("url de busqueda: " + searchQuery);
  return searchQuery;
}

function getURLfromSearch() {
  let googleResults = Array.from(document.getElementsByClassName("r")).map(
    (result) => result.getElementsByTagName("a")[0]
  );

  // googleResults = googleRe sults.map((result) => result.href);

  return googleResults;
}

const searchEngine = window.location.hostname;

//var _urlParams = getStringSearched(window.location.search);
const googleResults = getURLfromSearch();

function applyResults(results, google) {
  console.log(results);
  console.log(google);

  for (const gResult of google) {
    let url = gResult.href;
    console.log(gResult);
    const _urlParams = new URLSearchParams(url);
    if (_urlParams.has("url")) {
      url = _urlParams.get("url");
    }
    console.log(url);
    // Check if URL appears in DDG results, if so, get position and create the div for the little orange box.
    const ddgPosition = results.findIndex((element) => element === url);
    console.log(ddgPosition);
    gResult.insertAdjacentHTML(
      "beforeend",
      '<div style="background-color: #de5833; position: absolute; top:0; right:0;"><p style="font-size: 15px; color: white; margin: 0; padding: 2px 9px 2px 9px;">' +
        (ddgPosition + 1) +
        "</p></div>"
    );
  }
}

browser.runtime.sendMessage({
  searchQuery: getStringSearched(window.location.search),
});

browser.runtime.onMessage.addListener((request, sender) => {
  applyResults(request.args, googleResults);
});
