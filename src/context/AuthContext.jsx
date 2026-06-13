// Importamos hooks de React
import { createContext, useContext, useEffect, useState } from "react";

// Importamos la instancia de Firebase Auth configurada en firebase.js
import { auth } from "../firebase/config";

//Verificacion con google
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Importamos funciones de Firebase Authentication
import {
  onAuthStateChanged,              // Escucha cambios de sesión
  signInWithEmailAndPassword,      // Login
  createUserWithEmailAndPassword,  // Registro
  signOut                          // Logout
} from "firebase/auth";


// Creamos un contexto global.
// Aquí guardaremos información del usuario autenticado.
export const AuthContext = createContext();

// Componente Provider.
// Va a envolver toda la aplicación.
export function AuthProvider({ children }) {

  // Estado para guardar el usuario actual.
  // Al principio no sabemos quién es, por eso null.
  const [user, setUser] = useState(null);

  // Estado para saber si Firebase está comprobando la sesión.
  const [loading, setLoading] = useState(true);



  // Se ejecuta una sola vez cuando se monta el componente.
  useEffect(() => {

    // Firebase empieza a escuchar cambios de autenticación.
    // Devuelve una función para dejar de escuchar.
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        // currentUser será:
        // - un objeto usuario si está logueado
        // - null si no hay sesión

        setUser(currentUser);

        // Ya terminó la comprobación inicial
        setLoading(false);
      }
    );

    // Cleanup.
    // Cuando este componente desaparezca,
    // dejamos de escuchar cambios.
    return () => unsubscribe();

  }, []); // [] => solo una vez al montar



  // Función login.
  // Recibe email y contraseña.
  const login = (email, password) =>

    // Firebase intenta autenticar al usuario.
    signInWithEmailAndPassword(
      auth,
      email,
      password
    );



  // Función registro.
  const register = (email, password) =>

    // Firebase crea un usuario nuevo.
    createUserWithEmailAndPassword(
      auth,
      email,
      password
    );



  // Función logout.
  const logout = () =>

    // Firebase cierra la sesión actual.
    signOut(auth);

  const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
  };

  // Compartimos estos valores con toda la aplicación.
  return (
    //Todo lo que devuelve useAuth()
    <AuthContext.Provider
      value={{
        user,       // usuario actual
        login,      // función login
        register,   // función registro
        logout,     // función logout
        loginWithGoogle, //funcion login google
        loading     // estado de carga
      }}
    >

      {/* 
        Mientras Firebase comprueba la sesión
        NO mostramos la aplicación.

        Cuando loading = false
        sí mostramos children.
      */}
      {!loading && children}

    </AuthContext.Provider>
  );
}
