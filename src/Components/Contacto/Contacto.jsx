import { Col, Row } from "react-bootstrap";
import "./Contacto.css"

function Contacto () {
    return (
        <div className="contacto">
            <div className="container text-center w-50 p-2 bg-primary-subtle shadow">
                <div className="row">
                    <h3 className="mb-3">Formulario de Contacto</h3>
                </div>
                <div className="col-6 col-sm-3 w-100 shadow">
                    <input type="text" className="form-control mb-3" placeholder="Nombre"/>
                </div>
                <div className="col-6 col-sm-3 w-100 shadow">
                    <input type="textarea" className="form-control mb-3" placeholder="Mensaje"/>
                </div>
                <div className="col-6 col-sm-3 w-100 shadow">
                    <input type="email" className="form-control mb-3" placeholder="Correo Electrónico"/>
                </div>
                <div className="row justify-content-center shadow">
                    <div className="col-6 col-sm-3 w-50">
                        <button className="btn btn-success w-75">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacto;