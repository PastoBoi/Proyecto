"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const t = (key) => translations[language][key] || key;

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (response.ok) {
      alert(t("loginSuccess"));
      router.push(`/?lang=${language}`); // Redirigir manteniendo el idioma
    } else {
      alert(t("loginError"));
    }
  };

  const goToRegister = () => {
    router.push(`/register?lang=${language}`); // Navegar a Registro manteniendo el idioma
  };

  return (
    <div className="auth-page">
      <div className="form-box">
        <h2 className="form-title">{t("loginPageTitle")}</h2>
        <form onSubmit={handleLogin}>
          <label className="form-label">
            {t("usernameOrEmail")}
            <input
              className="form-input"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            {t("password")}
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="btn-submit" type="submit">
            {t("loginButton")}
          </button>
        </form>
        <p className="auth-footer">
          {t("noAccount")}{" "}
          <a onClick={goToRegister} className="auth-link">
            {t("registerHere")}
          </a>
        </p>
      </div>
    </div>
  );
}
