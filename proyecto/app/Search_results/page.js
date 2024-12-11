"use client";

import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

export default function SearchResults() {
    const { language } = useContext(LanguageContext); // Obtén el idioma del contexto
    const t = (key) => translations[language]?.[key] || key;

    const [showGenresDropdown, setShowGenresDropdown] = useState(false);
    const [activeFilters, setActiveFilters] = useState([]);
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
        const filteredWithActiveFilters = applyActiveFilters(filtered, activeFilters);
        setFilteredItems(filteredWithActiveFilters);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Cambia el estado del dropdown
    };

    const applyFilter = (filter) => {
        setActiveFilters(prevFilters => {
            if (!prevFilters.includes(filter)) {
                const updatedFilters = [...prevFilters, filter];
                const filteredItems = applyActiveFilters(items, updatedFilters);
                setFilteredItems(filteredItems);
                return updatedFilters;
            }
            return prevFilters; // If the filter is already active, do nothing
        });
    };

    const toggleGenresDropdown = () => {
        setShowGenresDropdown(!showGenresDropdown);
    };

    const removeFilter = (filterToRemove) => {
        setActiveFilters(prevFilters => {
            const updatedFilters = prevFilters.filter(filter => filter !== filterToRemove);
            // Re-filter items based on the updated filters
            const filteredItems = applyActiveFilters(items, updatedFilters);
            setFilteredItems(filteredItems);
            return updatedFilters;
        });
    };
    
    const applyActiveFilters = (items, filters) => {
        let filtered = items;
    
        if (filters.includes("Pop albums")) {
            filtered = filtered.filter(item => 
                item.genre?.some(g => g.toLowerCase() === "pop")
            );
        }
        if (filters.includes("Rock albums")) {
            filtered = filtered.filter(item => 
                item.genre?.some(g => g.toLowerCase() === "rock")
            );
        }
        if (filters.includes("Elec. albums")) {
            filtered = filtered.filter(item => 
                item.genre?.some(g => g.toLowerCase() === "electronica")
            );
        }
        if (filters.includes("New W. albums")) {
            filtered = filtered.filter(item => 
                item.genre?.some(g => g.toLowerCase() === "new wave")
            );
        }
        if (filters.includes("J-Pop albums")) {
            filtered = filtered.filter(item => 
                item.genre?.some(g => g.toLowerCase() === "j-pop")
            );
        }
        if (filters.includes("Only author")) { // Check if "filter2" is active
            filtered = filtered.filter(item =>
                item.author?.toLowerCase().includes(searchQuery.toLowerCase()) // Only search by artist name
            );
        }
        if (filters.includes("Only album")) { // Check if "Only album" filter is active
            filtered = filtered.filter(item =>
                item.album?.toLowerCase().includes(searchQuery.toLowerCase()) // Only search by album name
            );
        }
    
        // Add more filter conditions here as needed
    
        return filtered;
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
                                <div className="dropdown_menu filter">
                                    <div className="active-filters">
                                        {activeFilters.map((filter, index) => (
                                            <span key={index} className="active-filter">
                                                {filter}
                                                <button onClick={() => removeFilter(filter)}>x</button>
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => applyFilter("Only author")}
                                    >
                                        {t("Author")}
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => applyFilter("Only album")}
                                    >
                                        {t("Album")}
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        onClick={toggleGenresDropdown}
                                    >
                                        {t("generos")}
                                    </button>
                                        {showGenresDropdown && (
                                        <div
                                            className="dropdown-menu genres-dropdown"
                                        >
                                            <button className="dropdown-item" onClick={() => applyFilter("New W. albums")}>
                                                {t("New wave")}
                                            </button>
                                            <button className="dropdown-item" onClick={() => applyFilter("Elec. albums")}>
                                                {t("Electronica")}
                                            </button>
                                            <button className="dropdown-item" onClick={() => applyFilter("Rock albums")}>
                                                {t("Rock")}
                                            </button>
                                            <button className="dropdown-item" onClick={() => applyFilter("Pop albums")}>
                                                {t("Pop")}
                                            </button>
                                            <button className="dropdown-item" onClick={() => applyFilter("J-Pop albums")}>
                                                {t("J-Pop")}
                                            </button>
                                            {/* Add more genre options as needed */}
                                        </div>
                                    )}
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
                                                alt={item.album}
                                                className="product-image rounded"
                                            />
                                            <div className="Name-price d-flex flex-row justify-content-between">
                                                <div className="d-flex flex-column">
                                                    <div className="product-name mt-2">{item.album} - {item.author}</div>
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
