import React, {useEffect} from "react";
import DrawTable from "./drawTable/DrawTable";
import Interactive from "./interactive/Interactive";
import style from './content.module.scss';
import {getGameProcessInfo} from "../../../store/web-slices/game_process_slice";
import {useTypeDispatch} from "../../../store/store";

const Content : React.FC = () => {
    const dispatch = useTypeDispatch();

    useEffect(() => {
        dispatch(getGameProcessInfo())

        const idInterval = setInterval(() => {
            dispatch(getGameProcessInfo())
        }, 1000)

        return () => {
            clearInterval(idInterval)
        }
    },[])


    return (
        <main className={style.content}>
            <DrawTable/>
            <Interactive/>
        </main>
    )
}

export default Content