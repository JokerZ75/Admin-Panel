import React from "react";

const Test = () => {
    const [theme, setTheme] = React.useState(false);

    React.useEffect(() => {
        if (theme) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [theme]);

    return (
        <div>
            <h1 className="Test">Test Page</h1>
            <button onClick={() => setTheme(!theme)}>Toggle Theme</button>
        </div>
    );
};

export default Test;