import PropTypes from "prop-types";
import "./ExhibitionCard.css";

function ExhibitionCard({ title, artist, description, image, imageAlt }) {
  return (
    <article className="exhibition-card">
      <div className="exhibition-image-container">
        <img 
          src={image} 
          alt={imageAlt || `${title} by ${artist}`}
          loading="lazy"
        />
      </div>
      <div className="exhibition-card-content">
        <h3 className="exhibition-title">{title}</h3>
        <p className="exhibition-artist">{artist}</p>
        <p className="exhibition-description">{description}</p>
      </div>
    </article>
  );
}

ExhibitionCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
};

export default ExhibitionCard;