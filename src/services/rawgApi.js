const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// Juegos destacados para el slider
/*
  ordering=-rating: Ordena los juegos de mayor a menor puntuación (el '-' indica orden descendente).
  page_size=10: Limita el resultado a 10 juegos (ideal para el carrusel de inicio).
  return data.results: Devuelve directamente el arreglo con la lista de videojuegos.
*/
// Añade precio simulado a un array de juegos
export function añadirPrecio(datos) {
  const generarPrecio = () => (Math.random() * 50 + 10).toFixed(2);
  
  // Si es un array (lista de juegos)
  if (Array.isArray(datos)) {
    return datos.map(juego => ({
      ...juego,
      price: generarPrecio()
    }));
  }
  
  // Si es un objeto (juego individual)
  return {
    ...datos,
    price: generarPrecio()
  };
}

export async function getJuegosDestacados() {
  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`
  );
  const data = await res.json();
  return añadirPrecio(data.results);
}

// Obtener catálogo completo de juegos con filtros y paginación
export async function getJuegos({ pagina = 1, busqueda = '', genero = '', plataforma = '', orden = '-rating' } = {}) {
  const params = new URLSearchParams({
    key: API_KEY,
    page: pagina,
    page_size: 20,
    ordering: orden,
    sfw: true,
    ...(busqueda   && { search: busqueda }),
    ...(genero     && { genres: genero }),
    ...(plataforma && { platforms: plataforma }),
  });
  const res = await fetch(`${BASE_URL}/games?${params}`);
  const data = await res.json();
  return {
    ...data,
    results: añadirPrecio(data.results)
  };
}

// Obtener el detalle de un juego específico por su ID
export async function getJuego(id) {
  // Realiza la petición usando el ID único del juego en la URL
  const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  const data= await res.json();
  return añadirPrecio(data);
}

// Juegos por género
export async function getJuegosPorGenero(genero, cantidad = 6) {
  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&genres=${genero}&page_size=${cantidad}&ordering=-rating`
  );
  const data = await res.json();
  return añadirPrecio(data.results);
}

// Juegos por plataforma
export async function getJuegosPorPlataforma(plataforma, cantidad = 6) {
  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&platforms=${plataforma}&page_size=${cantidad}&ordering=-rating`
  );
  const data = await res.json();
  return añadirPrecio(data.results);
}