const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// Juegos destacados para el slider
export async function getJuegosDestacados() {
  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`
  );
  const data = await res.json();
  return data.results;
}

// Todos los juegos con filtros
export async function getJuegos({ pagina = 1, busqueda = '', genero = '' } = {}) {
  const params = new URLSearchParams({
    key: API_KEY,
    page: pagina,
    page_size: 20,
    ...(busqueda && { search: busqueda }),
    ...(genero && { genres: genero }),
  });
  const res = await fetch(`${BASE_URL}/games?${params}`);
  const data = await res.json();
  return data;
}

// Detalle de un juego
export async function getJuego(id) {
  const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  return await res.json();
}