chrome.runtime.onInstalled.addListener(function(){
  chrome.storage.sync.set({'enabled': false});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    const isStarmeUp = {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostSuffix: 'starmeup.com' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
    chrome.declarativeContent.onPageChanged.addRules([isStarmeUp]);
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.message) {
    case 'get-checked':
        chrome.storage.sync.get(['enabled'], function({ enabled }) {
        sendResponse(enabled);
      });
    case 'set-checked':
        chrome.storage.sync.set({'enabled': request.payload}, function() {
        sendResponse(request.payload);
      });
    case 'set-color':
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            message: "change-bg",
            payload: request.payload
          }, function(){sendResponse(request.payload);}
        )
      });
    }
  return true;
});