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
}

function sendMessage(message) {
  // send the message to some api here, and maybe do input validation
  appendToChatContainer(message, true);
}

async function fetchResponse() {
  let chatText = "can't understand your query, please tryt again";
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
  appendToChatContainer(chatText);
}

(function listenToInput() {
  const textAreaEl = document.querySelector(
    "#widget-app .widget-form textarea"
  );
  textAreaEl.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      sendMessage(textAreaEl.value);
      textAreaEl.value = "";
      await fetchResponse();
    }
  });
})();
