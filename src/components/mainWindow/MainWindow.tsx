import React, {useEffect} from "react";
import Header from "./header/Header";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import {useTypeDispatch} from "../../store/store";
import {getName} from "../../store/web-slices/profile_slice";

const MainWindow : React.FC = () => {
    const dispatch = useTypeDispatch();

    /*useEffect(() => {
        dispatch(getName())
    }, [])*/

    return (
        <>
            <Header />
            <Content />
            <Footer/>
        </>
    )
}

export default MainWindow