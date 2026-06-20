import { añadirPrecio } from "./rawgApi";
const API_URL = 'http://192.168.0.54:8000';

export async function getRecomendaciones(gameId) {
  const res = await fetch(`${API_URL}/recommend/${gameId}`);

  if (!res.ok) {
    throw new Error("Error al obtener recomendaciones");
  }

  const data = await res.json();
  return añadirPrecio(data.recomendaciones);
}