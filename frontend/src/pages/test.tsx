import React from "react";
import { useDarkMode } from "../lib/context/darkModeContext";

const Test = () => {

    const { setDarkMode,darkMode } = useDarkMode();

    return (
        <div>
            <h1 className="Test">Test Page</h1>
            <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
        </div>
    );
};

export default Test;