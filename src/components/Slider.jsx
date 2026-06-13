import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJuegosDestacados } from '../services/rawgApi'
import Spiner from './Spiner'
import '../styles/components/Slider.css'

export default function Slider() {

  const [juegos, setJuegos] = useState([]);//Guardamos todos los jeugos
  const [actual, setActual] = useState(0); //Guardamos juego actual del slider
  const [cargando, setCargando] = useState(true); //Estado de carga de los juegos
  const navigate = useNavigate(); //importamos la funcion useNavigate

  //Filtro de juegos adultos activado
  useEffect(() => {
    getJuegosDestacados()
      .then(data => {
        // SEGURIDAD: Detectamos si la lista viene en 'data.results' o directamente en 'data'
        const palabrasProhibidas = ['porn', 'hentai', 'sexy', 'nudity', 'nsfw', 'lewd', 'xxx'];
        
        const juegosFiltrados = data.filter(juego => {
          const titulo = juego.name.toLowerCase();
          const tienePalabraProhibida = palabrasProhibidas.some(palabra => titulo.includes(palabra));
          return !tienePalabraProhibida;
        });
      
        // ¡CLAVE! Guardamos los juegos ya filtrados, no la data sucia
        setJuegos(juegosFiltrados);
        setCargando(false);
      
      })
      .catch(err => {
        console.error("Error cargando destacados:", err);
        setCargando(false); // Apagamos el spiner para que la app no se quede congelada
      });
  }, []);

  // Avanza al siguiente juego
  const siguiente = () => setActual(prev => (prev + 1) % juegos.length);
  
  // Retrocede al anterior
  const anterior = () => setActual(prev => (prev - 1 + juegos.length) % juegos.length);

  // Auto-avance cada 4 segundos
  useEffect(() => {
    if (juegos.length === 0) return;
    const timer = setInterval(siguiente, 4000);
    return () => clearInterval(timer);
  }, [juegos]);

  if (cargando) return <Spiner/>;

  const juego = juegos[actual];

  return (
    <section className="slider">
      {/* Imagen de fondo */}
      <div
        className="slider-bg"
        style={{ backgroundImage: `url(${juego.background_image})` }}
      />

      {/* Contenido */}
      <div className="slider-content">
        <h2 className="slider-titulo">{juego.name}</h2>
        <div className="slider-meta">
          <span>⭐ {juego.rating}</span>
          <span>🎮 {juego.genres?.map(g => g.name).join(', ')}</span>{/*Por si tiene mas de un genero */}
        </div>
        <button
          className="slider-btn"
          onClick={() => navigate(`/game/${juego.id}`)}
        >
          Ver juego
        </button>
      </div>

      {/* Botones navegación */}
      <button className="slider-prev" onClick={anterior}>‹</button>
      <button className="slider-next" onClick={siguiente}>›</button>

      {/* Puntos indicadores creamos uno por cada*/}
      <div className="slider-dots">
        {juegos.map((_, i) => (
          <span
            key={i}
            className={`slider-dot ${i === actual ? 'active' : ''}`}
            onClick={() => setActual(i)}
          />
        ))}
      </div>
    </section>
  );
}