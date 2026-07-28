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

    const [authenticated, setAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);



    useEffect(() => {


        const tokenExists = isAuthenticated();


        if(tokenExists){

            setAuthenticated(true);

            setUser(getUser());

        }


        setLoading(false);



        const logoutOnExit = () => {

            authLogout();

        };


        window.addEventListener(
            "pagehide",
            logoutOnExit
        );


        return () => {

            window.removeEventListener(
                "pagehide",
                logoutOnExit
            );

        };


    }, []);




    const logout = () => {

        authLogout();

        setAuthenticated(false);

        setUser(null);

    };




    if(loading){

        return <div>Loading...</div>;

    }

    const loginUser = (userData) => {

        setUser(userData);

        setAuthenticated(true);

    };


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




export function useAuth(){

    return useContext(AuthContext);

}