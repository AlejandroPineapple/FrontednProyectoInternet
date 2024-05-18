import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer className="bg-dark text-white my-5" id="contacto">
            <div className="container">
                <div className="row py-5 justify-content-center">
                    <div className="col-lg-8 col-md-10 mb-4 mb-lg-0">
                        <h3>Hecho por Alejandro Piña</h3>
                        <p>Soy un estudiante de ingeniería en tecnologías en la Mayab e hice esta página en múltiples noches a las 3 de la mañana impulsado por Monster. Espero la hayas disfrutado.</p>
                        <div className=" justify-content-between align-items-center mt-4">
                            <p className="mb-0">Sígueme en Instagram</p>
                            <a href="https://www.instagram.com/alex_pina_man/" target="_blank" rel="noopener noreferrer" title="Instagram">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/480px-Instagram_icon.png" alt="Instagram" style={{ width: '30px', height: '30px' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <Link to="/" className="btn btn-secondary">Volver al Inicio</Link>
            </div>
            <div>;)</div>
        </footer>
    );
}

export default Footer;