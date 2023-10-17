chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
  if (!url.startsWith("https://twitter.com/")) return;

  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: ["style.css"],
  });
});
