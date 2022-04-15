import React, {SetStateAction, useEffect, useRef, useState} from "react";
import styles from "./adminMenu.module.scss"
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../store/store";
import CustomSelect from "../../../utils/customSelect/CustomSelect";
import {
    generateNewWord,
    postPreStartInfo, PreStartInfoType,
    setCurrentStartUser,
    setCurrentTimer
} from "../../../../store/web-slices/select_slice";

const AdminMenu : React.FC = () => {
    const {usersList, timeList} = useSelector((state : RootState) => state.usersListReducer)
    const {currentStartUser, currentTimer} = useSelector((state : RootState) => state.selectReducer)
    const [user, setUser] = useState(localStorage.getItem("name"))
    const [time, setTime] = useState(timeList[0])

    const dispatch = useTypeDispatch()

    useEffect(()=> {
        console.log(user + "ON USEFFET")
        dispatch(setCurrentStartUser(user))
        dispatch(setCurrentTimer(time))
    },[])

    useEffect(() => {
        const preStartInfo : PreStartInfoType = {
            currentTimer : currentTimer,
            currentStartUser: currentStartUser
        }

        dispatch(postPreStartInfo(preStartInfo))
    }, [currentStartUser, currentTimer])

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