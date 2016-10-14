/* jshint -W117 */
/* jshint -W098 */
/* jshint -W070 */

(function () {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    // Are there any results?
    if (results.length) {
      var appendString = '<h1>Search results</h1>';

      // Iterate over the results
      for (var i = 0; i < results.length; i++) {
        var item = store[results[i].ref];
        appendString += '<article><a href="' + item.url + '"><h2>' + item.title + '</h2></a>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p></article>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<h1>No results found!</h1>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute('value', searchTerm);

    // Initalize lunr with the fields it will be searching on.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    // Add the data to lunr
    for (var key in window.store) {

      idx.add({
        id: key,
        title: window.store[key].title,
        author: window.store[key].author,
        category: window.store[key].category,
        content: window.store[key].content,
      });

      var results = idx.search(searchTerm);

      // Get lunr to perform a search
      displaySearchResults(results, window.store);
    }
  }
})();
