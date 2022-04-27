import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../store/store";
import {
    setCurrentEndScore,
    setCurrentStartUser,
    setCurrentTimer
} from "../../../store/web-slices/select_slice";
import CustomSelect from "../../utils/customSelect/CustomSelect";
import styles from "./settings.module.scss"
import {setSettingsShow} from "../../../store/web-slices/list_users_slice";
import {postGameProcessInfo} from "../../../store/web-slices/game_process_slice";

const Settings : React.FC = () => {
    const {usersList, timeList, scoreList} = useSelector((state : RootState) => state.usersListReducer)
    const {currentStartUser, currentTimer, currentEndScore} = useSelector((state : RootState) => state.selectReducer)
    const [cssOpacity, setCssOpacity] = useState<React.CSSProperties>({opacity: 0})

    useEffect(() => {
        setCssOpacity({opacity: 1})
    }, [])

    const dispatch = useTypeDispatch()

    const onChangeValueUser = (e : React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCurrentStartUser(e.target.value))
    }

    const onChangeValueTimer = (e : React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCurrentTimer(e.target.value))
    }

    const onChangeValueScore = (e : React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCurrentEndScore(e.target.value))
    }

    const onClose = () => {
        setCssOpacity({opacity: 0})
        setTimeout(() => {
            dispatch(setSettingsShow(false))
        }, 1000)
    }

    const handleStart = () => {
        setCssOpacity({opacity: 0})
        setTimeout(() => {
            dispatch(setSettingsShow(false))
        }, 1000)
        dispatch(postGameProcessInfo('during'))
    }


    return (
        <ul className={styles.settings_wrap_panel} style={cssOpacity}>
            <li className={styles.li_block}>
                <p className={styles.text}>
                    Выбрать кто начинает игру:
                </p>
                <CustomSelect isSelected={value => value === currentStartUser} name={"userChoose"} options={usersList.map(x => x.name)} onChangeValue={onChangeValueUser}/>
            </li>
            <li className={styles.li_block}>
                <p className={styles.text}>
                    Выбрать время раунда:
                </p>
                <CustomSelect isSelected={value => value === currentTimer} name={"timeChoose"} options={timeList} onChangeValue={onChangeValueTimer}/>
            </li>
            <li className={styles.li_block}>
                <p className={styles.text}>
                    Выбрать победное количество очков:
                </p>
                <CustomSelect isSelected={value => value === currentEndScore} name={"scoreChoose"} options={scoreList} onChangeValue={onChangeValueScore}/>
            </li>
            <li className={styles.li_block}>
                <button className={styles.button} onClick={onClose}>Вернуться</button>
                <button className={styles.button} onClick={handleStart}>Начать</button>

            </li>
        </ul>
    )
}

export default Settings