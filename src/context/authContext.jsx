import { createContext, useContext, useEffect, useState } from "react";

import {
    getUser,
    isAuthenticated,
    logout as authLogout
} from "../services/authService";


const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {

        const checkAuth = () => {

            if (isAuthenticated()) {

                setAuthenticated(true);
                setUser(getUser());

            }

        };


        checkAuth();

    }, []);



    const logout = () => {

        authLogout();

        setAuthenticated(false);

        setUser(null);

    };


    return (

        <AuthContext.Provider
            value={{
                user,
                authenticated,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


export const useAuth = () => useContext(AuthContext);