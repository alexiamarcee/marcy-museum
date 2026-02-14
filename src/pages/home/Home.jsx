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
  return (
    <div className="home-wrapper">
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Marcy Museum</h1>
          <p className="hero-subtitle">
            Where contemporary art meets innovation and creativity knows no bounds.
          </p>
          <p className="hero-description">
            Discover our curated collection of exhibitions featuring artists from around the world.
          </p>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Current Exhibitions</h2>
          <p className="section-description">
            Explore our carefully selected exhibitions showcasing diverse artistic voices and perspectives.
          </p>
        </div>
        
        <div className="exhibitions-grid">
          {exhibitions.map((exhibition) => (
            <ExhibitionCard
              key={exhibition.id}
              title={exhibition.title}
              artist={exhibition.artist}
              description={exhibition.description}
              image={exhibition.image}
            />
          ))}
        </div>
      </section>

      <section className="map-section">
        <div className="section-header">
          <h2 className="section-title">Find Us</h2>
          <p className="section-description">
            Visit us at our location in Las Palmas de Gran Canaria
          </p>
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
            <h3>Address</h3>
            <p>Avenida de Canarias s/n</p>
            <p>Las Palmas de Gran Canaria, 35100</p>
          </div>
          <div className="info-card">
            <h3>Hours</h3>
            <p>Tuesday - Sunday</p>
            <p>10:00 AM - 7:00 PM</p>
          </div>
          <div className="info-card">
            <h3>Contact</h3>
            <p>Tel: +34 691 333 444</p>
            <p>info@marcymuseum.com</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
