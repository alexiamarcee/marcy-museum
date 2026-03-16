import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./RSS.css";

function RSS() {
  const { t } = useTranslation();
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
      <h2>{t("rss.title")}</h2>
      {items.length === 0 && <p>{t("rss.loading")}</p>}
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