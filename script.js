(function() {
  renderChat();

  setInterval(() => {
    renderChat();
  }, 2000);

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

  function sendMessage(name, content) {
    fetch("https://hidden-headland-7200.herokuapp.com/new", {
      method: "POST",
      body: JSON.stringify({ name, message: content }),
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      renderChat();
    });
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

  const sendBtn = document.querySelector("button");

  sendBtn.addEventListener("click", e => {
    e.preventDefault();
    const name = document.querySelector('[name="name"]');
    const content = document.querySelector('[name="message"]');
    const errorType = newMessageValidation(name.value, content.value);
    if (errorType !== -1) {
      return alert(errorsMessages[errorType]);
    }
    sendMessage(name.value, content.value);
    name.value = "";
    content.value = "";
  });

  function newMessageValidation(name, content) {
    if (!name) {
      return 0;
    } else if (!content) {
      return 1;
    } else if (name.length > 20) {
      return 2;
    } else if (content.length > 100) {
      return 3;
    } else {
      return -1;
    }
  }

  const errorsMessages = [
    "please insert name",
    "please insert message",
    "name can contain up to 10 characters",
    "message can contain up to 50 characters"
  ];
})();
