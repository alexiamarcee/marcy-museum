import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LocaleSwitcher from "../../i18n/LocaleSwitcher";
import logo from "../../assets/photos/logo.png"; // 👈 importa el logo
import "./Header.css";

function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header-container">
      <div className="header-content">
        <NavLink to="/home" className="logo-container" onClick={closeMenu}>
          <img
            src={logo}
            alt="Marcy Museum"
            className="museum-logo"
          />
        </NavLink>

        <button
          className={`hamburger-button ${isMenuOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? "is-open" : ""}`}>
          <NavLink
            to="/home"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            {t("nav.home")}
          </NavLink>
          <NavLink
            to="/exhibitions"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            {t("nav.exhibitions")}
          </NavLink>
          <NavLink
            to="/visit"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            {t("nav.visit")}
          </NavLink>
          <NavLink
            to="/foro"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            {t("nav.foro")}
          </NavLink>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}

export default Header;