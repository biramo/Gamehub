import { getRecomendaciones } from '../services/recommendApi' //get de la fastApi recomendaciones
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spiner from '../components/Spiner';
import '../styles/components/SeccionRecomendaciones.css'

export default function SeccionRecomendaciones(){
    const [recomendaciones, setRecomendaciones] = useState([]);
    const { id } = useParams();
    const [loading, setLoading]=useState(false)
    const navigate=useNavigate();

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setRecomendaciones([]);
        
        getRecomendaciones(id)
            .then((data) => {
                setRecomendaciones(data);
            })
            .catch((error) => {
                console.error("Error cargando recomendaciones:", error);
            })
            .finally(() => {
                setLoading(false); // Se ejecuta siempre (éxito o error)
            });

    }, [id]);

    if(loading) return <Spiner/>

    if(recomendaciones.length===0 && !loading) return null

    return(
        <section className='seccion-recommend'>
            <div className='header-recommend'>
                <h2>¡No te pierdas estos juegos!</h2>
                <p>Seleccionado para ti</p>
            </div>

                <ul className='ul-games'>
                    {recomendaciones.map((juego)=>{
                       return <li className='card-game' onClick={()=>navigate(`/game/${juego.id}`)}> 
                            <img src={juego.background_image}/>
                            <div className='card-content'>
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
                            </div>
                        </li>
                    })}
                </ul>  
        </section>
    )
}