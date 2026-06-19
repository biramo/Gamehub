import emailjs from '@emailjs/browser';

// Configuración - obtén estos valores de tu cuenta de EmailJS
const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID; // ← Reemplaza con tu Service ID
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID; // ← Reemplaza con tu Template ID
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY; // ← Reemplaza con tu Public Key

// Inicializa EmailJS con tu Public Key
emailjs.init(PUBLIC_KEY);

/**
 * Envía un correo de confirmación de pedido
 * @param {Object} datos - Datos del pedido
 * @param {string} datos.email - Email del usuario
 * @param {string} datos.nombre - Nombre del usuario
 * @param {Array} datos.productos - Lista de productos del carrito
 * @param {number} datos.totalUnidades - Total de unidades
 * @param {number} datos.totalPrecio - Total del pedido
 * @param {number} datos.numeroPedido - Número de pedido
 */
export const enviarEmailConfirmacion = async (datos) => {
  try {
    const templateParams = {
      email_usuario: datos.email,
      nombre_usuario: datos.nombre || 'Usuario',
      numero_pedido: datos.numeroPedido,
      productos: datos.productos,
      total_unidades: datos.totalUnidades,
      total_precio: datos.totalPrecio,
      fecha: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { success: false, error };
  }
};

/**
 * Envía un correo de contacto
 * @param {Object} datos - Datos del formulario de contacto
 */
export const enviarEmailContacto = async (datos) => {
  // Configura otro template para contacto si lo necesitas
  const CONTACT_TEMPLATE_ID = 'template_contacto_xxxxxx';
  
  const templateParams = {
    nombre: datos.nombre,
    email: datos.email,
    mensaje: datos.mensaje,
    asunto: datos.asunto || 'Consulta desde GameVault'
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      templateParams
    );
    return { success: true, response };
  } catch (error) {
    console.error('Error al enviar email de contacto:', error);
    return { success: false, error };
  }
};

// Para uso en componentes
export default emailjs;