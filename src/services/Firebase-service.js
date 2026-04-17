import {
  limitToLast,
  onValue,
  push,
  query,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { db } from "./Firebase-setup.js";

const MESSAGES_PATH = "messages/";

export function subscribeToMessages(callback, options = {}) {
  const { limit } = options;
  const baseRef = ref(db, MESSAGES_PATH);
  const messagesRef =
    typeof limit === "number" ? query(baseRef, limitToLast(limit)) : baseRef;
  return onValue(messagesRef, callback);
}

export function addMessage(payload) {
  const messagesRef = ref(db, MESSAGES_PATH);
  const newMessageRef = push(messagesRef);
  return set(newMessageRef, payload);
}

export function deleteMessage(id) {
  return remove(ref(db, `${MESSAGES_PATH}${id}`));
}

export function updateMessageFields(id, fields) {
  return update(ref(db, `${MESSAGES_PATH}${id}`), fields);
}

export async function importMessages(rows) {
  let count = 0;
  for (const row of rows) {
    const sentBy = String(row.sentBy ?? "").trim();
    const message = String(row.message ?? "").trim();
    const category = String(row.category ?? "general").trim() || "general";
    if (!sentBy || !message) continue;
    await addMessage({ sentBy, message, category });
    count += 1;
  }
  return count;
}
