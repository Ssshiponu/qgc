chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'SEARCH_TEXT') {
      chrome.storage.local.set({ searchText: request.text });
      // Open search in new tab directly
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(request.text)}&tbm=isch`;
      chrome.tabs.create({ url: searchUrl });
    }
  });