import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ExhibitionCard from "../../components/exhibition-card/ExhibitionCard";
import exhibitions from "../../data/exhibitions";
import "leaflet/dist/leaflet.css";
import "./Home.css";

const MUSEUM_COORDINATES = {
  lat: 28.1235,
  lng: -15.4363,
};

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-wrapper">
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t("hero.title")}</h1>
          <p className="hero-subtitle">{t("hero.subtitle")}</p>
          <p className="hero-description">{t("hero.description")}</p>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">{t("exhibitions.currentExhibitions")}</h2>
          <p className="section-description">{t("exhibitions.currentDesc")}</p>

          <button
            className="toggle-exhibitions-btn"
            onClick={() => setShowExhibitions(!showExhibitions)}
          >
            {showExhibitions ? t("exhibitions.hide") : t("exhibitions.show")}
          </button>
        </div>
        
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
      </section>

      <section className="map-section">
        <div className="section-header">
          <h2 className="section-title">{t("visit.findUs")}</h2>
          <p className="section-description">{t("visit.findUsDesc")}</p>
        </div>
        
        <div className="map-container">
          <MapContainer
            center={[MUSEUM_COORDINATES.lat, MUSEUM_COORDINATES.lng]}
            zoom={13}
            className="home-map"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[MUSEUM_COORDINATES.lat, MUSEUM_COORDINATES.lng]}>
              <Popup>
                <strong>Marcy Museum</strong>
                <br />
                Avenida de Canarias s/n
                <br />
                Las Palmas de Gran Canaria
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
        <div className="map-info">
          <div className="info-card">
            <h3>{t("visit.address")}</h3>
            <p>Avenida de Canarias s/n</p>
            <p>Las Palmas de Gran Canaria, 35100</p>
          </div>
          <div className="info-card">
            <h3>{t("visit.hours")}</h3>
            <p>{t("visit.hoursDetail")}</p>
            <p>10:00 AM - 7:00 PM</p>
          </div>
          <div className="info-card">
            <h3>{t("visit.contact")}</h3>
            <p>Tel: +34 691 333 444</p>
            <p>info@marcymuseum.com</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;