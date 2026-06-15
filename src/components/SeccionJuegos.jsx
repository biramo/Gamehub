import { useState, useEffect } from 'react'
import GameCard from './GameCard'
import Spiner from './Spiner'
import '../styles/components/SeccionJuegos.css'

export default function SeccionJuegos({ titulo, fetchFn }) {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchFn()
      .then(data => { setJuegos(data); setCargando(false); })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="section-juegos-clasificados">
      <h2>{titulo}</h2>
      {cargando ? (
        <Spiner/>
      ) : (
        <div className="container-game-cards">
          {juegos.map(juego => (
            <GameCard key={juego.id} juego={juego} />
          ))}
        </div>
      )}
    </section>
  );
}