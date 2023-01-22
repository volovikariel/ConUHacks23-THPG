function showPopup() {
  chrome.runtime.sendMessage({ message: "show_popup" }, function (response) {
    return;
  });
}

function main() {
  const password_field = document.querySelector("input[type='password']");
  if (!password_field) return;
  const is_register_placeholder =
    !password_field.hasAttribute("Autocomplete") ||
    password_field.getAttribute("Autocomplete") !== "true";
  if (!is_register_placeholder) return;

  const button = document.createElement("button");
  button.addEventListener("click", showPopup);
  button.type = "button";
  button.style.position = "absolute";
  button.style.top = "0px";
  button.style.marginLeft = `calc(-${password_field.clientHeight}px - 0.5rem)`;
  button.style.width = `${password_field.clientHeight}px`;
  button.style.height = `${password_field.clientHeight}px`;
  button.style.padding = `0px`;
  button.style.filter = `drop-shadow(0 0 0.5rem black)`;

  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("icons/icon128.png");
  img.style.width = `100%`;
  img.style.height = `100%`;
  button.appendChild(img);

  password_field.insertAdjacentElement("afterend", button);
}

main();
