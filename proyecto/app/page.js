"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "./Componentes/languageContext";
import translations from "./Componentes/traducción";
import { CartContext } from "./carrito/CartContext";
import { AuthContext } from "./Componentes/authContext";
import ChatGPT from "./Componentes/ChatGPT";

export default function HomePage() {
  const { language } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext); // Obtener el usuario y la función logout
  const t = (key) => translations[language]?.[key] || key;
  const router = useRouter();

  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} ha sido añadido al carrito.`);
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
            <form action="/Search_results" method="get">
              <div className="input-group w-50 p-2">
                <input 
                  className="form-control"
                  type="text" 
                  name="query" 
                  placeholder={t("SearchPlaceholder")}
                  aria-label={t("Buscar discos")}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
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
                        <div className="product-name mt-2">{product.name} - {product.author}</div>
                        <div className="product-price">{product.price}</div>
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
        {/* Integración del Bot de ChatGPT */}
        <section className="chatbot-section py-5">
          <div className="container2">
            <h3 className="Promos">ChatBot GPT-4</h3>
            <ChatGPT />
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div className="product-popup">
          <div className="popup-content text-black">
            <button className="close-button" onClick={handleClosePopup}>&times;</button>
            <div className="popup-layout">
              <div className="popup-image-container">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="popup-image"/>
              </div>
              <div className="popup-info">
                <h1 className="popup-title">{selectedProduct.name} - {selectedProduct.author}</h1>
                <p className="popup-genres">
                  {selectedProduct.genre?.join(" / ")}
                </p>
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
                <button className="add-to-cart-button" onClick={() => handleAddToCart(selectedProduct)}>
                  {t("AddToCart")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
