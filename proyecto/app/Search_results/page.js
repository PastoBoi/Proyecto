"use client";

import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

// Sample JSON data (you will likely get this from an API)
const jsonData = [
    {
        "name": "Hisohiso Banashi",
        "author": "Zutomayo",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://cdns-images.dzcdn.net/images/cover/29ecd861ce6f102c6545e13a1248edb7/0x1900-000000-80-0-0.jpg",
        "Genero": ["J-rock", "Alternative Rock"]
    },
    {
        "name": "Otogi",
        "author": "Eve",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://cdns-images.dzcdn.net/images/cover/e62edb9b94f7bcf0d7770c73d97562f6/0x1900-000000-80-0-0.jpg"
    },
    {
        "name": "Kyouugen",
        "author": "Ado",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/d00ed424dd8927d561034e6d89cb05b5/500x500-000000-80-0-0.jpg"
    },
    {
        "name": "Miracle Milk",
        "author": "Mili",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/1285d6765ae590bd717b886bb8b8dbd8/500x500-000000-80-0-0.jpg"
    },
    {
        "name": "Pure",
        "author": "Co Shiu Ne",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/43f9366c184d81b0fa1eaf86e39587b8/500x500-000000-80-0-0.jpg"
    },
    {
        "name": "Rokotsu",
        "author": "Syudou",
        "price": "$10.00",
        "link": "https://example.com/product1",
        "image": "https://e-cdns-images.dzcdn.net/images/cover/a114e2133cc6dcbd1d19857b61e4a099/500x500-000000-80-0-0.jpg"
    }
];

export default function InterfazPage() {
    const { language } = useContext(LanguageContext); // Obtén el idioma del contexto
    const t = (key) => translations[language]?.[key] || key;

    // State to hold the items
    const [items, setItems] = useState(jsonData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState(jsonData); // State for filtered items

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form from submitting and refreshing the page

        // Filter items based on search term
        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered); // Update filtered items
    };

    return (
        <>
            <main>
                <section>
                    <form onSubmit={handleSearch}>
                        <div className="input-group p-2">
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                            />
                            <button
                                type="submit"
                                className="boton-busc"
                            >
                                {t("SearchButton")}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="promoted-products py-5">
                    <div className="container2">
                        <h3 className="resultados">{t("Results")}</h3>
                        <div className="Albumes d-flex flex-wrap justify-content-around">
                            {/* Dynamically render filtered items */}
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <div key={index} className="product-item">
                                        <a href={item.link}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="product-image rounded"
                                            />
                                            <div className="Name-price d-flex flex-row justify-content-between">
                                                <div className="d-flex flex-column">
                                                    <div className="product-name mt-2">{item.name} - {item.author}</div>
                                                    <div className="product-price">{item.price}</div>
                                                </div>
                                                <div className="add-button">
                                                    <i className="ri-add-box-line"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>{t("NoResultsFound")}</p> // Optional message for no results
                            )}
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
