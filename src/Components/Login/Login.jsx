import "./Login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import { crearUsuario, loginEmailPass } from "../Auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Admin from "../Admin/Admin";
import { Col } from "react-bootstrap";
import { SwalBasico } from "../../assets/SweetAlert";


function Login () {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const {login, user, logout, admin} = useAuthContext ();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de autenticación
        if (usuario === 'admin' && password === '1234') {
            login(usuario);
            navigate('/home');
        } else {
            SwalBasico('Login', 'Credenciales Incorrectas', 'error', 'Cerrar');
        }
    };

    function registrarUsuario (e) {
        e.preventDefault();
        crearUsuario(usuario, password)
        .then((user) => {
            login(usuario)
            SwalBasico('Registro', 'Registro Exitoso', 'success', 'Cerrar');
        }).catch((error) => {
            if(error.code == "auth/email-already-in-use") {
                SwalBasico('Registro', 'email en uso', 'error', 'Cerrar');
            } 
            if(error.code == "auth/weak-password") {
                SwalBasico('Registro', 'Contraseña débil', 'error', 'Cerrar');
            }
            if(error.code == "auth/invalid-email") {
                SwalBasico('Registro', 'email inválido', 'error', 'Cerrar');
            }
        })
    }

    const handleSubmit2 = (e) => {
        logout()
    }

    function iniciarSesionEmailPass(e) {
        e.preventDefault();
        loginEmailPass(usuario, password)
        .then((user) => {
            login(usuario)
            SwalBasico('Login', 'Logueo Exitoso', 'success','Cerrar')
        }).catch((error) => {
            SwalBasico('Login', 'Credenciales inválidas', 'error','Cerrar')
        })
    }
    
    function handleShow (e) {
        e.preventDefault();
        setShow(!show)
    }

    if (user || admin) {
        return (
            <div className="login">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center bg-primary-subtle w-100 my-5 p-3">
                            <form className="w-100 p-2 border round shadow" onSubmit={handleSubmit2}>
                                <button className="btn btn-primary w-100" type="submit">Cerrar Sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    } if (!user && show) {
        return (
            <div className="login">
                <div className="row justify-content-center w-100">
                    <div className="col-12 col-md-9 col-lg-6">
                        <div className="d-flex justify-content-center bg-primary-subtle w-100">
                            <form className="w-100 p-4 border round shadow" onSubmit = {iniciarSesionEmailPass}>
                                <div className="d-flex f-grow justify-content-center bg-primary-subtle w-100">
                                    <h3>Iniciar sesión con email y pass</h3>
                                </div>
                                <div className="d-flex justify-content-center m-2 w-100">
                                    <label className="form-label w-25">Email: </label>
                                    <input className="w-50" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                                </div>

                                <div className="d-flex justify-content-center m-2 w-100">
                                    <label className="form-label w-25">Contraseña:</label>
                                    <input className="w-50" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-center m-2">
                                    <button className="btn btn-primary w-50" type="submit">Iniciar Sesión</button>
                                </div>

                                <div className="d-flex justify-content-center m-2">
                                    <button className="btn btn-primary w-50" onClick={handleShow}>Registrarse</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    } if (!user && !show) {
        return (
            <div className="login">

            <div className="d-flex justify-content-center bg-primary-subtle w-50 my-5 mx-3">
                <form className="w-100 p-4 border round shadow" onSubmit = {registrarUsuario}>
                    <div className="d-flex justify-content-center bg-primary-subtle">
                        <h2>Registrarse</h2>
                    </div>
                    <div className="d-flex justify-content-center m-2 w-100">
                        <label className="form-label w-25">Email:</label>
                        <input className="w-100" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center m-2 w-100">
                        <label className="form-label w-25">Contraseña:</label>
                        <input className="w-100" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center m-2">
                        <button className="btn btn-primary w-10" type="submit">Registrarse</button>
                    </div>
                    <div className="d-flex justify-content-center m-2">
                        <button className="btn btn-primary w-10" onClick={handleShow}>Iniciar Sesión</button>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

export default Login;