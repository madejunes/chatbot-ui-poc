import "./style.css";

function sendMyMessage(theMessage) {
  const chatContainerEl = document.querySelector(
    "#widget-app .widget-chat-container"
  );

  chatContainerEl.innerHTML += `
      <div class="message-wrapper me">
            <div class="message-inner">
              <div class="message">${theMessage}</div>
            </div>
          </div>
    `;
}

(function listenToInput() {
  const textAreaEl = document.querySelector(
    "#widget-app .widget-form textarea"
  );
  textAreaEl.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      // console.log(textAreaEl.value);
      sendMyMessage(textAreaEl.value);
      textAreaEl.value = "";
    }
  });
})();
