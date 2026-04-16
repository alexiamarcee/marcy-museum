import { addMessage, subscribeToMessages } from "../../services/Firebase-service.js";

function listenToNewMessages() {
  subscribeToMessages(showMessages);
}

function listenToSentMessageButton() {
  document.getElementById("form-send-message").addEventListener("submit", sendMessage);
}

function showMessages(snapshot) {
  const data = snapshot.val();
  const messageListElement = document.getElementById("message-list");

  if (!data) {
    messageListElement.innerHTML = "";
    return;
  }

  let messageList = "";
  for (const item in data) {
    messageList =
      `
          <div>
            <div>${data[item].sentBy}:</div>
            <div>${data[item].message}</div>
          </div>
        ` + messageList;
  }

  messageListElement.innerHTML = messageList;
}

function sendMessage(event) {
  event.preventDefault();
  const formSendMessage = event.target;

  addMessage({
    message: formSendMessage.message.value,
    sentBy: formSendMessage["sent-by"].value,
  });
}

listenToNewMessages();
listenToSentMessageButton();
