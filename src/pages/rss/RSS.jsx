import { useTranslation } from "react-i18next";
import "./RSS.css";

function RSS() {
  const { t } = useTranslation();

  const feeds = [
    {
      name: t("rss.feed1.name"),
      description: t("rss.feed1.description"),
      url: "https://www.artnews.com"
    },
    {
      name: t("rss.feed2.name"),
      description: t("rss.feed2.description"),
      url: "https://newartfoundation.com"
    },
  ];

  return (
    <div className="rss-page">
      <section className="rss-header">
        <h1>{t("rss.title")}</h1>
        <p>{t("rss.subtitle")}</p>
      </section>

      <section className="rss-content">
        {feeds.map((feed, index) => (
          <div key={index} className="rss-card">
            <div className="rss-icon"></div>
            <div className="rss-info">
              <h3>{feed.name}</h3>
              <p>{feed.description}</p>
              <a
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rss-link"
              >
                {t("rss.link")}
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default RSS;