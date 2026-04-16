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
import { db } from "../components/foro/Firebase-setup.js";

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
