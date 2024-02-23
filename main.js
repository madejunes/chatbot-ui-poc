import "./style.css";

function appendToChatContainer(message, isSender = false) {
  const chatContainerEl = document.querySelector(
    "#widget-app .widget-chat-container"
  );

  const isSenderCssClass = isSender ? "me" : "";

  chatContainerEl.innerHTML += `
      <div class="message-wrapper ${isSenderCssClass}">
            <div class="message-inner">
              <div class="message">${message}</div>
            </div>
          </div>
    `;

  chatContainerEl.scrollTo({
    top: chatContainerEl.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}

function sendMessage(message) {
  // send the message to some api here, and maybe do input validation
  appendToChatContainer(message, true);
}

async function fetchResponse() {
  let chatText = "can't understand your query, please try again";
  toggleLoadingIndicator(true);
  try {
    const response = await fetch(
      "https://baconipsum.com/api/?type=all-meat&sentences=1"
    ).then((res) => res.json());
    if (response.length && response[0]) {
      chatText = response[0];
    }
  } catch (e) {
    // error handling
  }
  toggleLoadingIndicator(false);
  appendToChatContainer(chatText);
}

function toggleLoadingIndicator(show) {
  const loadingIndicatorEl = document.querySelector(
    "#widget-app .widget-chat-container .loading-indicator"
  );
  if (show) {
    loadingIndicatorEl.classList.add("show");
  } else {
    loadingIndicatorEl.classList.remove("show");
  }
}

(function listenToInput() {
  const textAreaEl = document.querySelector(
    "#widget-app .widget-form textarea"
  );
  textAreaEl.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      sendMessage(textAreaEl.value);
      textAreaEl.value = "";
      textAreaEl.selectionStart = 0;
      textAreaEl.selectionEnd = 0;
      await fetchResponse();
    }
  });
})();
