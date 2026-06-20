import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import '../styles/components/SearchBar.css'

export default function SearchBar({ onSearch, valorInicial = '' }) {
  const [searchTerm, setSearchTerm] = useState(valorInicial);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

   const handleBuscar = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      navigate(ROUTES.GAMES);
      return;
    };
    navigate(`/games?search=${searchTerm}`);
    setSearchTerm("");
  };

  const estaAbierto = isFocused || searchTerm.length > 0;

  return (
    <li className={`search-container ${estaAbierto ? 'open' : ''}`}>
            <form onSubmit={handleBuscar} className="search-form">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar juego..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button type="submit" className="btn-buscador">🔎</button>
            </form>
    </li>
  );
}