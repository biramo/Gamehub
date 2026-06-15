/**
 * Traduce códigos de error de Firebase Auth a mensajes amigables.
 * @param {Object} error - El objeto de error devuelto por Firebase.
 * @returns {string} Mensaje personalizado para el usuario.
 */
export function getAuthErrorMessage(error) { 
    const errorCode = error?.code || '';
    
    const errorMessages = {
      'auth/invalid-email': 'El formato del correo electrónico no es válido.',
      'auth/user-not-found': 'Este correo electrónico no está registrado.',
      'auth/wrong-password': 'La contraseña es incorrecta.',
      'auth/invalid-credential': 'El correo o la contraseña son incorrectos.',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Cuenta bloqueada temporalmente.',
      'auth/email-already-in-use': 'Este correo electrónico ya está registrado.'
    };
    
    if (errorMessages[errorCode]) {
      return errorMessages[errorCode];
    }
    
    // Log para errores no contemplados
    console.error('Error de Firebase no mapeado:', errorCode, error?.message);
    return 'Ocurrió un error inesperado. Inténtalo de nuevo.';
}