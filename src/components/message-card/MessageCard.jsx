import { useTranslation } from "react-i18next";
import "./MessageCard.css";

function MessageCard({ name, category, message, editing, editText, setEditText, onEdit, onSave, onDelete }) {
  const { t } = useTranslation();

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
            <button onClick={onSave}>{t("messageCard.save")}</button>
          </>
        ) : (
          <p>{message}</p>
        )}
      </div>
      <div className="message-actions">
        {!editing && <button onClick={onEdit}>{t("messageCard.edit")}</button>}
        <button className="delete-btn" onClick={onDelete}>{t("messageCard.delete")}</button>
      </div>
    </div>
  );
}

export default MessageCard;