import React, {useEffect} from "react";
import DrawTable from "./drawTable/DrawTable";
import Interactive from "./interactive/Interactive";
import style from './content.module.scss';
import {getGameProcessInfo} from "../../../store/web-slices/game_process_slice";
import {RootState, useTypeDispatch} from "../../../store/store";
import {getPreStartInfo} from "../../../store/web-slices/select_slice";
import {useSelector} from "react-redux";

const Content : React.FC = () => {
    const {isAdmin} = useSelector((state : RootState) => state.roleReducer)
    const dispatch = useTypeDispatch();

    useEffect(() => {
        dispatch(getGameProcessInfo())
        if (!isAdmin) {
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
        <main className={style.content}>
            <DrawTable/>
            <Interactive/>
        </main>
    )
}

export default Content