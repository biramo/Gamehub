import { addDoc, collection, serverTimestamp, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { PEDIDOS_DB } from "../constants/appConfig";

export async function createOrder(orderData) {
  if (!orderData?.userId) {
    throw new Error("El pedido necesita un usuario autenticado.");
  }

  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    throw new Error("El pedido debe incluir al menos un producto.");
  }

  const orderToSave = {
    ...orderData,
    createdAt: serverTimestamp(),
    status: orderData.status || "pending",
  };

  const docRef = await addDoc(collection(db, PEDIDOS_DB), orderToSave);

  return {
    id: docRef.id,
    ...orderToSave,
  };
}

export async function cargarPedidos(userId) {
      try {
        // Busca pedidos donde uid == usuario actual
       const q = query(
        collection(db, PEDIDOS_DB),
        where("userId", "==", userId), 
        orderBy("createdAt", "desc")  
    );
        const snapshot = await getDocs(q);
        const datos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return datos;
      } catch (err) {
        console.error("Error cargando pedidos:", err);
      } 
    };
