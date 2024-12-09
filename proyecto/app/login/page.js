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
      router.push("/");
    } else {
      alert(t("loginError"));
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2 className="form-title">{t("loginPageTitle")}</h2>
        <form onSubmit={handleLogin}>
          <label>
            {t("usernameOrEmail")}
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
          <button type="submit">{t("loginButton")}</button>
        </form>
      </div>
    </div>
  );
}
