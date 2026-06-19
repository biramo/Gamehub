import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { cargarPedidos } from "../services/orderService";
import ProfilePedidos from "../components/ProfilePedidos";
import ProfileConfig from "../components/ProfileConfig";
import ProfileSecurity from "../components/ProfileSecurity";
import '../styles/pages/Profile.css'

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { tab } = useParams();
  const activeTab = tab || "perfil";
 

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <main className="dashboard-profile">
      <aside className="profile-sidebar">
        <section className="sidebar-user">
          <div className="avatar-large">
            {user?.displayName?.charAt(0) || "U"}
          </div>
          <h3>{user?.displayName}</h3>
          <p>{user?.email}</p>
        </section>
        
        <nav className="sidebar-nav">
          <button className={activeTab === "perfil" ? "nav-btn active" : "nav-btn"}
              onClick={() => navigate("/profile/perfil")}>
              👤 Mi Perfil
            </button>
            <button className={activeTab === "config" ? "nav-btn active" : "nav-btn"}
              onClick={() => navigate("/profile/config")}>
              ⚙️ Configuración
            </button>
            <button className={activeTab === "seguridad" ? "nav-btn active" : "nav-btn"}
              onClick={() => navigate("/profile/seguridad")}>
              🔒 Seguridad
          </button>
          <button className={activeTab === "pedidos" ? "nav-btn active" : "nav-btn"}
              onClick={() => navigate("/profile/pedidos")}>
              📦 Pedidos
          </button>
          <button className="logout-sidebar" onClick={handleLogout}>
            🚪 Cerrar Sesión
          </button>
        </nav>
      </aside>

      <section className="profile-content">
        {activeTab === "perfil" && (
          <div className="perfil-section">
            <h2>Información Personal</h2>
            <div className="info-field">
              <label>Nombre completo</label>
              <p>{user?.displayName || "No especificado"}</p>
            </div>
            <div className="info-field">
              <label>Correo electrónico</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-field">
              <label>Miembro desde</label>
              <p>
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : "Nuevo"}
              </p>
            </div>
          </div>
        )}
        
        {activeTab === "config" && (
          <ProfileConfig/>
        )}

        {activeTab==="seguridad" &&(
          <ProfileSecurity/>
        )}

        {activeTab === "pedidos" && (
          <ProfilePedidos/>
        )}
      </section>
    </main>
  );
}