let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppnedSearchResult(result) {
    // Creating result Item 
    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add("search-results");
    searchResultsEl.appendChild(resultItemEl);

    // Creating title element: 
    let {
        link,
        title,
        description
    } = result;
    let resultTitleEl = document.createElement('a');
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);


    // Creating break element:
    let titleBreakEl = document.createElement('br');
    resultItemEl.appendChild(titleBreakEl);

    // Creating URL element:
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);
    // Creating break element:
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // Creating Description element:
    let descriptionEL = document.createElement('p');
    descriptionEL.classList.add("link-description");
    descriptionEL.textContent = description;
    resultItemEl.appendChild(descriptionEL);

}

function displayResults(searchResults) {
    spinnerEl.classList.toggle('d-none');
    for (let result of searchResults) {
        createAndAppnedSearchResult(result);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle('d-none');
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            let {
                search_results
            } = jsonData;
            displayResults(search_results);
        });
    }
}
searchInputEl.addEventListener("keydown", searchWiki);