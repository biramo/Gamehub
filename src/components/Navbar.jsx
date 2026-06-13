import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import '../styles/components/Navbar.css'

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); //importamos la funcion useNavigate
  const { user } = useAuth();

  
  return (
    <header className="navbar">
      <nav>
        <ul>
          <li className="logo" onClick={()=>navigate('/')}>
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
          {/*El 0 es temmporal falta por desarrollar el carrito*/} 
          <li className="navbar-cart" onClick={()=>user? navigate('/cart'): navigate('/login')}>🛒 <span>0</span></li>
          <li className="navbar-profile" onClick={()=>user? navigate('/profile'): navigate('/login')}>👤 {user? "Perfil": "Inicia sesion"}</li>
        </ul>
      </nav>
    </header>
  );
}