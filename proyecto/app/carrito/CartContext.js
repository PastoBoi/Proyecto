// proyecto/app/carrito/CartContext.js

"use client";
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde Local Storage al montar el componente
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage:", error);
    }
  }, []);

  // Guardar el carrito en Local Storage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.album === product.album);
      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        return prevCart.map((item) =>
          item.album === product.album
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (album) => {
    setCart((prevCart) => prevCart.filter((item) => item.album !== album));
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
