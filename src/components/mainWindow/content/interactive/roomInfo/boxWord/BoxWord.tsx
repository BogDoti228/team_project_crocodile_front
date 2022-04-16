import React, {useEffect, useState} from "react";
import styles from "./boxWord.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";

const BoxWord : React.FC = () => {
    const {statusWord, isGameStarted, currentWord} = useSelector((state : RootState) => state.gameProcessReducer)
    const {currentStartUser} = useSelector((state : RootState) => state.selectReducer)
    const [currentValue, setCurrentValue] = useState("")

    useEffect(() => {
        if (isGameStarted) {
            if (currentStartUser === localStorage.getItem("name")) {
                setCurrentValue(currentWord)
            }
            else {
                setCurrentValue(statusWord)
            }
        }
        else {
            setCurrentValue(statusWord)
        }
    },[isGameStarted])

    return (
        <div className={styles.box_word_window}>
            <span className={styles.word}>{currentValue}</span>
        </div>
    )
}

export default BoxWord;