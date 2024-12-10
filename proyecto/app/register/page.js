"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const t = (key) => translations[language][key] || key;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t("passwordMismatch"));
      return;
    }
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert(t("registerSuccess"));
      router.push(`/login?lang=${language}`); // Redirigir manteniendo el idioma
    } else if (response.status === 409) {
      alert(t("userExists"));
    } else {
      alert(t("registerError"));
    }
  };

  const goToLogin = () => {
    router.push(`/login?lang=${language}`); // Navegar a Login manteniendo el idioma
  };

  return (
    <div className="auth-page">
      <div className="form-box">
        <h2 className="form-title">{t("title")}</h2>
        <form onSubmit={handleRegister}>
          <label className="form-label">
            {t("username")}
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            {t("email")}
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <label className="form-label">
            {t("confirmPassword")}
            <input
              className="form-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className="btn-submit" type="submit">
            {t("registerButton")}
          </button>
        </form>
        <p className="auth-footer">
          {t("alreadyHaveAccount")}{" "}
          <a onClick={goToLogin} className="auth-link">
            {t("loginHere")}
          </a>
        </p>
      </div>
    </div>
  );
}
