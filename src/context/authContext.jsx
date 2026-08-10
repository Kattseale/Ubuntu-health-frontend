import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getUser,
    logout as authLogout,
    isAuthenticated
} from "../services/authService";


const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [authenticated, setAuthenticated] =
        useState(false);

    const [loading, setLoading] =
        useState(true);


    // =========================================
    // RESTORE LOGIN SESSION
    // =========================================

    useEffect(() => {

        try {

            const tokenExists =
                isAuthenticated();

            if (tokenExists) {

                setAuthenticated(true);

                setUser(getUser());

            } else {

                setAuthenticated(false);

                setUser(null);

            }

        } catch (error) {

            console.error(
                "Unable to restore authentication:",
                error
            );

            setAuthenticated(false);

            setUser(null);

        } finally {

            setLoading(false);

        }

    }, []);


    // =========================================
    // LOGIN
    // =========================================

    const loginUser = (userData) => {

        setUser(userData);

        setAuthenticated(true);

    };


    // =========================================
    // LOGOUT
    // =========================================

    const logout = () => {

        authLogout();

        setAuthenticated(false);

        setUser(null);

    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (
            <div>
                Loading...
            </div>
        );

    }


    // =========================================
    // PROVIDER
    // =========================================

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


// =========================================
// USE AUTH
// =========================================

export function useAuth() {

    return useContext(AuthContext);

}
