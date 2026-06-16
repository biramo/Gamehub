import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import GoogleIcon from "../assets/icons/GoogleIcon";
import {getAuthErrorMessage} from '../services/authErrorHandler'
import '../styles/pages/Login.css';

export default function Login() {
  const { user, login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [verPassword, setVerPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [compPassword, setCompPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [mensajeReset, setMensajeReset] = useState("");

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        if (compPassword !== password) {
          setError("Las contraseñas no coinciden");
          return;
        }
        const userCredential = await register(email, password);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: nombre });
        }
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(getAuthErrorMessage(err));

    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Escribe tu email primero para recuperar la contraseña");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMensajeReset("Te hemos enviado un email para restablecer tu contraseña");
      setError("");
    } catch {
      setError("No se encontró ninguna cuenta con ese email");
    }
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setEmail("");
    setPassword("");
    setCompPassword("");
    setNombre("");
    setError("");
    setMensajeReset("");
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (

    <main className="main-form-inicio-sesion">
      <form 
      onSubmit={handleSubmit} 
      className="form-inicio-sesion"
      aria-label={isRegistering ? "Formulario de registro" : "Formulario de inicio de sesión"}//Para lector de pantalla
      >
        <h2>{isRegistering ? "Regístrate" : "Iniciar sesión"}</h2>

        {error && <p className="error">{error}</p>}
        {mensajeReset && <p className="success">{mensajeReset}</p>}

        {isRegistering && (
          <input
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={verPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isRegistering && (
          <input
            type={verPassword ? "text" : "password"}
            placeholder="Repite la contraseña"
            value={compPassword}
            onChange={(e) => setCompPassword(e.target.value)}
            required
          />
        )}

        <label className="checkbox-container">
          <input
            className="checkbox-input"
            type="checkbox"
            checked={verPassword}
            onChange={() => setVerPassword(!verPassword)}
          />
          <span className="text-form">Mostrar contraseña</span>
        </label>
        <div className="actions-container">
          <button type="submit" className=" text-form init-sesion-btn">
            {isRegistering ? "Registrarse" : "Entrar"}
          </button>
          {!isRegistering &&(
            <button className="auth-google-btn" type="button" onClick={handleGoogle}>
              Continuar con Google <GoogleIcon/>
            </button>)}

          {!isRegistering && (
            <span className="auth-link text-form" onClick={handleResetPassword}>
              ¿Olvidaste tu contraseña?
            </span>
          )}
        </div>
        <div className="container-auth">
          <span className="text-form"> {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}</span>
          <button type="button" className="auth-button text-form" onClick={switchMode}>
            {isRegistering ? "Inicia sesión" : "Regístrate"}
          </button>
          <button type="button" className="volver-home text-form" onClick={()=>navigate("/")}>
            Seguir sin iniciar sesion
          </button>
        </div>
      </form>
    </main>
  );
}