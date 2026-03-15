import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ref, onValue, push, remove, update, query, limitToLast } from "firebase/database"; import { db } from "./Firebase-setup";
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
  const [editTexts, setEditTexts] = useState({}); // editText por mensaje

  // Escuchar mensajes desde Firebase
  useEffect(() => {
    const messagesRef = query(ref(db, "messages/"), limitToLast(50));
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data)
          .map(([key, value]) => ({ id: key, category: "general", ...value }))
          .reverse();
        setMessages(list);
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, []);
  // Enviar nuevo mensaje
  const sendMessage = (e) => {
    e.preventDefault();
    if (!name || !message) return;

    const messagesRef = ref(db, "messages/");
    push(messagesRef, {
      sentBy: name,
      message,
      category,
    });

    setName("");
    setMessage("");
  };

  // Borrar mensaje
  const deleteMessage = (id) => remove(ref(db, `messages/${id}`));

  // Iniciar edición
  const startEdit = (msg) => {
    setEditingId(msg.id);
    setEditTexts((prev) => ({ ...prev, [msg.id]: msg.message }));
  };
  // Guardar edición
  const updateMessage = (id) => {
    update(ref(db, `messages/${id}`), { message: editTexts[id] });
    setEditingId(null);
    setEditTexts((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // Filtrar mensajes por categoría
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
        <option value="">Todas las categorías</option>
        <option value="general">General</option>
        <option value="ayuda">Ayuda</option>
        <option value="noticias">Noticias</option>
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
          <option value="general">General</option>
          <option value="ayuda">Ayuda</option>
          <option value="noticias">Noticias</option>
        </select>
        <button type="submit">Enviar</button>
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