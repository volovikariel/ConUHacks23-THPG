chrome.action.onClicked.addListener(() => {
  showPopup();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "show_popup") {
    showPopup();
  }

  sendResponse(false);
});

function showPopup() {
  const options_url = chrome.runtime.getURL("popup.html");
  const popup_width = 400;
  const popup_height = 600;
  let left;
  let top;
  chrome.windows.getCurrent((main_window) => {
    left = main_window.left + main_window.width - popup_width;
    top = main_window.top + 110;
  });
  chrome.tabs.query(
    {
      url: options_url,
    },
    function (tabs) {
      // We're making sure that there's only one instance of the popup available at a time
      if (tabs.length == 0) {
        chrome.windows.create(
          {
            focused: true,
            width: popup_width,
            height: popup_height,
            type: "popup",
            url: "popup.html",
            top,
            left,
          },
          () => {}
        );
      } else {
        chrome.windows.update(tabs[0].windowId, { focused: true });
      }
    }
  );
}
