import { useTranslation } from "react-i18next";
import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-sections">
          
          <div className="footer-column footer-about">
            <h3>Marcy National Museum</h3>
            <p>{t("footer.description")}</p>
          </div>

          <div className="footer-column">
            <h4>{t("footer.navigation")}</h4>
            <Link to="/home">{t("nav.home")}</Link>
            <Link to="/exhibitions">{t("nav.exhibitions")}</Link>
            <Link to="/visit">{t("nav.visit")}</Link>
            <Link to="/contact">{t("nav.contact")}</Link>
          </div>

          <div className="footer-column">
            <h4>{t("footer.resources")}</h4>
            <a 
              href="https://github.com/alexiamarcee/marcy-museum" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub Project
            </a>
            <a 
              href="https://www.figma.com/community/file/1497437463361122374/sweet-flower-shop" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Figma Design
            </a>
          </div>

          <div className="footer-column">
            <h4>{t("footer.followUs")}</h4>
            <div className="social-icons">
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://github.com/alexiamarcee" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p className="copyright">
              © {currentYear} Marcy National Museum. {t("footer.rights")}
            </p>
            <p className="address">
              Avenida de Canarias s/n, Las Palmas de Gran Canaria, 35100 | 
              Tel: +34 691 333 444
            </p>
          </div>
          
          <nav className="footer-legal-links" aria-label="Legal information">
            <Link to="/privacy">{t("footer.privacy")}</Link>
            <span className="separator">|</span>
            <Link to="/cookies">{t("footer.cookies")}</Link>
            <span className="separator">|</span>
            <Link to="/terms">{t("footer.terms")}</Link>
            <span className="separator">|</span>
            <Link to="/contact">{t("nav.contact")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;