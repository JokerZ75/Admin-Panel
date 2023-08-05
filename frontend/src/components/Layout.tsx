import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
    children: ReactNode;
}

const Layout:FC<Props> = ({children}) => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    );
};

export default Layout;