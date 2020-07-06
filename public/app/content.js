chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  document.getElementById('root').style.backgroundColor = message.payload;
});