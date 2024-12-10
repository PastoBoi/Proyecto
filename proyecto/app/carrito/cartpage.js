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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("product")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("price")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("quantity")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("total")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <span className="font-medium text-gray-900">
                              {item.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-900"
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
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4 md:mb-0"
                  >
                    {t("clearCart")}
                  </button>
                  <div className="text-xl font-semibold mb-4 md:mb-0">
                    {t("total")}: ${totalPrice.toFixed(2)}
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                  >
                    {t("checkout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Sustainable Sound. {t("Todos_los_derechos_reservados")}.</p>
        </div>
      </footer>
    </>
  );
}

export default CartPage;