import "./Admin.css"
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";


function Admin () {

    const {admin} = useAuthContext();

    if (!admin) {
        return (
            <Navigate to="/login" replace />
        );
    }

    return ( 
        <div className="admin">
            <div className="admin-main">
                <p>Componente Admin</p>
            </div>
        </div>
    )

}

export default Admin;