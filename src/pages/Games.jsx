import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getJuegos } from '../services/rawgApi'
import GameCard from '../components/GameCard'
import Spiner from '../components/Spiner'
import '../styles/pages/Games.css'

const GENEROS = [
  { id: 'action', nombre: 'Acción' },
  { id: 'rpg', nombre: 'RPG' },
  { id: 'strategy', nombre: 'Estrategia' },
  { id: 'shooter', nombre: 'Shooter' },
  { id: 'adventure', nombre: 'Aventura' },
  { id: 'indie', nombre: 'Indie' },
];

const PLATAFORMAS = [
  { id: 4,   nombre: 'PC' },
  { id: 187, nombre: 'PlayStation' },
  { id: 186, nombre: 'Xbox' },
  { id: 7,   nombre: 'Nintendo' },
];

const ORDEN = [
  { id: '-rating',   nombre: 'Mejor valorados' },
  { id: '-released', nombre: 'Más recientes' },
  { id: 'name',      nombre: 'A-Z' },
];

export default function Games() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
    const [filtrosAbiertos, setFiltrosAbiertos] = useState(false); // ← nuevo

  const busqueda   = searchParams.get('search')   || '';
  const genero     = searchParams.get('genre')    || '';
  const plataforma = searchParams.get('platform') || '';
  const orden      = searchParams.get('sort')     || '-rating';

  useEffect(() => {
    setCargando(true);
    getJuegos({ pagina, busqueda, genero, plataforma, orden })
      .then(data => {
        setJuegos(data.results);
        setTotal(data.count);
        setCargando(false);
      });
  }, [searchParams, pagina]);

  const actualizarFiltro = (clave, valor) => {
    const params = Object.fromEntries(searchParams);
    if (valor) params[clave] = valor;
    else delete params[clave];
    setSearchParams(params);
    setPagina(1);
  };

  return (
    <main className="games-page">
        <button 
            className="filtros-toggle"
            onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
        >
        {filtrosAbiertos ? '✕ Cerrar filtros' : '☰ Filtros'}
    </button>
      <aside className={`games-filtros ${filtrosAbiertos ? 'abierto' : ''}`}>
      <h3>Géneros</h3>
        <ul>
          <li className={!genero ? 'active' : ''} onClick={() => actualizarFiltro('genre', '')}>
            Todos
          </li>
          {GENEROS.map(g => (
            <li
              key={g.id}
              className={genero === g.id ? 'active' : ''}
              onClick={() => actualizarFiltro('genre', g.id)}
            >
              {g.nombre}
            </li>
          ))}
        </ul>

        <h3>Plataformas</h3>
        <ul>
          <li className={!plataforma ? 'active' : ''} onClick={() => actualizarFiltro('platform', '')}>
            Todas
          </li>
          {PLATAFORMAS.map(p => (
            <li
              key={p.id}
              className={plataforma == p.id ? 'active' : ''}
              onClick={() => actualizarFiltro('platform', p.id)}
            >
              {p.nombre}
            </li>
          ))}
        </ul>

        <h3>Ordenar por</h3>
        <ul>
          {ORDEN.map(o => (
            <li
              key={o.id}
              className={orden === o.id ? 'active' : ''}
              onClick={() => actualizarFiltro('sort', o.id)}
            >
              {o.nombre}
            </li>
          ))}
        </ul>
      </aside>

      <section className="games-resultados">
        <h2>
          {busqueda ? `Resultados para "${busqueda}"` : 'Todos los juegos'}
          <span className="games-total"> ({total} juegos)</span>
        </h2>

        {cargando ? (
          <Spiner />
        ) : (
          <div className="games-grid">
            {juegos.map(juego => (
              <GameCard key={juego.id} juego={juego} />
            ))}
          </div>
        )}

        <div className="games-paginacion">
          <button disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}>
            ← Anterior
          </button>
          <span>Página {pagina}</span>
          <button onClick={() => setPagina(p => p + 1)}>
            Siguiente →
          </button>
        </div>
      </section>
    </main>
  );
}