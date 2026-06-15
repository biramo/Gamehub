import { useNavigate } from "react-router-dom";
import '../styles/components/GameCard.css'

export default function GameCard({juego}) {

  const navigate=useNavigate();

  const handleNavigate = ()=>{
    navigate(`/game/${juego.id}`)
  }

  return (
    <article 
    onClick={handleNavigate}
    aria-label={`Ver detalles de ${juego.name}`}
    className="game-card"
    >
      <figure className="card-figure">
         <img 
           src= {juego.background_image}
           alt={`imagen del juego ${juego.name}`}
           loading="lazy"
           className="card-image"
        />
      </figure>
      
      <div className="card-content">
        <div className="tit-card">
          <h3>{juego.name}</h3>
        </div>
        <div className="card-meta">
          <div className="card-genres">
            {juego.genres?.map((genre, index) => (
              <span key={genre.id}>
                {index > 0 && ', '}
                {genre.name}
              </span>
            ))}
          </div>{/*Por si tiene mas de un genero */}

          <span className="card-platform">{juego.platforms?.[0]?.platform?.name || 'Plataforma no especificada'}</span>
          <span className="card-rating">⭐ {juego.rating?.toFixed(1) || 'N/A'}</span>
          <span className="card-price">{juego.price ? `${juego.price} €` : 'Precio no disponible'}</span>
        </div>
      </div>

    </article>);
}
