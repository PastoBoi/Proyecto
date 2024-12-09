"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "./Componentes/languageContext";
import translations from "./Componentes/traducción";

export default function HomePage() {
  const { language } = useContext(LanguageContext);
  const t = (key) => translations[language]?.[key] || key;
  const router = useRouter();

  // Estados para productos, búsqueda y pop-up
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cargar productos desde la API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Error fetching products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Manejar clic en un producto
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Cerrar el pop-up
  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  // Navegar al login o registro
  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <>
      <main>
        {/* Header con imagen de fondo */}
        <section className="text-center text-white d-flex align-items-center">
          <div className="container bg-imagen">
            <h2 className="display-4 outlined-text">{t("Slogan")}</h2>
            <p className="lead outlined-subtext">{t("SloganFoot")}</p>

            {/* Barra de búsqueda */}
            <form onSubmit={handleSearch}>
              <div className="input-group w-50 p-2">
                <input
                  className="form-control"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("SearchPlaceholder")}
                  aria-label={t("Buscar productos")}
                />
                <button type="submit" className="boton-busc">
                  {t("SearchButton")}
                </button>
              </div>
            </form>

            {/* Botones de login y registro */}
            <div className="mt-4">
              <button
                onClick={handleLoginRedirect}
                className="Log-user py-2 px-4 rounded"
              >
                {t("login")}
              </button>
              <button
                onClick={handleRegisterRedirect}
                className="Create-user py-2 px-4 rounded"
              >
                {t("createUser")}
              </button>
            </div>
          </div>
        </section>

        {/* Productos destacados */}
        <section className="promoted-products py-5">
          <div className="container2">
            <h3 className="Promos">{t("PromotedProducts")}</h3>
            <div className="Albumes d-flex flex-wrap justify-content-around">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="product-item"
                    onClick={() => handleProductClick(product)}
                    style={{ cursor: "pointer" }}
                  >
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
                  {selectedProduct.genre?.join(" / ")}
                </p>

                {/* Tracklist */}
                <div className="tracklist-container">
                  <h3 className="tracklist-header">{t("tracklist")}:</h3>
                  <div className="tracklist-box">
                    {Array.isArray(selectedProduct.tracklist) &&
                    selectedProduct.tracklist.length > 0 ? (
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

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p>&copy; 2024 Sustainable Sound. {t("Todos los derechos reservados")}.</p>
        </div>
      </footer>
    </>
  );
}
