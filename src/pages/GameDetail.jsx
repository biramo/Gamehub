import { useParams } from 'react-router-dom';
import { getJuego } from '../services/rawgApi'
import { useEffect, useState } from 'react';
import Spiner from '../components/Spiner'
import '../styles/pages/GameDetail.css'

export default function GameDetail() {
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
    <main className="main-game-detail">
        <section className="game-detail">
          <figure className="game-images">
            <img 
            src={imagenActual}
            alt={`Imagen del juego ${juego.name}`}/>
            {screenshots.length > 1 && (
            <div className="nav-buttons">
                <button className="image-previous" onClick={anterior}>‹ Anterior</button>
                <button className="image-next" onClick={siguiente}>Siguiente ›</button>
            </div>
            )}
          </figure>
          <div className="game-content">
            <div className="game-title">
              <h3>{juego.name}</h3>
            </div>
            <div className="rating-price">
              <span>⭐ {juego.rating?.toFixed(1) || 'N/A'}</span>
              <span className="price">{juego.price ? `${juego.price} €` : 'Precio no disponible'}</span>
              {juego.metacritic &&(<span>Puntuacion {juego.metacritic}/100</span>)}
            </div>
            
            <div className="game-meta">
            <p><strong>Fecha de lanzamiento:</strong> {juego.released || 'No especificada'}</p>
            <p><strong>Plataformas:</strong> {
              juego.platforms?.map(p => p.platform.name).join(', ') || 'No especificadas'
            }</p>
            <p>{juego.tags?.map(tag=>tag.name).join(", ")}</p>
            
            {/* Géneros */}
            <div className='game-genres'>
              <strong>Géneros:</strong>
              {juego.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
            
            {/* Información adicional del producto */}
            <div className="info-compra">
              <h4>Información de compra</h4>
              <p>✅ Incluye licencia digital</p>
              <p>🎮 Compatible con {juego.platforms?.map(p => p.platform.name).join(', ')}</p>
              <p>📦 Entrega inmediata por email</p>
              <p>🔒 Garantía de devolución de 14 días</p>
              <button className="btn-comprar">
                Comprar
              </button>
            </div>
          </div>
          </div>
          
          
      </section>
   </main>
   );
}
