import { Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Inicio.css"

function Inicio () {

    return (
        <>
        <div className="inicio">   
            <main className="main-inicio">
                <h3>BIENVENIDOS</h3>
                <div className="logo">
                    <h2>ALERDI<span>ecom</span></h2>
                </div>
            </main>
            <section className="section-inicio">
                <Link to='/home' className="link-inicio">PRODUCTOS</Link>                
            </section>
            <footer className="footer-inicio">
                <p>&copy; 2025 - Mi aplicación React</p>
            </footer>
        </div>
        </>
    );
}

export default Inicio;