chrome.runtime.onInstalled.addListener(function() {
  
});
chrome.browserAction.onClicked.addListener(function(activeTab){
  chrome.tabs.create({ url: chrome.extension.getURL("index.html") });
});