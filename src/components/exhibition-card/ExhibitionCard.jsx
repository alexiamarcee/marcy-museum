import "./ExhibitionCard.css";

function ExhibitionCard({ title, artist, description, image }) {
  return (
    <article className="exhibition-card">
      <div className="exhibition-image-container">
        <img 
          src={image} 
          alt={title}
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

export default ExhibitionCard;
