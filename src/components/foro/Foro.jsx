import { useState, useEffect } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "./Firebase-setup.js";
import "./Foro.css";

function Foro() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const messagesRef = ref(db, "messages/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data).reverse();
        setMessages(list);
      }
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const messagesRef = ref(db, "messages/");
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      message: message,
      sentBy: name,
    });
    setMessage("");
    setName("");
  };

  return (
    <div className="foro-container">
      <h2>Foro del Museo</h2>

      <form onSubmit={sendMessage} className="foro-form">
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tu mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <div className="foro-messages">
        {messages.map((msg, index) => (
          <div key={index} className="foro-message">
            <strong>{msg.sentBy}:</strong>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Foro;
