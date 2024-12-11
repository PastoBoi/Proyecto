"use client";

import React, { useContext } from 'react'; // Ajusta la ruta según tu estructura de carpetas
import { CartContext } from './CartContext';
import { LanguageContext } from '../Componentes/languageContext'; // Si usas LanguageContext
import translations from '../Componentes/traducción';
import { useRouter } from "next/navigation";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  const t = (key) => translations[language]?.[key] || key;

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Implementa aquí la lógica de checkout, como integrar con una pasarela de pago
    alert(t("checkoutSuccess"));
    clearCart();
    router.push("/"); // Redirige a la página principal o a una página de confirmación
  };

  return (
    <>
      <main>
        {/* Sección del Carrito */}
        <section className="text-center text-white d-flex align-items-center">
          <div className="container bg-imagen">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-900">
              {t("cartTitle")}
            </h2>
            {cart.length === 0 ? (
              <p className="text-xl text-center">{t("cartEmpty")}</p>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th>{t("product")}</th>
                        <th>{t("price")}</th>
                        <th>{t("quantity")}</th>
                        <th>{t("total")}</th>
                        <th>{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.name}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                              {item.name}
                          </td>
                          <td >
                            ${item.price.toFixed(2)}
                          </td>
                          <td>
                            {item.quantity}
                          </td>
                          <td>
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td>
                            <button
                              onClick={() => removeFromCart(item.name)}
                            >
                              {t("remove")}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total y Acciones */}
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={clearCart}
                  >
                    {t("clearCart")}
                  </button>
                  <span>
                    {t("total")}: ${totalPrice.toFixed(2)}
                  </span>
                  <button
                    onClick={handleCheckout}
                  >
                    {t("checkout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default CartPage;