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
      router.push("/login");
    } else if (response.status === 409) {
      alert(t("userExists"));
    } else {
      alert(t("registerError"));
    }
  };

  return (
    <div className="register-container">
      <div className="form-box">
        <h2 className="form-title">{t("registerPageTitle")}</h2>
        <form onSubmit={handleRegister}>
          <label>
            {t("username")}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            {t("email")}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            {t("password")}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            {t("confirmPassword")}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">{t("registerButton")}</button>
        </form>
      </div>
    </div>
  );
}
