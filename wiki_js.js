let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function showSpinner() {
    spinnerEl.classList.remove("d-none");
}

function hideSpinner() {
    spinnerEl.classList.add("d-none");
}

function createAndAppnedSearchResult(result) {
    // Creating result Item 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    // Wikipedia link
    let pageLink = "https://en.wikipedia.org/?curid=" + result.pageid;

    // Title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = pageLink;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = result.title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    resultItemEl.appendChild(document.createElement("br"));

    // URL element
    let urlEl = document.createElement("a");
    urlEl.href = pageLink;
    urlEl.target = "_blank";
    urlEl.textContent = pageLink;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    resultItemEl.appendChild(document.createElement("br"));

    // Description (Wikipedia returns HTML snippet → convert safely to plain text)
    let snippet = result.snippet.replace(/<\/?[^>]+(>|$)/g, ""); // remove HTML tags
    let descriptionEL = document.createElement("p");
    descriptionEL.classList.add("link-description");
    descriptionEL.textContent = snippet;
    resultItemEl.appendChild(descriptionEL);
}

function displayResults(searchResults) {
    if (!searchResults || searchResults.length === 0) {
        let noResultEl = document.createElement("p");
        noResultEl.textContent = "No results found. Try a different keyword.";
        noResultEl.classList.add("link-description");
        searchResultsEl.appendChild(noResultEl);
        return;
    }

    for (let result of searchResults) {
        createAndAppnedSearchResult(result);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {
        let searchInput = searchInputEl.value.trim();
        searchResultsEl.textContent = "";

        if (searchInput === "") {
            let msgEl = document.createElement("p");
            msgEl.textContent = "Please type a keyword to search.";
            msgEl.classList.add("link-description");
            searchResultsEl.appendChild(msgEl);
            return;
        }

        showSpinner();

        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(searchInput)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("API request failed");
                return response.json();
            })
            .then(data => {
                let results = data.query.search;
                displayResults(results);
            })
            .catch(error => {
                console.error(error);
                let errorEl = document.createElement("p");
                errorEl.textContent = "Something went wrong. Please try again.";
                errorEl.classList.add("link-description");
                searchResultsEl.appendChild(errorEl);
            })
            .finally(() => hideSpinner());
    }
}

searchInputEl.addEventListener("keydown", searchWiki);
