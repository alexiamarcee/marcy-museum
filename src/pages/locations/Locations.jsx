import positions from "../../services/positions/positions";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Locations.css";

function ClickHandler() {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      alert(`Latitude: ${lat}\nLongitude: ${lng}`);
      console.log('Clicked coordinates:', lat, lng);
    },
  });
  return null;
}

function Locations() {

  return (
    <MapContainer id="my-little-map" className="locations-map-container"
      center={[28.0033198, -15.4163828]} zoom={13} scrollWheelZoom={false}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler />
      {positions.map((p, index) =>
        <Marker key={index} position={[p.latitude, p.longitude]}>
          <Popup>
            {p.firstLine}. <br /> {p.secondLine}.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default Locations;