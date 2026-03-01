import { useTranslation } from "react-i18next";
import ExhibitionCard from "../../components/exhibition-card/ExhibitionCard";
import exhibitions from "../../data/exhibitions";
import "./Exhibitions.css";

function Exhibitions() {
  const { t } = useTranslation();

  return (
    <div className="exhibitions-page">
      
      <section className="exhibitions-header">
        <div className="header-content">
          <h1 className="page-title">{t("exhibitions.title")}</h1>
          <p className="page-description">
            {t("exhibitions.description")}
          </p>
        </div>
      </section>

      <section className="exhibitions-content">
        <div className="exhibitions-container">
          <div className="exhibitions-grid">
            {exhibitions.map((exhibition) => (
              <ExhibitionCard
                key={exhibition.id}
                titleKey={exhibition.titleKey}
                artist={exhibition.artist}
                descriptionKey={exhibition.descriptionKey}
                image={exhibition.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="exhibitions-cta">
        <div className="cta-content">
          <h2>{t("exhibitions.planVisit")}</h2>
          <p>{t("exhibitions.planVisitDesc")}</p>
          <a href="/visit" className="cta-button">
            {t("exhibitions.visitInfo")}
          </a>
        </div>
      </section>

    </div>
  );
}

export default Exhibitions;