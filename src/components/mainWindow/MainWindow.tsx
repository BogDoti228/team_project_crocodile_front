import React, {useEffect, useState} from "react";
import Header from "./header/Header";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import {RootState, useTypeDispatch} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {ROOM_ID_IN_STORAGE} from "../../store/web-slices/chat_slice";
import {useParams} from "react-router-dom";
import {setAuth} from "../../store/web-slices/profile_slice";
import style from "./mainWindow.module.scss";
import Statistics from "./content/statistics/Statistics";



const MainWindow : React.FC = () => {
    let navigate = useNavigate();
    const {isAuth} = useSelector((state: RootState) => state.profileReducer);
    const params = useParams();
    const dispatch = useTypeDispatch();
    const [gameStateStyle, setGameStateStyle] = useState(style.general)
    const {gameState} = useSelector((state : RootState) => state.gameProcessReducer)

    useEffect(() => {
        if (!isAuth) {
            if (params.roomId){
                sessionStorage.setItem(ROOM_ID_IN_STORAGE, params.roomId);
                dispatch(setAuth(true));
                navigate('/enter');
            }else{
                navigate('/');
            }
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