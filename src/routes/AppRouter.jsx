import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import GameDetail from '../pages/GameDetail';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ROUTES } from '../constants/routes';

export default function AppRouter() {
    // Para saber lugar actual
    const location = useLocation();
    
    // ← páginas sin Navbar (usando constantes)
    const sinNavbar = [ROUTES.LOGIN, ROUTES.REGISTER];
    const mostrarNavbar_footer = !sinNavbar.includes(location.pathname);

    return (
        <>
            {mostrarNavbar_footer && <Navbar />}
            <Routes>
                {/* Rutas públicas */}
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path="/game/:id" element={<GameDetail />} />

                {/* Rutas protegidas (requieren login) */}
                <Route path={ROUTES.CART} element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />
                
                <Route path={ROUTES.FAVORITES} element={
                    <ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>
                } />
                
                <Route path={ROUTES.PROFILE} element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                
                <Route path={ROUTES.ORDERS} element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                } />

                {/* Si no existe la página muestra este componente */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            {mostrarNavbar_footer && <Footer />}
        </>
    );
}