import Slider from '../components/Slider'
import SeccionJuegos from '../components/SeccionJuegos'
import { getJuegosPorGenero, getJuegosPorPlataforma } from '../services/rawgApi'

export default function Home() {
  return (
    <main className="main-home">
      <Slider />
      
      <SeccionJuegos
        titulo="🔥 Acción"
        fetchFn={() => getJuegosPorGenero('action',15)}
      />
      <SeccionJuegos
        titulo="⚔️ RPG"
        fetchFn={() => getJuegosPorGenero('role-playing-games-rpg',15)}
      />
      <SeccionJuegos
        titulo="🎮 PlayStation"
        fetchFn={() => getJuegosPorPlataforma(187,15)}
      />
      <SeccionJuegos
        titulo="💻 PC"
        fetchFn={() => getJuegosPorPlataforma(4,15)}
      />
    </main>
  );
}