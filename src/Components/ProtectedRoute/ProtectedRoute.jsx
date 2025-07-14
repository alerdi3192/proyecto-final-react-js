import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";


function ProtectedRoute ( {children}) {
    const {user} = useAuthContext();
    if (!user) {
        return <Navigate to="/home" />;
    }
    return children;
}

export default ProtectedRoute;