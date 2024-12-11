"use client";

// context/CartContext.js

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde Local Storage al montar el componente
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      console.log("Carrito cargado desde localStorage:", JSON.parse(storedCart));
    } else {
      console.log("No se encontró carrito en localStorage.");
    }
  }, []);

  // Guardar el carrito en Local Storage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.name === product.name);
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("Producto existente. Carrito actualizado:", updatedCart);
        return updatedCart;
      } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        console.log("Producto añadido al carrito:", newCart);
        return newCart;
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (name) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
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