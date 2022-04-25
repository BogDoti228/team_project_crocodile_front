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

const Settings : React.FC = () => {
    const {usersList, timeList, scoreList} = useSelector((state : RootState) => state.usersListReducer)

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
        dispatch(setSettingsShow(false))
    }

    return (
        <ul className={styles.settings_wrap_panel}>
            <li className={styles.li_block}>
                <p className={styles.text}>
                    Выбрать пользователя, начинающего игру:
                </p>
                <CustomSelect name={"userChoose"} options={usersList.map(x => x.name)} onChangeValue={onChangeValueUser}/>
            </li>
            <li className={styles.li_block}>
                <p className={styles.text}>
                    Выбрать время раунда:
                </p>
                <CustomSelect name={"timeChoose"} options={timeList} onChangeValue={onChangeValueTimer}/>
            </li>
            <li className={styles.li_block}>
                <p className={styles.text}>
                    Выбрать победное количество очков:
                </p>
                <CustomSelect name={"scoreChoose"} options={scoreList} onChangeValue={onChangeValueScore}/>
            </li>
            <li>
                <button className={styles.button} onClick={onClose}>Вернуться</button>
            </li>
        </ul>
    )
}

export default Settings