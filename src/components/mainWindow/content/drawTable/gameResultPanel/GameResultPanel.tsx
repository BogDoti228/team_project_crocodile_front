import React from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {GameBooleansType, postGameProcessInfo} from "../../../../../store/web-slices/game_process_slice";
import {NICK_IN_STORAGE} from "../../../../enterWindow/Enter";
import {
    postPreStartInfo,
    PreStartInfoType,
    setCurrentStartUser
} from "../../../../../store/web-slices/select_slice";
import styles from "./gameResultPanel.module.scss"

const GameResultPanel : React.FC = () => {
    const {isGameEnded,currentWord} = useSelector((state : RootState) => state.gameProcessReducer)
    const {currentStartUser, currentTimer} = useSelector((state : RootState) => state.selectReducer)
    const {usersList} = useSelector((state : RootState) => state.usersListReducer)
    const dispatch = useTypeDispatch();

    const onGameContinue = async () => {
        const gameBooleans : GameBooleansType = {
            isGameStarted : true,
            isGameEnded : false
        }

        const nextUser = getNextUser()

        const preStartInfo : PreStartInfoType = {
            currentTimer : currentTimer,
            currentStartUser: nextUser
        }

        await dispatch(postPreStartInfo(preStartInfo))
        await dispatch(postGameProcessInfo(gameBooleans))
    }

    const getNextUser = () => {
        const index = usersList.indexOf(currentStartUser)
        const nextUser = usersList[(index + 1) % usersList.length]
        dispatch(setCurrentStartUser(nextUser))
        return nextUser
    }

    return (
        <>
            {isGameEnded && currentStartUser === sessionStorage.getItem(NICK_IN_STORAGE) &&
            <div className={styles.boxWrapPanelResult}>
                <p className={styles.text}>Вы не смогли нарисовать слово</p>
                <p className={styles.text}>Вы получаете 0 очков</p>
                <button className={styles.button} onClick={onGameContinue}>Передать ход</button>
            </div>
            }

            {isGameEnded && currentStartUser !== sessionStorage.getItem(NICK_IN_STORAGE) &&
            <div className={styles.boxWrapPanelResult}>
                <p className={styles.text}>Загаданное слово: {currentWord}</p>
                <p className={styles.text}>Ожидайте когда ведущий передаст ход</p>
            </div>
            }
        </>
    )
}

export default GameResultPanel;