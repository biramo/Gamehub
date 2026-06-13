import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import '../styles/pages/Profile.css'

export default function Profile() {
  const {user, logout}=useAuth();
  const navigate= useNavigate();
  const handleLogout= async ()=>{
    navigate('/');
    await logout();
  };

  return (
  <main>
    <section className="datos-usuario">
      <h1>Hola {user?.displayName || "user"}</h1>
      <button onClick={()=>handleLogout()}>Cerrar sesion</button>
    </section>
  </main>);
}
