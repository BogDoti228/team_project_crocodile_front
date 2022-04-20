import React, {useEffect, useState} from "react";
import styles from "./boxWord.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/store";
import {NICK_IN_STORAGE} from "../../../../../enterWindow/Enter";

const BoxWord : React.FC = () => {
    const {statusWord, isGameStarted, currentWord} = useSelector((state : RootState) => state.gameProcessReducer)
    const {currentStartUser} = useSelector((state : RootState) => state.selectReducer)
    const [currentValue, setCurrentValue] = useState("")

    useEffect(() => {
        if (isGameStarted) {
            console.log(`startUser: ${currentStartUser} name: ${sessionStorage.getItem(NICK_IN_STORAGE)}`)
            if (currentStartUser === sessionStorage.getItem(NICK_IN_STORAGE)) {
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