import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Visit.css";

const MUSEUM_LOCATION = {
  lat: 28.1235,
  lng: -15.4363,
};

function Visit() {
  const { t } = useTranslation();
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setTimeout(() => {
      setSubmitMessage(t("visitPage.form.successMessage"));
      setIsSubmitting(false);
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    }, 1500);
  };

  return (
    <div className="visit-page">

      <section className="visit-header">
        <div className="header-content">
          <h1 className="page-title">{t("visitPage.title")}</h1>
          <p className="page-description">{t("visitPage.description")}</p>
        </div>
      </section>

      <section className="visit-info-section">
        <div className="visit-container">
          <h2 className="section-title">{t("visitPage.infoTitle")}</h2>
          <div className="info-grid">

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>{t("visit.address")}</h3>
              <p>Avenida de Canarias s/n</p>
              <p>Las Palmas de Gran Canaria</p>
              <p>35100, Spain</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🕐</div>
              <h3>{t("visitPage.openingHours.title")}</h3>
              <p><strong>{t("visitPage.openingHours.tueFri")}</strong> 10:00 AM - 7:00 PM</p>
              <p><strong>{t("visitPage.openingHours.satSun")}</strong> 10:00 AM - 8:00 PM</p>
              <p><strong>{t("visitPage.openingHours.monday")}</strong> {t("visitPage.openingHours.closed")}</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>{t("visit.contact")}</h3>
              <p><strong>{t("visitPage.contact.phone")}</strong> +34 691 333 444</p>
              <p><strong>{t("visitPage.contact.email")}</strong> info@marcymuseum.com</p>
              <p><strong>{t("visitPage.contact.fax")}</strong> +34 691 333 445</p>
            </div>

            <div className="info-card">
              <div className="info-icon">💳</div>
              <h3>{t("visitPage.admission.title")}</h3>
              <p><strong>{t("visitPage.admission.adults")}</strong> €12</p>
              <p><strong>{t("visitPage.admission.students")}</strong> €8</p>
              <p><strong>{t("visitPage.admission.children")}</strong> {t("visitPage.admission.free")}</p>
            </div>

            <div className="info-card">
              <div className="info-icon">♿</div>
              <h3>{t("visitPage.accessibility.title")}</h3>
              <p>{t("visitPage.accessibility.wheelchair")}</p>
              <p>{t("visitPage.accessibility.elevator")}</p>
              <p>{t("visitPage.accessibility.restrooms")}</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🚗</div>
              <h3>{t("visitPage.parking.title")}</h3>
              <p>{t("visitPage.parking.free")}</p>
              <p>{t("visitPage.parking.spaces")}</p>
              <p>{t("visitPage.parking.ev")}</p>
            </div>

          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="visit-container">
          <h2 className="section-title">{t("visitPage.mapTitle")}</h2>
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

      <section className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">{t("visitPage.form.title")}</h2>
          <p className="section-subtitle">{t("visitPage.form.subtitle")}</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">{t("visitPage.form.fullName")} *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder={t("visitPage.form.fullNamePlaceholder")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t("visitPage.form.email")} *</label>
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
              <label htmlFor="phone">{t("visitPage.form.phone")}</label>
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
              <label htmlFor="message">{t("visitPage.form.message")} *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder={t("visitPage.form.messagePlaceholder")}
              ></textarea>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? t("visitPage.form.sending") : t("visitPage.form.send")}
            </button>

            {submitMessage && (
              <div className="submit-message success">{submitMessage}</div>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}

export default Visit;