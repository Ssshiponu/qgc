document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.getElementById('search-container');
  const openTab = document.getElementById('open-tab');

  chrome.storage.local.get(['searchText'], (result) => {
    if (result.searchText) {
      const query = encodeURIComponent(result.searchText);
      const url = `https://www.google.com/search?tbm=isch&q=${query}`;

      // Instead of iframe, show a message and thumbnail previews
      searchContainer.innerHTML = `
        <div class="search-message">
          <p>Searching for: "${result.searchText}"</p>
          <p>Click 'Open in New Tab' to see full results</p>
        </div>
        <div class="preview-message">
          Due to Google's security policy, results can only be viewed in a new tab.
        </div>
      `;
      
      openTab.href = url;
      // Automatically open in new tab
      window.open(url, '_blank');

      // Clear the stored text
      chrome.storage.local.remove('searchText');
    }
  });
});
