import React from "react";
import styles from "./boxWord.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";

const BoxWord : React.FC = () => {
    const {currentWord} = useSelector((state : RootState) => state.selectReducer)

    return (
        <div className={styles.box_word_window}>
            <span className={styles.word}>{currentWord}</span>
        </div>
    )
}

export default BoxWord;