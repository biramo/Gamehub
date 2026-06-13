import { useState } from 'react';
import '../styles/components/Navbar.css'

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="navbar">
      <nav>
        <ul>
          <li className="logo">
            🛍️ <span>MiTienda</span>
          </li>
          <li className="search-container">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
          <li className="cart">🛒 <span>0</span></li>
          <li className="profile">👤 Perfil</li>
        </ul>
      </nav>
    </header>
  );
}