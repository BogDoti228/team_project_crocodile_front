import React, {useEffect, useState} from "react";
import Header from "./header/Header";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import {RootState} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import style from "./mainWindow.module.scss";
import Statistics from "./content/statistics/Statistics";

const MainWindow : React.FC = () => {
    let navigate = useNavigate();
    const {isAuth} = useSelector((state: RootState) => state.profileReducer);
    const [gameStateStyle, setGameStateStyle] = useState(style.general)
    const {gameState} = useSelector((state : RootState) => state.gameProcessReducer)

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    },[])

    useEffect(() => {
        if (gameState === "end") {
            setGameStateStyle(style.general + " " + style.blur)
        }
        else {
            setGameStateStyle(style.general)
        }
    }, [gameState])


    return (
        <>
            <div className={gameStateStyle}>
                <Header />
                <Content />
                <Footer/>
            </div>
            {gameState === "end" && <Statistics/>}
        </>
    )
}

export default MainWindow