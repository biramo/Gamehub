import { useParams } from 'react-router-dom';
import { getJuego } from '../services/rawgApi'
import { useEffect, useState } from 'react';
import Spiner from '../components/Spiner'
import {useCart} from '../hooks/useCart'
import {useAuth} from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pages/GameDetail.css'
import SeccionRecomendaciones from '../components/SeccionRecomendaciones';

export default function GameDetail() {
    const navigate=useNavigate();
    const {user}=useAuth();
    const { sumarProducto }=useCart();
    const { id } = useParams();
    const [screenshots, setScreenshots] = useState([]);  // ← Array de capturas
    const [indiceImagen, setIndiceImagen] = useState(0);
    const [juego, setJuego]=useState();
    const [loading, setLoading] = useState(true);  // ← Estado para carga
    const [error, setError] = useState(null);  // ← Estado para errores
    
     // Avanza al siguiente juego
    const siguiente = () => {
      if (screenshots.length > 0) {
        setIndiceImagen(prev => (prev + 1) % screenshots.length);
      }
    };
    // Retrocede al anterior
    const anterior = () => {
      if (screenshots.length > 0) {
        setIndiceImagen(prev => (prev - 1 + screenshots.length) % screenshots.length);
      }
    };

     const handleAgregarCarrito = () => {
      sumarProducto(juego);

      toast.success('Producto añadido a la cesta', {
        position: 'top-right',
        autoClose: 3000,
      });
    };
  

    useEffect(()=>{
      const cargarJuego= async ()=>{
        try{
        setLoading(true);
        const data = await getJuego(id);
        setJuego(data);

        // Guardar screenshots si existen
        if (data.short_screenshots && data.short_screenshots.length > 0) {
          setScreenshots(data.short_screenshots);
          setIndiceImagen(0);
        } else {
          setScreenshots([]);
        }

      }catch(err){
        setError("Error al cargar el juego");
        console.error(err);
      }finally{

        setLoading(false);
      }
    }
   
    if(id){
      cargarJuego();

    }},[id])

    if(loading){
      return <Spiner/>
    }

    if (error || !juego) {
    return (
      <div className="error-container">
        <p>{error || 'Juego no encontrado'}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }
  const imagenActual=screenshots[indiceImagen]?.image || juego.background_image;

    return (
    <main className="main-detail-page">
        <article className="detail-page">
          <section className='section-detail-game'>
            <figure className="game-images">
              <img 
              src={imagenActual}
              alt={`Imagen del juego ${juego.name}`}/>
              {screenshots.length > 1 && (
              <div className="nav-buttons">
                  <button className="image-previous" onClick={anterior} aria-label="Anterior">‹ Anterior</button>
                  <button className="image-next" onClick={siguiente} aria-label="Siguiente" >Siguiente ›</button>
              </div>
              )}
            </figure>
            <div className="game-content">
              <div className="game-title">
                <h1>{juego.name}</h1>
              </div>
              <div className="rating">
                <span>⭐ {juego.rating?.toFixed(1) || 'N/A'}</span>
                {juego.metacritic &&(<span>Rating: {juego.metacritic}/100</span>)}
              </div>
              
              <div className="game-meta">
              <p><strong>Fecha de lanzamiento:</strong> {juego.released || 'No especificada'}</p>
              <p><strong>Plataformas:</strong> {
                juego.platforms?.map(p => p.platform.name).join(', ') || 'No especificadas'
              }</p>
              <p><strong>Etiquetas:</strong>{juego.tags?.map(tag=>tag.name).join(", ")}</p>
              
              {/* Géneros */}
              <div className='game-genres'>
                <strong>Géneros:</strong>
                <ul>{juego.genres?.map(genre => (
                  <li key={genre.id} className="genre-tag">{genre.name}</li>
                ))}
                </ul>
              </div>
              </div>
            </div>
          </section>      
            {/* Información adicional del producto */}
            <section className="section-info-compra">
              <div className='title-info-compra'>
                 <h3>Información de compra</h3>
                 <p className="price">{juego.price ? `${juego.price} €` : 'Precio no disponible'}</p>  
              </div>
              <div className='meta-info-compra'>
                <p>✅ Incluye licencia digital</p>
                <p>🎮 Compatible con {juego.platforms?.map(p => p.platform.name).join(', ')}</p>
                <p>📦 Entrega inmediata por email</p>
                <p>🔒 Garantía de devolución de 14 días</p>
                <button 
                onClick={user? handleAgregarCarrito : ()=>navigate('/login')}
                className="btn-comprar" 
                aria-label="Añadir al carrito">
                  añadir al carrito
                </button>
              </div>
            </section>
      </article>
      <SeccionRecomendaciones/>
   </main>
   );
}
