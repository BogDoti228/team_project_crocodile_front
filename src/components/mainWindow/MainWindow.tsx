import React, {useEffect} from "react";
import Header from "./header/Header";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import {RootState} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const MainWindow : React.FC = () => {
    let navigate = useNavigate();
    const {isAuth} = useSelector((state: RootState) => state.profileReducer);

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    },[])


    return (
        <>
            <Header />
            <Content />
            <Footer/>
        </>
    )
}

export default MainWindow