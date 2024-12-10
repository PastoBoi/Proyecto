"use client";

import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

export default function SearchResults() {
    const { language } = useContext(LanguageContext); // Obtén el idioma del contexto
    const t = (key) => translations[language]?.[key] || key;

    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) throw new Error("Error fetching products");
    
                const data = await response.json();
                setItems(data);
                setFilteredItems(data); // Establece los resultados iniciales como los elementos cargados
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);

    const filterItems = (items, term) => {
        if (!term) return items;
        return items.filter(item =>
            (item.name?.toLowerCase()?.includes(term.toLowerCase())) ||
            (item.author?.toLowerCase()?.includes(term.toLowerCase())) ||
            (item.genre?.join(" ")?.toLowerCase()?.includes(term.toLowerCase())) ||
            (item.tracklist?.some(track => track.toLowerCase().includes(term.toLowerCase())))
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = filterItems(items, searchQuery);
        setFilteredItems(filtered);
    };

    if (loading) {
        return <p>{t("Loading")}...</p>;
    }

    if (error) {
        return <p>{t("Error")}: {error}</p>;
    }

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
                                aria-label={t("Buscardiscos")}
                                style={{
                                    backgroundColor: "#202c24",
                                    border: "none",
                                    borderRadius: "10px",
                                }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                                <p>{t("NoResultsFound")}</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-dark text-white py-4">
                <div className="container text-center">
                    <p>&copy; 2024 Sustainable Sound. {t("Todos_los_derechos_reservados")}.</p>
                </div>
            </footer>
        </>
    );
}
