import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "leaflet/dist/leaflet.css";

import ThemeContext from "./context/ThemeContext";
import { useState } from "react";

function Root() {

    const [darkMode, setDarkMode] = useState(false);

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode
            }}
        >
            <App />
        </ThemeContext.Provider>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);