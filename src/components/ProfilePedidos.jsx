import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { cargarPedidos } from "../services/orderService";
import Spiner from "../components/Spiner"
import '../styles/components/ProfilePedidos.css'

export default function ProfilePedidos(){
    const { user } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
    async function obtenerDatos() {
      if (user?.uid) {
        try {
          // 🌟 AQUÍ SE USA EL AWAIT y le pasas el ID del usuario
          const misPedidos = await cargarPedidos(user.uid); 
          setPedidos(misPedidos);
        } catch (error) {
          console.error("Error al traer los pedidos:", error);
        } finally {
          setCargando(false);
        }
      }
    }
    obtenerDatos();
  }, [user]);

    return(
    <div className="pedidos-section">
            <h2>Mis Pedidos</h2> 
            {cargando ? (
              <Spiner/>
            ) : pedidos.length === 0 ? (
              <p>No has realizado ningún pedido aún. 🛒</p>
            ) : (
              <ul className="lista-pedidos-main">
                {pedidos.map((pedido) => {
                  // 🌟 Convertir el Timestamp de Firebase a una fecha legible
                  const fechaLegible = pedido.createdAt?.toDate 
                    ? pedido.createdAt.toDate().toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : "Procesando fecha...";

                  return (
                    <li key={pedido.id} className="tarjeta-pedido"> {/* 🌟 ID único de Firestore como key */}
                      <div className="header-pedido">
                        <h3>📅 {fechaLegible}</h3>
                        <p><strong>ID del Pedido:</strong> {pedido.id}</p>
                        <p><strong>Estado:</strong> <span className={`status-${pedido.status}`}>{pedido.status}</span></p>
                      </div>
                      
                      <div className="content-pedido">
                        <h4>Productos:</h4>
                        <ul className="items-pedido">
                          {pedido?.items?.map((p, i) => (
                            <li key={i} className="item-producto-resumen">
                              <p><strong>{p.name}</strong> x{p.quantity} - {p.price}€</p>
                            </li>
                          ))}
                        </ul>
                        <div className="total-pedido-profile">
                          <p><strong>Total Pagado:</strong> {pedido.total}€</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          )
}