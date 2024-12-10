"use client";

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { LanguageContext } from '../Componentes/languageContext';
import translations from '../Componentes/traducción';

export default function Header() {
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  // Simulación de usuario autenticado
  const isAuthenticated = false; // Cambiar a true si el usuario está autenticado

  // Redirigir a la página principal
  const handleHomeRedirect = () => {
    router.push('/');
  };

  // Redirigir al carrito o login
  const handleCartRedirect = () => {
    if (isAuthenticated) {
      router.push('/carrito');
    } else {
      router.push('/login'); // Redirigir a login si no está autenticado
    }
  };

  // Redirigir a la página de configuración
  const handleSettingsRedirect = () => {
    router.push('/configuracion');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <header className="header">
      <link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet"></link>
      <nav className="nav container">
        <div className="nav__data">
          {/* Logo redirige a la página principal */}
          <a href="#" className="nav__logo" onClick={handleHomeRedirect}>
            <i className="ri-disc-line"></i> {t('sustainableSound')}
          </a>
          <div className="nav__toggle" id="nav-toggle">
            <i className="ri-menu-line nav__burger"></i>
            <i className="ri-close-line nav__close"></i>
          </div>
        </div>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            {/* Nuevo discos */}
            <li>
              <a href="#" className="nav__link">{t('newDiscs')}</a>
            </li>

            {/* Promociones */}
            <li>
              <a href="#" className="nav__link">{t('promotions')}</a>
            </li>

            {/* Redirección al carrito */}
            <li>
              <a href="#" className="nav__link" onClick={handleCartRedirect}>
                <i className="ri-shopping-cart-line me-1"></i>{t('cart')}
              </a>
            </li>

            {/* Géneros desplegable */}
            <li className="dropdown__item">
              <div className="nav__link">
                {t('genres')} <i className="ri-arrow-down-s-line dropdown__arrow"></i>
              </div>
              <ul className="dropdown__menu">
                <li><a href="#" className="dropdown__link">Pop</a></li>
                <li><a href="#" className="dropdown__link">Jazz</a></li>
                <li><a href="#" className="dropdown__link">Electronic</a></li>
                <li><a href="#" className="dropdown__link">Hip Hop</a></li>
                <li><a href="#" className="dropdown__link">Funk</a></li>
                <li><a href="#" className="dropdown__link">Country</a></li>
                <li><a href="#" className="dropdown__link">Rock</a></li>
                <li><a href="#" className="dropdown__link">Otros</a></li>

                <li className="dropdown__subitem">
                  <div className="dropdown__link">
                    <i className="ri-bar-chart-line"></i> Reports <i className="ri-add-line dropdown__add"></i>
                  </div>
                  <ul className="dropdown__submenu">
                    <li><a href="#" className="dropdown__sublink"><i className="ri-file-list-line"></i> Documents</a></li>
                    <li><a href="#" className="dropdown__sublink"><i className="ri-cash-line"></i> Payments</a></li>
                    <li><a href="#" className="dropdown__sublink"><i className="ri-refund-2-line"></i> Refunds</a></li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Configuración del idioma */}
            <li>
              <a href="#" className="nav__link" onClick={handleSettingsRedirect}>
                <i className="ri-settings-line"></i> {t('settings')}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
