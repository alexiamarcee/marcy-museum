import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Visit.css";

// Museum coordinates
const MUSEUM_LOCATION = {
  lat: 28.1235,
  lng: -15.4363,
};

function Visit() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage("Thank you! Your message has been sent successfully.");
      setIsSubmitting(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="visit-page">
      
      {/* Page Header */}
      <section className="visit-header">
        <div className="header-content">
          <h1 className="page-title">Visit Us</h1>
          <p className="page-description">
            Plan your visit to Marcy Museum and discover our world-class exhibitions
          </p>
        </div>
      </section>

      {/* Museum Information */}
      <section className="visit-info-section">
        <div className="visit-container">
          <h2 className="section-title">Museum Information</h2>
          
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Address</h3>
              <p>Avenida de Canarias s/n</p>
              <p>Las Palmas de Gran Canaria</p>
              <p>35100, Spain</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🕐</div>
              <h3>Opening Hours</h3>
              <p><strong>Tuesday - Friday:</strong> 10:00 AM - 7:00 PM</p>
              <p><strong>Saturday - Sunday:</strong> 10:00 AM - 8:00 PM</p>
              <p><strong>Monday:</strong> Closed</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Contact</h3>
              <p><strong>Phone:</strong> +34 691 333 444</p>
              <p><strong>Email:</strong> info@marcymuseum.com</p>
              <p><strong>Fax:</strong> +34 691 333 445</p>
            </div>

            <div className="info-card">
              <div className="info-icon">💳</div>
              <h3>Admission</h3>
              <p><strong>Adults:</strong> €12</p>
              <p><strong>Students & Seniors:</strong> €8</p>
              <p><strong>Children (under 12):</strong> Free</p>
            </div>

            <div className="info-card">
              <div className="info-icon">♿</div>
              <h3>Accessibility</h3>
              <p>Wheelchair accessible</p>
              <p>Elevator available</p>
              <p>Accessible restrooms</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🚗</div>
              <h3>Parking</h3>
              <p>Free parking available</p>
              <p>200 spaces</p>
              <p>EV charging stations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="visit-container">
          <h2 className="section-title">Find Us on the Map</h2>
          <div className="map-wrapper">
            <MapContainer
              center={[MUSEUM_LOCATION.lat, MUSEUM_LOCATION.lng]}
              zoom={15}
              className="visit-map"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[MUSEUM_LOCATION.lat, MUSEUM_LOCATION.lng]}>
                <Popup>
                  <div className="map-popup">
                    <strong>Marcy National Museum</strong>
                    <p>Avenida de Canarias s/n</p>
                    <p>Las Palmas de Gran Canaria, 35100</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have questions or need more information? Send us a message!
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+34 600 000 000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitMessage && (
              <div className="submit-message success">
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}

export default Visit;
