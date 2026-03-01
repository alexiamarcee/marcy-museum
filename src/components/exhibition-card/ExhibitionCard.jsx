import { useTranslation } from "react-i18next";
import "./ExhibitionCard.css";

function ExhibitionCard({ titleKey, artist, descriptionKey, image }) {
  const { t } = useTranslation();

  return (
    <article className="exhibition-card">
      <div className="exhibition-image-container">
        <img 
          src={image} 
          alt={t(titleKey)}
          loading="lazy"
        />
      </div>
      <div className="exhibition-card-content">
        <h3 className="exhibition-title">{t(titleKey)}</h3>
        <p className="exhibition-artist">{artist}</p>
        <p className="exhibition-description">{t(descriptionKey)}</p>
      </div>
    </article>
  );
}

export default ExhibitionCard;