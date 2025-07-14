import { createContext, useState, useContext } from "react";

//Crear el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);


    const login = (username) => {
        // simulando la creación de un token (en una api real, esto sería generado por un servidor)
        const token = `fake-token-${username}`;
        if (username == "admin@gmail.com") {
            setAdmin(true);
        }
        localStorage.setItem('authToken', token);
        setUser(username);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setAdmin(false);
    };

    function verificacionLog() {
        const userToken = localStorage.getItem("authToken")
        if (userToken && userToken=="fake-token-admin@gmail.com") {
            setAdmin(true)
            return
        } if (userToken) {
            setUser(userToken)
        }
    }

    return (
        <AuthContext.Provider value={{user, login, logout, admin, verificacionLog}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);