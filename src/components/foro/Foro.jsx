import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "./Firebase-setup.js";
import "./Foro.css";

function Foro() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const messagesRef = ref(db, "messages/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        })).reverse();
        setMessages(list);
      } else {
        setMessages([]);
      }
    }, (error) => {
      console.error("Error al leer mensajes:", error);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const messagesRef = ref(db, "messages/");
    const newMessageRef = push(messagesRef);
    set(newMessageRef, { message: message, sentBy: name })
      .then(() => console.log("Mensaje enviado"))
      .catch((error) => console.error("Error:", error));
    setMessage("");
    setName("");
  };

  const deleteMessage = (id) => {
    const messageRef = ref(db, `messages/${id}`);
    remove(messageRef)
      .then(() => console.log("Mensaje eliminado"))
      .catch((error) => console.error("Error al eliminar:", error));
  };

  return (
    <div className="foro-container">
      <h2>{t("foro.title")}</h2>

      <form onSubmit={sendMessage} className="foro-form">
        <input
          type="text"
          placeholder={t("foro.namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={t("foro.messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">{t("foro.send")}</button>
      </form>

      <div className="foro-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="foro-message">
            <div className="foro-message-content">
              <strong>{msg.sentBy}:</strong>
              <p>{msg.message}</p>
            </div>
            <button className="delete-button" onClick={() => deleteMessage(msg.id)}>
              {t("foro.delete")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Foro;