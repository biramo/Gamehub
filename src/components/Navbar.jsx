import { useState,useEffect,useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart';
import {ROUTES} from '../constants/routes'
import '../styles/components/Navbar.css'

export default function Navbar() {
  const {totalUnidades}=useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); //importamos la funcion useNavigate
  const { user, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);//Para el dropdown
  const dropdownRef = useRef(null);

  const toggleProfile = () => {
    setOpenProfile(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    setOpenProfile(false);
    navigate(ROUTES.LOGIN);
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      navigate(ROUTES.GAMES);
      return;
    };
    navigate(`/games?search=${searchTerm}`);
  };

  // Función para navegar y cerrar el dropdown
  const handleNavigation = (path) => {
    navigate(path);
    setOpenProfile(false);
  };

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenProfile(false);
    }
  };

  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      setOpenProfile(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('keydown', handleEsc);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleEsc);
  };
}, []);
  
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
            <button 
            className='btn-buscador'
            onClick={handleBuscar}
            >🔎</button>
          </li>
          {user&&( 
          <li className="navbar-cart" onClick={()=>navigate('/cart')}>🛒 <span>{totalUnidades}</span></li>
          )}
          <li ref={dropdownRef} className="profile-wrapper">
            <div
              className="navbar-profile"
              onClick={() => user ? toggleProfile() : navigate('/login')}
            >
              👤 {user ? "Perfil" : "Inicia sesion"}
              {user && (
                <span className="dropdown-arrow">
                  {openProfile ? '▲' : '▼'}
                </span>
              )}
            </div>

            {user && openProfile && (
              <div className="dropdown-menu">
                <ul>
                  <li className="navigate-profile dropdown-menu-link" onClick={() => handleNavigation('/profile')}>
                    👤 Mi Perfil
                  </li>
                  <li className="navigate-profile dropdown-menu-link" onClick={() => handleNavigation('/profile/pedidos')}>
                    📦 Mis Pedidos
                  </li>
                  <li className="navigate-profile dropdown-menu-link" onClick={() => handleNavigation('/profile/seguridad')}>
                    🔒 Seguridad
                  </li>
                  <li className="navigate-profile dropdown-menu-link" onClick={() => handleNavigation('/profile/config')}>
                    ⚙️ Configuración
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="dropdown-logout dropdown-menu-link" onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}