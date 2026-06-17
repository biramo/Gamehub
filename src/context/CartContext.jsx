import { createContext, useContext, useState, useEffect } from "react";
import {STORAGE_KEY} from '../constants/appConfig'

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
  try {
    const carritoGuardado = localStorage.getItem(STORAGE_KEY);
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  } catch {
    return [];
  }
});

  //Cuando hay cambios en el carrito este se guarda en el localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito]);

  // Añadir o sumar producto
  const sumarProducto = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        // si ya está, suma 1
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      // si no está, lo añade con cantidad 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // Restar o eliminar producto
  const restarProducto = (id) => {
    setCarrito(prev =>
      prev
        .map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p)
        .filter(p => p.cantidad > 0) // elimina si llega a 0
    );
  };

  //Eliminar producto del carrito
  const eliminarProducto = (id) => {
  setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const setCantidadProducto=(id,cantidad)=>{
    setCarrito(prev => 
      prev.map(p =>p.id===id? {...p, cantidad:cantidad}:p)
    )
  }
  
  // Vaciar carrito completo
  const vaciarCarrito = () => setCarrito([]);

  // Total de unidades
  const totalUnidades = carrito.reduce((acum, p) => acum + p.cantidad, 0);

  // Total precio
  const totalPrecio = carrito.reduce((acum, p) => acum + ((p.cantidad ?? 0)* (p.price ?? 0)), 0);
  
  return (
    <CartContext.Provider value={{
      carrito,
      sumarProducto,
      restarProducto,
      vaciarCarrito,
      eliminarProducto,
      setCantidadProducto,
      totalUnidades,
      totalPrecio
    }}>
      {children}
    </CartContext.Provider>
  );
}

