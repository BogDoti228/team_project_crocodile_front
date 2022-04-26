import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {postGameProcessInfo} from "../../../../../store/web-slices/game_process_slice";
import {
    postPreStartInfo,
    PreStartInfoType,
    setCurrentStartUser
} from "../../../../../store/web-slices/select_slice";
import styles from "./gameResultPanel.module.scss"
import {NICK_IN_STORAGE} from "../../../../../constans";

const GameResultPanel : React.FC = () => {
    const {gameState,currentWord, scoreAddUser} = useSelector((state : RootState) => state.gameProcessReducer)
    const {currentStartUser, currentTimer, currentEndScore} = useSelector((state : RootState) => state.selectReducer)
    const [cssOpacity, setCssOpacity] = useState<React.CSSProperties>({opacity: 1})
    const {usersList} = useSelector((state : RootState) => state.usersListReducer)
    const dispatch = useTypeDispatch();

    const [showForDrawingUser, setShowForDrawingUser] = useState(false);
    const [showForGuessedUser, setShowForGuessed] = useState(false);
    const [isWordGuessed, setIsWordGuessed] = useState(false)

    useEffect(() => {
        setShowForDrawingUser(currentStartUser === sessionStorage.getItem(NICK_IN_STORAGE))
        setShowForGuessed(scoreAddUser.userGuessed === sessionStorage.getItem(NICK_IN_STORAGE))
        setIsWordGuessed(scoreAddUser.userGuessed !== "")

    }, [gameState]);

    const onGameContinue = async () => {
        setCssOpacity({opacity: 0})

        const nextUser = getNextUser()

        const preStartInfo : PreStartInfoType = {
            currentTimer : currentTimer,
            currentStartUser: nextUser,
            currentEndScore: currentEndScore
        }

        await dispatch(postPreStartInfo(preStartInfo))
        await dispatch(postGameProcessInfo('during'))
    }

    const getNextUser = () => {
        const index = usersList.map(x => x.name).indexOf(currentStartUser)
        const nextUser = usersList[(index + 1) % usersList.length].name
        dispatch(setCurrentStartUser(nextUser))
        return nextUser
    }

    return (
        <>
            {showForDrawingUser &&
            <div className={styles.boxWrapPanelResult} style={cssOpacity}>
                {isWordGuessed && <p className={styles.text}>Вы смогли нарисовать слово</p>}
                {isWordGuessed && <p className={styles.text}>Вы получаете 2 очка</p>}
                {!isWordGuessed && <p className={styles.text}>Вы не смогли нарисовать слово</p>}
                {!isWordGuessed && <p className={styles.text}>Вы получаете 0 очков</p>}
                <button className={styles.button} onClick={onGameContinue}>Передать ход</button>
            </div>
            }

            {showForGuessedUser &&
            <div className={styles.boxWrapPanelResult} style={cssOpacity}>
                <p className={styles.text}>Загаданное слово: {currentWord}</p>
                <p className={styles.text}>Вы смогли угадать слово</p>
                <p className={styles.text}>Вы получаете 1 очко</p>
                <p className={styles.text}>Ожидайте когда ведущий передаст ход</p>
            </div>
            }

            {!showForDrawingUser && !showForGuessedUser &&
            <div className={styles.boxWrapPanelResult} style={cssOpacity}>
                <p className={styles.text}>Загаданное слово: {currentWord}</p>
                {!isWordGuessed && <p className={styles.text}>Никто не угадал слово в этом раунде</p>}
                {isWordGuessed && <p className={styles.text}>Слово угадал: {scoreAddUser.userGuessed}</p>}
                <p className={styles.text}>Ожидайте когда ведущий передаст ход</p>
            </div>
            }
        </>
    )
}

export default GameResultPanel;