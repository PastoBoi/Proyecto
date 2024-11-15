"use client";

import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

// Sample JSON data (you will likely get this from an API)
const jsonData = [
    {
        "name": "Hisohiso Banashi  -  Zutomayo",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://cdns-images.dzcdn.net/images/cover/29ecd861ce6f102c6545e13a1248edb7/0x1900-000000-80-0-0.jpg"
    },
    {
        "name": "Otogi  -  Eve",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://cdns-images.dzcdn.net/images/cover/e62edb9b94f7bcf0d7770c73d97562f6/0x1900-000000-80-0-0.jpg"
    },
    {
        "name": "Kyouugen  -  Ado",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/d00ed424dd8927d561034e6d89cb05b5/500x500-000000-80-0-0.jpg"
    },
    {
        "name": "Miracle Milk  -  Mili",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/1285d6765ae590bd717b886bb8b8dbd8/500x500-000000-80-0-0.jpg"
    },
    {
        "name": "Pure  -  Co Shiu Ne",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/43f9366c184d81b0fa1eaf86e39587b8/500x500-000000-80-0-0.jpg"
    },
    {
        "name": "Rokotsu  -  Syudou",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/a114e2133cc6dcbd1d19857b61e4a099/500x500-000000-80-0-0.jpg"
    }
];

export default function InterfazPage() {
    const { language } = useContext(LanguageContext); // Obtén el idioma del contexto
    const t = (key) => translations[language]?.[key] || key;

    // State to hold the items
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Assuming jsonData is available, you can fetch it here if needed
        setItems(jsonData);
    }, []);

    return (
        <>
            <main>
                <section className="text-center text-white d-flex align-items-center">
                    <div className="container bg-imagen">
                        <div className="solo-escritorio">
                            <h2 className="display-4 outlined-text">
                                {t("Slogan")}
                            </h2>
                            <p className="lead outlined-subtext">
                                {t("SloganFoot")}
                            </p>
                        </div>
                        <form className="d-flex justify-content-center mt-4">
                            <div className="input-group w-50 p-2">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder={t("SearchPlaceholder")}
                                    aria-label={t("Buscar discos")}
                                    style={{
                                        backgroundColor: "#202c24",
                                        border: "none",
                                        borderRadius: "10px",
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="boton-busc"
                                >
                                    {t("SearchButton")}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                <section className="promoted-products py-5">
                    <div className="container2">
                        <h3 className="Promos">{t("PromotedDisks")}</h3>
                        <div className="Albumes d-flex flex-wrap justify-content-around">
                            {/* Dynamically render items */}
                            {items.map((item, index) => (
                                <div key={index} className="product-item">
                                    <a href={item.link}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="product-image rounded"
                                        />
                                        <div className="Name-price d-flex flex-row justify-content-between">
                                            <div className="d-flex flex-column">
                                                <div className="product-name mt-2">{item.name}</div>
                                                <div className="product-price">{item.price}</div>
                                            </div>
                                            <div className="add-button">
                                                <i className="ri-add-box-line"></i>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-dark text-white py-4">
                <div className="container text-center">
                    <p>&copy; 2024 Sustainable Sound. {t("Todos los derechos reservados")}.</p>
                </div>
            </footer>
        </>
    );
}
