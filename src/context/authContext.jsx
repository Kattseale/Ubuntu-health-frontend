import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getUser,
    isAuthenticated,
    logout as authLogout
} from "../services/authService";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [authenticated, setAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const tokenExists = isAuthenticated();


        if (tokenExists) {

            setAuthenticated(true);

            setUser(getUser());

        }


        setLoading(false);


    }, []);



    const loginUser = (userData) => {

        console.log("AuthContext loginUser:", userData);

        setUser(userData);

        setAuthenticated(true);

    };



    const logout = () => {

        authLogout();

        setUser(null);

        setAuthenticated(false);

    };



    if (loading) {

        return null;

    }



    return (

        <AuthContext.Provider

            value={{
                user,
                authenticated,
                loginUser,
                logout
            }}

        >

            {children}

        </AuthContext.Provider>

    );

}



export const useAuth = () => {

    return useContext(AuthContext);

};