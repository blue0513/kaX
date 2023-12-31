let kaxEnabled = true;

chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
  if (!url.startsWith("https://twitter.com/")) {
    chrome.action.disable(tabId);
    return;
  } else {
    chrome.action.enable(tabId);
  }

  const enabled = getEnabled();
  if (!enabled) {
    showAlert(tabId);
  }

  const injectionCSS = {
    target: { tabId: tabId },
    files: ["style.css"],
  };

  toggleCSS(enabled, injectionCSS);
  toggleIcon(enabled);
});

chrome.action.onClicked.addListener(() => {
  setEnabled(!getEnabled());
  reload();
});

function setEnabled(value) {
  kaxEnabled = value;
}

function getEnabled() {
  return kaxEnabled;
}

function reload() {
  chrome.tabs.reload();
}

function showAlert(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => alert("kaX is not currently running.\nAre you sure?"),
  });
}

function toggleCSS(enabled, css) {
  if (enabled) {
    chrome.scripting.insertCSS(css);
  } else {
    chrome.scripting.removeCSS(css);
  }
}

function toggleIcon(enabled) {
  const icon = enabled
    ? "favicon/favicon16.png"
    : "favicon/favicon_disabled.png";
  chrome.action.setIcon({ path: icon });
}
