import React from "react";
import Header from "./header/Header";
import Content from "./content/Content";
import Footer from "./footer/Footer";

const MainWindow : React.FC= () => {
    return (
        <>
            <Header />
            <Content />
            <Footer/>
        </>
    )
}

export default MainWindow