import '../styles/components/CartProduct.css'

// Le pasamos también las funciones para manejar la cantidad (opcional, pero recomendado)
export default function CartProduct({ producto,setCantidadProducto, onClick}) {
    const MAX_UNIDADES = 10;
    return (
        <li className="cart-product" onClick={onClick}>
            {/* Imagen simplificada sin <figure> para mejor control con CSS */}
            <img 
                src={producto.background_image}
                alt={`Imagen del producto ${producto.name}`}
                loading="lazy"
                className="cart-product-image"
            />

            <div className="cart-product-content">
                <div className="cart-product-info">
                    <h3 onClick={onClick} >{producto.name}</h3>
                    <span className="cart-product-platform">
                        {producto.platforms?.[0]?.platform?.name || 'Plataforma no especificada'}
                    </span>
                    <span className="cart-product-rating">⭐ {producto.rating?.toFixed(1) || 'N/A'}</span>
                </div>

                {/* NUEVA SECCIÓN: Controles de cantidad y precio */}
                <div className="cart-product-actions">
                    <div className="quantity-controls">
                        <select 
                            className="select-qty"
                            value={producto.cantidad}
                            title="cantidad"
                            onChange={(e)=>setCantidadProducto(producto.id,Number(e.target.value))}
                        >
                            {Array.from({ length: MAX_UNIDADES }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'unidad' : 'unidades'}
                                </option>
                            ))}
                        </select>        
                    </div>
                    
                    {/* Multiplicamos el precio por la cantidad para mostrar el subtotal de este producto */}
                    <span className="cart-product-price">
                        {producto.price ? `${(producto.price * (producto.cantidad || 1)).toFixed(2)} €` : 'N/A'}
                    </span>
                </div>
            </div>
        </li>
    );
}