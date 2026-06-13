import {Routes,Route} from 'react-router-dom'
import Home from "../pages/Home"
import Login from "../pages/Login"
import GameDetail from '../pages/GameDetail'
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function AppRouter() {
  const sinNavbar = ['/login', '/register']; // ← páginas sin Navbar
  const mostrarNavbar_footer = !sinNavbar.includes(location.pathname);

  return(
    <>
        {mostrarNavbar_footer && <Navbar />}
        <Routes>
            {/*Rutas publicas*/}
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/game/:id" element={<GameDetail/>}/>
            <Route path="/register" element={<Register/>}/>


            {/* Rutas protegidas (requieren login) */}
            <Route path="/cart" element={
                <ProtectedRoute>
                <Cart />
                </ProtectedRoute>
            } />
            <Route path="/favorites" element={
                <ProtectedRoute>
                <Favorites />
                </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute>
                <Profile />
                </ProtectedRoute>
            } />
            <Route path="/orders" element={
                <ProtectedRoute>
                <Orders />
                </ProtectedRoute>
            } />

            {/*Si no existe la pagina muestra este componente*/}

            <Route path="*" element={<NotFound/>}/>

        </Routes>
        {mostrarNavbar_footer && <Footer />}
    </>
  )
}
