import React, {useEffect, useState} from "react";
import DrawTable from "./drawTable/DrawTable";
import Interactive from "./interactive/Interactive";
import style from './content.module.scss';
import {getGameProcessInfo} from "../../../store/web-slices/game_process_slice";
import {RootState, useTypeDispatch} from "../../../store/store";
import {getPreStartInfo} from "../../../store/web-slices/select_slice";
import {useSelector} from "react-redux";
import {NICK_IN_STORAGE} from "../../../constans";

const Content : React.FC = () => {
    const {currentAdmin} = useSelector((state : RootState) => state.selectReducer)


    const dispatch = useTypeDispatch();

    useEffect(() => {
        dispatch(getGameProcessInfo())
        if (currentAdmin !== sessionStorage.getItem(NICK_IN_STORAGE)) {
            dispatch(getPreStartInfo())
        }

        const idInterval = setInterval(async () => {
            await dispatch(getPreStartInfo())
            await dispatch(getGameProcessInfo())
        }, 1000)

        return () => {
            clearInterval(idInterval)
        }
    },[])


    return (
        <>
            <main className={style.content}>
                <DrawTable/>
                <Interactive/>
            </main>

        </>

    )
}

export default Content