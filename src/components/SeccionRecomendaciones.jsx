import { getRecomendaciones } from '../services/recommendApi' //get de la fastApi recomendaciones
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/components/SeccionRecomendaciones.css'

export default function SeccionRecomendaciones(){
    const [recomendaciones, setRecomendaciones] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) getRecomendaciones(id).then(setRecomendaciones);
    }, [id]);

    return(
        <section className='seccion-recommend'>
            <div className='header-recommend'>
                <h2>¡No te pierdas estos juegos!</h2>
                <p>Seleccionado para ti</p>
            </div>

            <div className='container-games'>
                <ul className='ul-games'>
                    {recomendaciones.map((juego)=>{
                       return <li className='card-game'> 
                            <img src={juego.background_image}/>
                            <div className='header-card'>
                                <h3>{juego.name}</h3>
                                <p>{juego.genres?.map(genre => genre.name).join(",")}</p>
                            </div>
                            <div className='card-meta'>
                                <p className='card-rating'>⭐ {juego.rating?.toFixed(1) || 'N/A'}</p>
                                <p><strong>Plataformas:</strong> {
                                   juego.platforms?.map(p => p.platform.name).join(', ') || 'No especificadas'}
                                </p>
                            </div>
                                <p className='price-card'>{juego.price}€</p>
                        </li>
                    })}
                </ul>  
            </div>
        </section>
    )
}