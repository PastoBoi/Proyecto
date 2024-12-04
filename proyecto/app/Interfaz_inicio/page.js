"use client";

import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

export default function InterfazPage() {
    const { language } = useContext(LanguageContext); // Obtener idioma desde el contexto
    const t = (key) => translations[language]?.[key] || key;

    // Estados para los productos y búsqueda
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Cargar productos desde la API
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) throw new Error("Error fetching products");
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data); // Mostrar todos los productos al inicio
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    // Manejar la búsqueda
    const handleSearch = (e) => {
        e.preventDefault(); // Prevenir el refresco de la página
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered); // Actualizar los productos filtrados
    };

    return (
        <>
            <main>
                <section className="text-center text-white d-flex align-items-center">
                    <div className="container bg-imagen">
                        <div className="solo-escritorio">
                            <h2 className="display-4 outlined-text">{t("Slogan")}</h2>
                            <p className="lead outlined-subtext">{t("SloganFoot")}</p>
                        </div>
                        <form onSubmit={handleSearch} className="d-flex justify-content-center mt-4">
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
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
                                />
                                <button type="submit" className="boton-busc">
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
                            {/* Renderizar productos filtrados */}
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <div key={index} className="product-item">
                                        <a href={product.link}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="product-image rounded"
                                            />
                                            <div className="Name-price d-flex flex-row justify-content-between">
                                                <div className="d-flex flex-column">
                                                    <div className="product-name mt-2">{product.name}</div>
                                                    <div className="product-price">{product.price}</div>
                                                </div>
                                                <div className="add-button">
                                                    <i className="ri-add-box-line"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>{t("NoResultsFound")}</p> // Mensaje opcional para sin resultados
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
