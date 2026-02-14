import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-sections">
          
          <div className="footer-column footer-about">
            <h3>Marcy National Museum</h3>
            <p>
              A contemporary art museum dedicated to creative expression and cultural innovation, 
              showcasing diverse artistic voices from around the world.
            </p>
          </div>

          <div className="footer-column">
            <h4>Navigation</h4>
            <Link to="/home">Home</Link>
            <Link to="/exhibitions">Exhibitions</Link>
            <Link to="/visit">Visit</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
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
            <h4>Follow Us</h4>
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
              © {currentYear} Marcy National Museum. All rights reserved.
            </p>
            <p className="address">
              Avenida de Canarias s/n, Las Palmas de Gran Canaria, 35100 | 
              Tel: +34 691 333 444
            </p>
          </div>
          
          <nav className="footer-legal-links" aria-label="Legal information">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/cookies">Cookies Policy</Link>
            <span className="separator">|</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="separator">|</span>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;