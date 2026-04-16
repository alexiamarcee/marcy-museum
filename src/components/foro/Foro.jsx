import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  subscribeToMessages,
  addMessage,
  deleteMessage,
  updateMessageFields,
} from "../../services/Firebase-service.js";
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
    const unsubscribe = subscribeToMessages(
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list = Object.entries(data)
            .map(([key, value]) => ({ id: key, category: "general", ...value }))
            .reverse();
          setMessages(list);
        } else {
          setMessages([]);
        }
      },
      { limit: 50 }
    );
    return () => unsubscribe();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    addMessage({ sentBy: name, message, category });
    setName("");
    setMessage("");
  };

  const startEdit = (msg) => {
    setEditingId(msg.id);
    setEditTexts((prev) => ({ ...prev, [msg.id]: msg.message }));
  };

  const updateMessage = (id) => {
    updateMessageFields(id, { message: editTexts[id] });
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
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mensaje"
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
        {filteredMessages.map((msg) => (
          <MessageCard
            key={msg.id}
            name={msg.sentBy}
            category={msg.category}
            message={msg.message}
            editing={editingId === msg.id}
            editText={editTexts[msg.id] || ""}
            setEditText={(val) =>
              setEditTexts((prev) => ({ ...prev, [msg.id]: val }))
            }
            onEdit={() => startEdit(msg)}
            onSave={() => updateMessage(msg.id)}
            onDelete={() => deleteMessage(msg.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Foro;