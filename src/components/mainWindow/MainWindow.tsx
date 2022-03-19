import React from "react";
import Header from "./header/Header";
import Content from "./content/Content";
import Footer from "./footer/Footer";

interface MainWindowProps {
    name : string
}

const MainWindow : React.FC<MainWindowProps> = ({name}) => {
    return (
        <>
            <Header name={name}/>
            <Content name={name}/>
            <Footer/>
        </>
    )
}

export default MainWindow