import React from "react";
import styles from "./timer.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";

const Timer : React.FC = () => {
    const {currentTimer} = useSelector((state : RootState) => state.selectReducer)
    return (
        <div className={styles.timer_window}>
            <span className={styles.time}>{currentTimer}</span>
        </div>
    )
}

export default Timer;