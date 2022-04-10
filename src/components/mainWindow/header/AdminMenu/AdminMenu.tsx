import React, {SetStateAction, useEffect, useRef, useState} from "react";
import styles from "./adminMenu.module.scss"
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../store/store";
import CustomSelect from "../../../utils/customSelect/CustomSelect";
import {generateNewWord, setCurrentStartUser, setCurrentTimer} from "../../../../store/web-slices/select_slice";

const AdminMenu : React.FC = () => {
    const {usersList, timeList} = useSelector((state : RootState) => state.usersListReducer)
    const [user, setUser] = useState(usersList[0])
    const [time, setTime] = useState("")

    const dispatch = useTypeDispatch()

    useEffect(()=> {
        dispatch(setCurrentStartUser(usersList[0]))
        dispatch(setCurrentTimer(timeList[0]))
    },[])

    const onChangeValueUser = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setUser(e.target.value)
        dispatch(setCurrentStartUser(e.target.value))
    }

    const onChangeValueTimer = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setTime(e.target.value)
        dispatch(setCurrentTimer(e.target.value))
    }

    const onStart = () => {
        console.log(user)
        console.log(time)
        dispatch(generateNewWord())
    }

    return (
        <ul className={styles.menuBar}>
            <li>
                <CustomSelect name={"userChoose"} options={usersList} onChangeValue={onChangeValueUser}/>
            </li>
            <li>
                <CustomSelect name={"timeChoose"} options={timeList} onChangeValue={onChangeValueTimer}/>
            </li>
            <li className={styles.play} onMouseUp={onStart}/>
        </ul>
    )
}

export default AdminMenu;