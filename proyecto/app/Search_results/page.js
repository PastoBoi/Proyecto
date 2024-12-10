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
    const [showDropdown, setShowDropdown] = useState(false); // Controla la visibilidad del dropdown

    useEffect(() => {
        const fetchProducts = async () => {
            const params = new URLSearchParams(window.location.search);
            const query = params.get("query") || "";
            setSearchQuery(query);

            try {
                const response = await fetch("/api/products");
                if (!response.ok) throw new Error("Error fetching products");

                const data = await response.json();
                setItems(data);

                // Filtrar productos inmediatamente basados en el query
                const filtered = filterItems(data, query);
                setFilteredItems(filtered);
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

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Cambia el estado del dropdown
    };

    const applyFilter = (filter) => {
        console.log("Filtro seleccionado:", filter);
        setShowDropdown(false); // Cierra el dropdown después de seleccionar un filtro
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
                        <div className="input-group p-2" style={{ position: "relative" }}>
                            <input
                                type="search"
                                className="form-control"
                                placeholder={t("SearchPlaceholder")}
                                aria-label={t("Buscardiscos")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i
                                className="ri-filter-2-line"
                                onClick={toggleDropdown}
                            ></i>
                            <button
                                type="submit"
                                className="boton-busc"
                            >
                                {t("SearchButton")}
                            </button>

                            {/* Dropdown menu */}
                            {showDropdown && (
                                <div
                                    className="dropdown-menu filter"
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        right: "90px",
                                        backgroundColor: "#202c24",
                                        borderRadius: "10px",
                                        padding: "10px",
                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                        zIndex: 1000,
                                    }}
                                >
                                    <button
                                        className="dropdown-item"
                                        onClick={() => applyFilter("filter1")}
                                    >
                                        {t("Filter1")}
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => applyFilter("filter2")}
                                    >
                                        {t("Filter2")}
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => applyFilter("filter3")}
                                    >
                                        {t("Filter3")}
                                    </button>
                                </div>
                            )}
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
