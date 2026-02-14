import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <NavLink to="/home" className="logo-container" onClick={closeMenu}>
          <div className="logo-placeholder">
            <span className="logo-text">Marcy Museum</span>
          </div>
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
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/exhibitions"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            Exhibitions
          </NavLink>
          <NavLink
            to="/visit"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            Visit
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
