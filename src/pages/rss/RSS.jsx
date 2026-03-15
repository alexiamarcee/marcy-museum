import { useState, useEffect } from "react";
import "./RSS.css";

function RSS() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/rss.xml")
      .then((res) => res.text())
      .then((str) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const rssItems = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title: item.querySelector("title")?.textContent,
          link: item.getElementsByTagName("link")[0]?.textContent,
          description: item.querySelector("description")?.textContent,
        }));
        setItems(rssItems);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="rss-container">
      <h2>Noticias RSS</h2>
      {items.length === 0 && <p>Cargando...</p>}
      {items.map((item, i) => (
        <div key={i} className="rss-item">
          <a href={item.link} target="_blank" rel="noreferrer">{item.title}</a>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default RSS;