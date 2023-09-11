class Search {
  clearResults() {
    this.searchResultsCount.innerHTML = 'Results';
    this.searchResultsList.innerHTML = '';
  }

  addResult(result) {
    let listItem = document.createElement('li');
    listItem.classList.add('search-result-item', 'box', 'flow', 'relative');

    listItem.innerHTML = `
      <a 
        href="${result.url}" 
        class="search-result-link | repel | em-medium"
      >
        <span class="search-result-title">
          ${result.meta.title ? `${result.meta.title}` : result.url}
        </span>
        <svg width="1em" height="1em">
          <use href="#icon-link-2"></use>
        </svg>
      </a>
      <p class="search-result-excerpt | step-min-1">
      ${result.excerpt
        .replace(/</g, '&lt;')
        .replace(/&lt;mark>/g, '<mark>')
        .replace(/&lt;\/mark>/g, '</mark>')}
      </p>
    `;

    this.searchResultsList.append(listItem);
  }

  async getLibrary() {
    if (!this.pagefind) {
      try {
        this.pagefind = await import('/_pagefind/pagefind.js');
      } catch (error) {
        console.error("Error loading '/_pagefind/pagefind.js':", error);
      }
    }
    return this.pagefind;
  }

  async onInput(value) {
    let pagefind = await this.getLibrary();
    window.clearTimeout(this.onInputTimeout);
    this.onInputTimeout = window.setTimeout(async () => {
      this.clearResults();

      if (value.length > 1) {
        this.searchResults.classList.remove('hidden');

        let search = await pagefind.search(value);
        let results = await Promise.all(search.results.map(r => r.data()));

        for (let result of results) {
          this.addResult(result, value);
        }
        if (results.length) {
          this.searchResultsCount.innerHTML = `${results.length} result${
            results.length != 1 ? 's' : ''
          } for '${value}'`;
        } else {
          this.searchResultsList.innerHTML = '<li>No matches found.</li>';
        }
        this.searchResultsList.classList[results.length > 0 ? 'remove' : 'add'](
          'search-results-notfound'
        );
      } else {
        this.searchResults.classList.add('hidden');
      }
    }, 100);
  }

  getQueryString() {
    let url = new URL(document.location.href);
    let searchQueryParam = url.searchParams.get('q');
    return searchQueryParam ? decodeURIComponent(searchQueryParam) : '';
  }

  hydrate() {
    let form = document.getElementById('search-form');
    if (form) {
      form.addEventListener(
        'submit',
        function (event) {
          event.preventDefault();
        },
        false
      );
    }

    let text = document.getElementById('search-term');
    if (text) {
      text.addEventListener(
        'input',
        async event => {
          let value = event.target.value;
          await this.onInput(value);
          window.history.replaceState(
            {},
            '',
            `/search/${value ? `?q=${encodeURIComponent(value)}` : ''}`
          );
        },
        false
      );

      let queryString = this.getQueryString();
      if (queryString) {
        text.value = queryString;
        this.onInput(queryString);
      } else {
        text.value = '';
      }
    }

    let results = document.getElementById('search-results');
    if (results) {
      this.searchResults = results;
    }

    let resultsList = document.getElementById('search-results-list');
    if (resultsList) {
      this.searchResultsList = resultsList;
    }

    let resultsCount = document.getElementById('search-results-count');
    if (resultsCount) {
      this.searchResultsCount = resultsCount;
    }

    let clearButton = document.querySelector('.clear-btn');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        // Get a reference to the input element
        let searchInput = document.getElementById('search-term');

        // Clear the input text
        searchInput.value = '';

        // Trigger the 'input' event on the input element
        const event = new Event('input', {bubbles: true});
        searchInput.dispatchEvent(event);

        // Optionally, set focus back to the input field
        // searchInput.focus();
      });
    }
  }
}

let search = new Search();
search.hydrate();
