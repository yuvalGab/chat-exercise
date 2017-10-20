(function() {
  setInterval(() => {
    renderChat();
  }, 2000);

  renderChat();

  function renderChat() {
    const existMessages = document.querySelectorAll(".message");
    getMessages().then(messages => {
      const allMessages = messages.filter(msg => msg.name && msg.message);
      if (allMessages && existMessages) {
        if (allMessages.length > existMessages.length) {
          allMessages.forEach((msg, i) => {
            if (i > existMessages.length - 1) {
              printMessage(msg.name, msg.message);
            }
          });
        }
      } else if (!existMessages) {
        allMessages.forEach(msg => printMessage(msg.name, msg.message));
      }
    });
  }

  function getMessages() {
    return fetch("http://hidden-headland-7200.herokuapp.com/").then(res =>
      res.json()
    );
  }

  function printMessage(name, content) {
    const messagesWindow = document.querySelector(".messages-window");
    let message = document.createElement("div");
    let namePlace = document.createElement("span");
    let contentPlace = document.createElement("p");
    message.classList.add("message");
    namePlace.innerText = `${name}:`;
    contentPlace.innerHTML = content;
    message.appendChild(namePlace);
    message.appendChild(contentPlace);
    messagesWindow.appendChild(message);
  }
})();
