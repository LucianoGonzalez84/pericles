import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons' 

// Estilos
import "./footer.css";

function Footer() {
    return (
        <div className='footer'>
            <div className='footer__copyright'>
                <p>©<span>2022</span>Pericles</p>
            </div>
            <div className='footer__logo'>
                <Link to='/'>
                    <img src="./img/logo.png" alt="logo" />
                </Link>
                <div>
                    <p>Local: Avda. 7 N° 1423 - La Plata</p>
                    <p>Whatsapp: 221-1234567 </p>
                    <p>Contacto: ventaonline@pericles.com.ar</p>
                    <p>Horario: Lunes a Sábado de 11 a 20hs</p>
                </div>
            </div>
            <div className="footer__redes">
                <div>
                    <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebookF} /></a>
                    <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="https://web.whatsapp.com/"><FontAwesomeIcon icon={faWhatsapp} /></a>
                </div>                
            </div> 
        </div>
    )
}

export default Footer

    