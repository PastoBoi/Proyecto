"use client";

import { useContext } from "react";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

export default function Configuracion() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <div className="config-page container">
      <div className="config-header">
        <h1 className="config-title">{t("settings")}</h1>
        <p className="config-subtitle">{t("chooseLanguage")}</p>
      </div>
      <div className="config-options">
        <button
          className={`btn-language ${language === "es" ? "active" : ""}`}
          onClick={toggleLanguage}
        >
          {language === "es" ? "Idioma: Español" : "Language: English"}
        </button>
      </div>
    </div>
  );
}
