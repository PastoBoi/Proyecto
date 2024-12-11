"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";
import { AuthContext } from "../Componentes/authContext";

export default function Header() {
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);
  const t = (key) => translations[language][key] || key;

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú

  const handleHomeRedirect = () => router.push("/");
  const handleCartRedirect = () => router.push(user ? "/carrito" : "/login");
  const handleSettingsRedirect = () => router.push("/configuracion");
  const handleLoginRedirect = () => router.push("/login");

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
        rel="stylesheet"
      ></link>
      <nav className="nav container">
        <div className="nav__data">
          <a href="#" className="nav__logo" onClick={handleHomeRedirect}>
            <i className="ri-disc-line"></i> {t("sustainableSound")}
          </a>
          <div
            className={`nav__toggle ${menuOpen ? "show-icon" : ""}`}
            id="nav-toggle"
            onClick={toggleMenu}
          >
            <i className="ri-menu-line nav__burger"></i>
            <i className="ri-close-line nav__close"></i>
          </div>
        </div>

        <div
          className={`nav__menu ${menuOpen ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            <li>
              <a href="#" className="nav__link">
                {t("newDiscs")}
              </a>
            </li>
            <li>
              <a href="#" className="nav__link">
                {t("promotions")}
              </a>
            </li>
            <li>
              <a href="#" className="nav__link" onClick={handleCartRedirect}>
                <i className="ri-shopping-cart-line me-1"></i> {t("cart")}
              </a>
            </li>
            <li className="dropdown__item">
              <div className="nav__link">
                {t("genres")}{" "}
                <i className="ri-arrow-down-s-line dropdown__arrow"></i>
              </div>
              <ul className="dropdown__menu">
                <li>
                  <a href="#" className="dropdown__link">
                    Pop
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown__link">
                    Jazz
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown__link">
                    Electronic
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown__link">
                    Hip Hop
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown__link">
                    Funk
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown__link">
                    Country
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown__link">
                    Rock
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown__link">
                    Otros
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#"
                className="nav__link"
                onClick={handleSettingsRedirect}
              >
                <i className="ri-settings-line"></i> {t("settings")}
              </a>
            </li>

            <li className="profile-section">
              {!user ? (
                <button
                  className="nav__login-button"
                  onClick={handleLoginRedirect}
                >
                  {t("login")}
                </button>
              ) : (
                <div className="nav__profile" onClick={toggleProfileMenu}>
                  <i className="ri-user-line nav__profile-icon"></i>
                  {profileMenuOpen && (
                    <ul className="profile-dropdown">
                      <li className="profile-dropdown-item">
                        <a href="#" onClick={logout}>
                          {t("logout")}
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
