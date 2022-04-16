import React, {useEffect, useState} from "react";
import styles from "./timer.module.scss"
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../../store/store";
import {getPreStartInfo} from "../../../../../../store/web-slices/select_slice";

const Timer : React.FC = () => {
    const {currentTimer} = useSelector((state : RootState) => state.selectReducer)
    const {isGameStarted, timerTick} = useSelector((state : RootState) => state.gameProcessReducer)
    const [currentValue, setCurrentValue] = useState("")

    useEffect(() => {
        if (isGameStarted) {
            setCurrentValue(timerTick)
        }
        else {
            setCurrentValue(currentTimer)
        }
    },[isGameStarted, currentTimer, timerTick])

    return (
        <div className={styles.timer_window}>
            <span className={styles.time}>{currentValue}</span>
        </div>
    )
}

export default Timer;