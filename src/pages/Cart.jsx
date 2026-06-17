import CartProduct from '../components/CartProduct';
import { useCart } from '../hooks/useCart';
import '../styles/pages/Cart.css'

export default function Cart() {
  const {totalUnidades,totalPrecio, vaciarCarrito, carrito, setCantidadProducto}=useCart();
  return (
  <main className='cart-page'>
    <section className="section-info-pedido">
      <div className="pedido-header">
        <h1 className='titles'>Carrito</h1>
        <p>Tienes {totalUnidades} articulos en la cesta</p>
        <button className="btn-vaciar-carrito" onClick={vaciarCarrito}>Vaciar carrito 🗑️</button>
      </div>
      <div className="pedidos-container">
        <ul className="ul-pedidos">
        {carrito.map((producto)=>{
          return(<CartProduct
                  key={producto.id}
                  producto={producto}
                  setCantidadProducto={setCantidadProducto}
          />)
        })}
        </ul>
      </div>

    </section>
    <aside className="aside-resumen-compra">
      <div className='header-resumen-compra'>
        <h2 className='titles'>Resumen del pedido</h2>
    
        <div className="resumen-info">
          {/* Detalle de productos */}
          <div className="resumen-fila">
            <span>Productos ({totalUnidades}):</span>
            <span>{totalPrecio.toFixed(2)}€</span>
          </div>
        </div>

        {/* Tipo de envío / tasas */}
        <div className="resumen-fila">
          <span>Gastos de envío:</span>
          <span className="envio-gratis">Gratis</span>
        </div>

        {/* Sección de Cupón (Visual por ahora) */}
        <div className="cupon-contenedor">
          <input type="text" placeholder="Código de descuento" title="Cupón" className="input-cupon" />
          <button className="btn-cupon">Aplicar</button>
        </div>


        {/* El Total bien destacado */}
        <div className="resumen-fila total-row">
          <span>Total (IVA incluido):</span>
          <span className="precio-total">{totalPrecio.toFixed(2)}€</span>
        </div>
      </div>

      <button className="btn-tramitar">Proceder al pago ➔</button>

      {/* Sellos de confianza al final */}
      <div className="resumen-Garantias">
        <p>🔒 Pago seguro encriptado SSL</p>
        <p>⏱️ Entrega digital inmediata</p>
      </div>
    </aside>
    <section className="section-sugerencias">
      {/*MAS ADELANTE */}
    </section>
    <section className='section-comentarios-valoraciones'>

    </section>
  </main>
  );
}
