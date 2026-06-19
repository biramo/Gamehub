import CartProduct from '../components/CartProduct';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { createOrder } from '../services/orderService';
import { useState } from 'react';
import { enviarEmailConfirmacion } from '../services/emailService';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Cart.css'

export default function Cart() {
  const { totalUnidades, totalPrecio, vaciarCarrito, carrito, setCantidadProducto } = useCart();
  const { user } = useAuth();
  const [mensajeCompra, setMensajeCompra] = useState("");
  const [error, setError] = useState("");
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [procesando, setProcesando] = useState(false); // ← nuevo estado
  const navigate=useNavigate();
  const generarNumeroPedido = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Función para enviar el correo (ahora devuelve true/false)
  const enviarCorreo = async () => {
    try {
      const resultado = await enviarEmailConfirmacion({
        email: user.email,
        nombre: user.displayName || 'Usuario',
        productos: carrito,
        totalUnidades: totalUnidades,
        totalPrecio: totalPrecio,
        numeroPedido: generarNumeroPedido()
      });

      if (resultado.success) {
        return true;
      } else {
        setError('Error al enviar el correo. Intenta nuevamente.');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al enviar el correo.');
      return false;
    }
  };

  // Función para crear el pedido
  const crearPedido = async () => {
    try {
      const pedido = await createOrder({
        userId: user.uid,
        userEmail: user.email || '',
        items: carrito.map((producto) => ({
          id: producto.id,
          name: producto.name || producto.nombre,
          price: Number(producto.price || 0),
          quantity: Number(producto.cantidad || 1),
          image: producto.background_image || '',
        })),
        total: Number(totalPrecio.toFixed(2)),
        subtotal: Number(totalPrecio.toFixed(2)),
        shippingCost: 0,
      });
      return pedido;
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      throw error;
    }
  };

  // Función principal - procesa el pago completo
  const handlePagoCompleto = async () => {
    // Resetear estados
    setError("");
    setMensajeCompra("");
    setProcesando(true);

    // Validaciones básicas
    if (!user) {
      setMensajeCompra('Debes iniciar sesión para completar tu pedido.');
      setProcesando(false);
      return;
    }

    if (carrito.length === 0) {
      setMensajeCompra('Tu carrito está vacío.');
      setProcesando(false);
      return;
    }

    try {
      // 1. Enviar correo de confirmación
      const correoEnviado = await enviarCorreo();
      
      if (!correoEnviado) {
        // El correo falló, pero preguntamos si quiere continuar
        const continuar = window.confirm(
          'No se pudo enviar el correo de confirmación. ¿Quieres continuar con el pedido igualmente?'
        );
        if (!continuar) {
          setProcesando(false);
          return;
        }
      }

      // 2. Crear el pedido
      const pedido = await crearPedido();

      // 3. Éxito - mostrar mensaje y vaciar carrito
      setPedidoConfirmado(true);
      setMensajeCompra(`✅ ¡Pedido completado! ID: ${pedido.id}`);
      vaciarCarrito();

    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      setMensajeCompra('❌ Error al procesar el pedido. Inténtalo de nuevo.');
    } finally {
      setProcesando(false);
    }
  };

  // Si el pedido está confirmado, mostrar mensaje de éxito
  if (pedidoConfirmado) {
    return (
      <main className='cart-page'>
        <div className="confirmacion-exito">
          <h2>✅ ¡Pedido Confirmado!</h2>
          <p>Se ha enviado un correo de confirmación a <strong>{user?.email}</strong></p>
          <p>Revisa tu bandeja de entrada o carpeta de spam.</p>
          <button 
            className="btn-tramitar"
            onClick={() => window.location.href = '/'}
            style={{ marginTop: '1rem' }}
          >
            Volver a la tienda
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className='cart-page'>
      <section className="section-info-pedido">
        <div className="pedido-header">
          <h1 className='titles'>Carrito</h1>
          <p>Tienes {totalUnidades} artículos en la cesta</p>
          <button className="btn-vaciar-carrito" onClick={vaciarCarrito}>
            Vaciar carrito 🗑️
          </button>
        </div>
        <div className="pedidos-container">
          <ul className="ul-pedidos">
            {carrito.map((producto) => (
              <CartProduct
                onClick={()=>navigate(`/game/${producto.id}`)}
                key={producto.id}
                producto={producto}
                setCantidadProducto={setCantidadProducto}
              />
            ))}
          </ul>
        </div>
      </section>

      <aside className="aside-resumen-compra">
        <div className='header-resumen-compra'>
          <h2 className='titles'>Resumen del pedido</h2>

          <div className="resumen-info">
            <div className="resumen-fila text-resumen-pedido">
              <span>Productos ({totalUnidades}):</span>
              <span>{totalPrecio.toFixed(2)}€</span>
            </div>
          </div>

          <div className="resumen-fila text-resumen-pedido">
            <span>Gastos de envío:</span>
            <span className="envio-gratis">Gratis</span>
          </div>

          <div className="cupon-contenedor text-resumen-pedido">
            <input 
              type="text" 
              placeholder="Código de descuento" 
              title="Cupón" 
              className="input-cupon" 
            />
            <button className="btn-cupon">Aplicar</button>
          </div>

          <div className="resumen-fila total-row text-resumen-pedido">
            <span>Total (IVA incluido):</span>
            <span className="precio-total">{totalPrecio.toFixed(2)}€</span>
          </div>
        </div>

        <div className='container-pago'>
          {error && <p className="error-mensaje">{error}</p>}
          <p className='mensaje-compra'>{mensajeCompra}</p>

          <button
            className="btn-tramitar text-resumen-pedido"
            onClick={handlePagoCompleto}
            disabled={procesando}
          >
            {procesando ? 'Procesando...' : 'Proceder al pago ➔'}
          </button>

          <div className="resumen-Garantias text-resumen-pedido">
            <p>🔒 Pago seguro encriptado SSL</p>
            <p>⏱️ Entrega digital inmediata</p>
          </div>
        </div>
      </aside>

      <section className='section-sugerencias'>
      </section>
      <section className='section-comentarios-valoraciones'>
        {/* MAS ADELANTE */}
      </section>
    </main>
  );
}