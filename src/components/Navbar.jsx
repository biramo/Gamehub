import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart';
import '../styles/components/Navbar.css'

export default function Navbar() {
  const {totalUnidades}=useCart();
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
          {user&&( 
          <li className="navbar-cart" onClick={()=>navigate('/cart')}>🛒 <span>{totalUnidades}</span></li>
          )}
          <li className="navbar-profile" onClick={()=>user? navigate('/profile'): navigate('/login')}>👤 {user? "Perfil": "Inicia sesion"}</li>
        </ul>
      </nav>
    </header>
  );
}