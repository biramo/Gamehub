import { FaDiscord, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../styles/components/Footer.css'

export default function Footer() {
  return (
  <footer className="main-footer">
    <section className="footer-section section-atencion-cliente">
      <h3>Atención al cliente</h3>
      <ul>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/faq">Preguntas frecuentes</Link></li>
        <li><Link to="/soporte">Soporte técnico</Link></li>
        <li><Link to="/devoluciones">Política de devoluciones</Link></li>
      </ul>
    </section>
    <section className="footer-section section-comunidad">
      <h3>Legal</h3>  {/* ← añade título */}
      <ul>
        <li><Link to="/privacidad">Política de privacidad</Link></li>
        <li><Link to="/terminos">Términos y condiciones</Link></li>
        <li><Link to="/cookies">Política de cookies</Link></li>
        <li><Link to="/aviso-legal">Aviso legal</Link></li>
        <li><Link to="/proteccion-datos">Protección de datos</Link></li>
      </ul>
    </section>
    <section className="footer-section section-redes">
      <h3>Síguenos</h3>
      <ul>
        <li><a href="https://discord.com" target="_blank" rel="noreferrer"><FaDiscord /></a></li>
        <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a></li>
        <li><a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a></li>
        <li><a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a></li>
      </ul>
    </section>
    <section className="footer-copyright">
      <p>© 2026 GameVault. Todos los derechos reservados.</p>
    </section>

  </footer>);
}
