"use client";

import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Componentes/languageContext";
import translations from "../Componentes/traducción";

export default function InterfazPage() {
    const { language } = useContext(LanguageContext); // Obtén el idioma del contexto
    const t = (key) => translations[language]?.[key] || key;

    // Estado para almacenar los productos
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para el producto seleccionado
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product); // Selecciona el producto al hacer clic
    };

    const handleClosePopup = () => {
        setSelectedProduct(null); // Cierra el pop-up
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products'); // Llama al endpoint de la API
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data = await response.json();
                setItems(data); // Actualiza los productos en el estado
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Desactiva el estado de carga
            }
        };

        fetchProducts();
    }, []);

    const sortedItems = [...items].sort((a, b) => new Date(b.ReleaseDate) - new Date(a.ReleaseDate));

    return (
        <>
            <main>
                <section className="promoted-products py-5">
                    <div className="container2">
                        <h3 className="resultados">{t("latest")}</h3>
                        <div className="Albumes d-flex flex-wrap justify-content-around">
                            {loading ? (
                                <p>{t("Cargando...")}</p>
                            ) : error ? (
                                <p className="text-danger">{t("Error")}: {error}</p>
                            ) : sortedItems.length > 0 ? (
                                sortedItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="product-item"
                                        onClick={() => handleProductClick(item)}
                                    >
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
                                    </div>
                                ))
                            ) : (
                                <p>{t("NoResultsFound")}</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-white py-4">
                <div className="container text-center">
                    <p>&copy; 2024 Sustainable Sound. {t("Todos los derechos reservados")}.</p>
                </div>
            </footer>

            {/* Pop-Up para Detalles del Producto */}
            {selectedProduct && (
                <div className="product-popup">
                    <div className="popup-content text-black">
                        <button className="close-button" onClick={handleClosePopup}>
                            &times;
                        </button>
                        <div className="popup-layout">
                            {/* Imagen grande a la izquierda */}
                            <div className="popup-image-container">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="popup-image"
                                />
                            </div>
                            {/* Información del producto a la derecha */}
                            <div className="popup-info">
                                <h1 className="popup-title">{selectedProduct.name}</h1>
                                {/* Mostrar géneros unidos por "/" */}
                                <p className="popup-genres">
                                    {selectedProduct.genre?.join(" / ") || t("No genre available")}
                                </p>

                                {/* Tracklist */}
                                <div className="tracklist-container">
                                    <h3 className="tracklist-header">{t("tracklist")}:</h3>
                                    <div className="tracklist-box">
                                        {Array.isArray(selectedProduct.tracklist) && selectedProduct.tracklist.length > 0 ? (
                                            selectedProduct.tracklist.map((track, index) => (
                                                <p key={index} className="tracklist-item">
                                                    {index + 1}. {track}
                                                </p>
                                            ))
                                        ) : (
                                            <p>{t("No tracklist available")}</p>
                                        )}
                                    </div>
                                </div>

                                <button className="add-to-cart-button">{t("Cart")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
