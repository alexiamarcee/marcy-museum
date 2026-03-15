import "./MessageCard.css";

function MessageCard({ name, category, message, editing, editText, setEditText, onEdit, onSave, onDelete }) {
  return (
    <div className="message-card">
      <div className="message-content">
        <strong>{name}</strong> <span className="category">{category}</span>
        {editing ? (
          <>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={onSave}>Guardar</button>
          </>
        ) : (
          <p>{message}</p>
        )}
      </div>
      <div className="message-actions">
        {!editing && <button onClick={onEdit}>Editar</button>}
        <button className="delete-btn" onClick={onDelete}>Borrar</button>
      </div>
    </div>
  );
}

export default MessageCard;