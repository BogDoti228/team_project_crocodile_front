import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import styles from "./score.module.scss"


const Score : React.FC = () => {
    const {currentEndScore} = useSelector((state : RootState) => state.selectReducer)

    return (
        <div className={styles.score_window} title={"Количество очков для победы"}>
            <span className={styles.score}>{currentEndScore}</span>
        </div>
    )
}

export default Score