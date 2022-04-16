import React, {useEffect} from "react";
import Header from "./header/Header";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import {RootState, useTypeDispatch} from "../../store/store";
import {getName} from "../../store/web-slices/profile_slice";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const MainWindow : React.FC = () => {
    const dispatch = useTypeDispatch();
    let navigate = useNavigate();
    const {isAuth} = useSelector((state: RootState) => state.profileReducer);

    useEffect(() => {
        dispatch(getName());

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