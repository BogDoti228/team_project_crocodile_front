import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {postGameProcessInfo} from "../../../../../store/web-slices/game_process_slice";
import {NICK_IN_STORAGE} from "../../../../enterWindow/Enter";
import {
    postPreStartInfo,
    PreStartInfoType,
    setCurrentStartUser
} from "../../../../../store/web-slices/select_slice";
import styles from "./gameResultPanel.module.scss"

const GameResultPanel : React.FC = () => {
    const {gameState,currentWord} = useSelector((state : RootState) => state.gameProcessReducer)
    const {currentStartUser, currentTimer} = useSelector((state : RootState) => state.selectReducer)
    const {usersList} = useSelector((state : RootState) => state.usersListReducer)
    const dispatch = useTypeDispatch();

    const [showForDrawingUser, setShowForDrawingUser] = useState(false);

    useEffect(() => {
        setShowForDrawingUser(currentStartUser === sessionStorage.getItem(NICK_IN_STORAGE))
    }, [gameState]);

    const onGameContinue = async () => {
        const nextUser = getNextUser()

        const preStartInfo : PreStartInfoType = {
            currentTimer : currentTimer,
            currentStartUser: nextUser
        }

        await dispatch(postPreStartInfo(preStartInfo))
        await dispatch(postGameProcessInfo('during'))
    }

    const getNextUser = () => {
        const index = usersList.indexOf(currentStartUser)
        const nextUser = usersList[(index + 1) % usersList.length]
        dispatch(setCurrentStartUser(nextUser))
        return nextUser
    }

    return (
        <>
            {gameState === 'betweenRound' && showForDrawingUser &&
            <div className={styles.boxWrapPanelResult}>
                <p className={styles.text}>Вы не смогли нарисовать слово</p>
                <p className={styles.text}>Вы получаете 0 очков</p>
                <button className={styles.button} onClick={onGameContinue}>Передать ход</button>
            </div>
            }

            {gameState === 'betweenRound' && !showForDrawingUser &&
            <div className={styles.boxWrapPanelResult}>
                <p className={styles.text}>Загаданное слово: {currentWord}</p>
                <p className={styles.text}>Ожидайте когда ведущий передаст ход</p>
            </div>
            }
        </>
    )
}

export default GameResultPanel;