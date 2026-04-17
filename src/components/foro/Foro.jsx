import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  subscribeToMessages,
  addMessage,
  deleteMessage,
  updateMessageFields,
  importMessages,
} from "../../services/Firebase-service.js";
import MessageCard from "../message-card/MessageCard";
import "./Foro.css";

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildExportRows(messagesList) {
  return messagesList.map((msg) => ({
    sentBy: msg.sentBy ?? "",
    message: msg.message ?? "",
    category: msg.category ?? "general",
  }));
}

function toCsv(rows) {
  const headers = ["sentBy", "message", "category"];
  const lines = [headers.join(",")];
  for (const row of rows) {
    const cells = headers.map((key) => {
      const val = row[key] ?? "";
      const s = String(val);
      if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    });
    lines.push(cells.join(","));
  }
  return `\uFEFF${lines.join("\n")}`;
}

function toXml(rows) {
  const items = rows
    .map(
      (row) =>
        `  <item>\n    <sentBy>${escapeXml(row.sentBy)}</sentBy>\n    <message>${escapeXml(row.message)}</message>\n    <category>${escapeXml(row.category)}</category>\n  </item>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<forum>\n${items}\n</forum>`;
}

function downloadTextFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function parseCsvToRows(csvText) {
  const text = csvText.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  const flushField = () => {
    row.push(field);
    field = "";
  };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      flushField();
    } else if (c === "\r") {
      if (text[i + 1] === "\n") i++;
      flushField();
      rows.push(row);
      row = [];
    } else if (c === "\n") {
      flushField();
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (inQuotes) {
    throw new Error("csv");
  }
  flushField();
  if (row.length && row.some((cell) => String(cell).length > 0)) {
    rows.push(row);
  }
  return rows;
}

function csvRowsToMessages(matrix) {
  if (matrix.length === 0) return [];
  let start = 0;
  const header = matrix[0].map((c) => String(c).trim().toLowerCase());
  if (
    header[0] === "sentby" &&
    header[1] === "message" &&
    header[2] === "category"
  ) {
    start = 1;
  }
  const out = [];
  for (let i = start; i < matrix.length; i++) {
    const r = matrix[i];
    out.push({
      sentBy: r[0] ?? "",
      message: r[1] ?? "",
      category: r[2] ?? "general",
    });
  }
  return out;
}

function parseImportedJson(text) {
  const data = JSON.parse(text.replace(/^\uFEFF/, ""));
  if (!Array.isArray(data)) {
    throw new Error("json");
  }
  return data.map((item) => ({
    sentBy: item.sentBy ?? "",
    message: item.message ?? "",
    category: item.category ?? "general",
  }));
}

function parseImportedXml(text) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");
  if (doc.querySelector("parsererror")) {
    throw new Error("xml");
  }
  const items = doc.querySelectorAll("forum item");
  const out = [];
  items.forEach((item) => {
    out.push({
      sentBy: item.querySelector("sentBy")?.textContent ?? "",
      message: item.querySelector("message")?.textContent ?? "",
      category: item.querySelector("category")?.textContent ?? "general",
    });
  });
  return out;
}

function detectImportFormat(fileName, text) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".json")) return "json";
  if (lower.endsWith(".xml")) return "xml";
  if (lower.endsWith(".csv")) return "csv";
  const t = text.trimStart();
  if (t.startsWith("[") || t.startsWith("{")) return "json";
  if (t.startsWith("<")) return "xml";
  return "csv";
}

function parseForumImportFile(fileName, text) {
  const fmt = detectImportFormat(fileName, text);
  if (fmt === "json") {
    return parseImportedJson(text);
  }
  if (fmt === "xml") {
    return parseImportedXml(text);
  }
  return csvRowsToMessages(parseCsvToRows(text));
}

function Foro() {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTexts, setEditTexts] = useState({});
  const [exportFormat, setExportFormat] = useState("json");
  const [importStatus, setImportStatus] = useState(null);
  const [importing, setImporting] = useState(false);

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

  const exportForumData = () => {
    const rows = buildExportRows(filteredMessages);
    const stamp = new Date().toISOString().slice(0, 10);
    if (exportFormat === "json") {
      const body = JSON.stringify(rows, null, 2);
      downloadTextFile(`foro-mensajes-${stamp}.json`, body, "application/json;charset=utf-8");
      return;
    }
    if (exportFormat === "csv") {
      downloadTextFile(`foro-mensajes-${stamp}.csv`, toCsv(rows), "text/csv;charset=utf-8");
      return;
    }
    downloadTextFile(`foro-mensajes-${stamp}.xml`, toXml(rows), "application/xml;charset=utf-8");
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setImportStatus(null);
    setImporting(true);
    try {
      const text = await file.text();
      const rows = parseForumImportFile(file.name, text);
      console.log(rows);
      const count = await importMessages(rows);
      if (count === 0) {
        setImportStatus({ type: "empty", key: "foro.import.empty" });
      } else {
        setImportStatus({ type: "ok", key: "foro.import.success", count });
      }
    } catch {
      setImportStatus({ type: "err", key: "foro.import.error" });
    } finally {
      setImporting(false);
    }
  };

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

      <div className="foro-export">
        <label className="foro-export-label" htmlFor="foro-export-format">
          {t("foro.export.formatLabel")}
        </label>
        <select
          id="foro-export-format"
          className="foro-export-select"
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
        >
          <option value="json">{t("foro.export.json")}</option>
          <option value="csv">{t("foro.export.csv")}</option>
          <option value="xml">{t("foro.export.xml")}</option>
        </select>
        <button type="button" className="foro-export-btn" onClick={exportForumData}>
          {t("foro.export.button")}
        </button>
        <label className={`foro-import-btn${importing ? " foro-import-btn--busy" : ""}`}>
          <input
            type="file"
            accept=".json,.csv,.xml,application/json,text/csv,application/xml,text/xml"
            onChange={handleImportFile}
            disabled={importing}
          />
          {importing ? t("foro.import.loading") : t("foro.import.button")}
        </label>
      </div>
      {importStatus && (
        <p className={`foro-import-msg foro-import-msg--${importStatus.type}`}>
          {importStatus.type === "ok"
            ? t(importStatus.key, { count: importStatus.count })
            : t(importStatus.key)}
        </p>
      )}

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