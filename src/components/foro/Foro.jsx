import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ref, onValue, push, remove, update, query, limitToLast } from "firebase/database";
import { db } from "./Firebase-setup";
import MessageCard from "../message-card/MessageCard";
import "./Foro.css";

function Foro() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTexts, setEditTexts] = useState({});

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
    if (!name || !message) return;
    push(ref(db, "messages/"), { sentBy: name, message, category });
    setName("");
    setMessage("");
  };

  const deleteMessage = (id) => remove(ref(db, `messages/${id}`));

  const startEdit = (msg) => {
    setEditingId(msg.id);
    setEditTexts((prev) => ({ ...prev, [msg.id]: msg.message }));
  };

  const updateMessage = (id) => {
    update(ref(db, `messages/${id}`), { message: editTexts[id] });
    setEditingId(null);
    setEditTexts((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const filteredMessages = messages.filter((msg) =>
    search === "" || (msg.category || "general") === search
  );

  return (
    <div className="foro-container">
      <h2>{t("foro.title")}</h2>

      <select
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
        <option value="">{t("foro.categories.all")}</option>
        <option value="general">{t("foro.categories.general")}</option>
        <option value="ayuda">{t("foro.categories.ayuda")}</option>
        <option value="noticias">{t("foro.categories.noticias")}</option>
      </select>

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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="general">{t("foro.categories.general")}</option>
          <option value="ayuda">{t("foro.categories.ayuda")}</option>
          <option value="noticias">{t("foro.categories.noticias")}</option>
        </select>
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