"use client";

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { LanguageContext } from '../Componentes/languageContext';
import translations from '../Componentes/traducción';

export default function Header() {
  const router = useRouter();
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleHomeRedirect = () => {
    router.push('/Interfaz_inicio');
  };

  const handleCartRedirect = () => {
    router.push('/carrito');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <header className="header">
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet"></link>
            <nav className="nav container">
                <div className="nav__data">
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
                    <li><a href="#" className="nav__link">{t('newDiscs')}</a></li>

                    <li><a href="#" className="nav__link" onClick={toggleLanguage}>{language === 'es' ? 'Idioma: Español' : 'Language: English'}</a></li>

                    
                    <li className="dropdown__item">
                        <div className="nav__link">
                            {t('genres')} <i className="ri-arrow-down-s-line dropdown__arrow"></i>
                        </div>

                        <ul className="dropdown__menu">
                            <li>
                            <a href="#" className="dropdown__link">
                                <i></i> Pop
                            </a>                          
                            </li>

                            <li>
                            <a href="#" className="dropdown__link">
                                <i></i> Jazz
                            </a>
                            </li>

                            <li>
                            <a href="#" className="dropdown__link">
                                <i></i> Electronic
                            </a>
                            </li>

                            <li>
                            <a href="#" className="dropdown__link">
                                <i></i> Hip Hop
                            </a>
                            </li>

                            <li>
                            <a href="#" className="dropdown__link">
                                <i></i> Funk
                            </a>
                            </li>

                            <li>
                            <a href="#" className="dropdown__link">
                                <i></i> Country
                            </a>
                            </li>

                            <li>
                            <a href="#" className="dropdown__link">
                                <i className="line"></i> Rock
                            </a>
                            </li>

                            <li>
                            <a href="#" className="dropdown__link">
                                <i className="line"></i> Otros
                            </a>
                            </li>

                            
                            <li className="dropdown__subitem">
                            <div className="dropdown__link">
                                <i className="ri-bar-chart-line"></i> Reports <i className="ri-add-line dropdown__add"></i>
                            </div>

                            <ul className="dropdown__submenu">
                                <li>
                                    <a href="#" className="dropdown__sublink">
                                        <i className="ri-file-list-line"></i> Documents
                                    </a>
                                </li>
        
                                <li>
                                    <a href="#" className="dropdown__sublink">
                                        <i className="ri-cash-line"></i> Payments
                                    </a>
                                </li>
        
                                <li>
                                    <a href="#" className="dropdown__sublink">
                                        <i className="ri-refund-2-line"></i> Refunds
                                    </a>
                                </li>
                            </ul>
                            </li>
                        </ul>
                    </li>
                    
                    <li><a href="#" className="nav__link">{t('promotions')}</a></li>

                    <li><a href="#" className="nav__link"><i className="ri-shopping-cart-line me-1" onClick={handleCartRedirect}></i>{t('cart')}</a></li>
                </ul>
                </div>
            </nav>
        </header>
  );
}