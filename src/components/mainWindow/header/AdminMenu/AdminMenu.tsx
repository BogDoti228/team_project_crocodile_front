import React, {SetStateAction, useEffect, useRef, useState} from "react";
import styles from "./adminMenu.module.scss"
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../store/store";
import CustomSelect from "../../../utils/customSelect/CustomSelect";
import {
    postPreStartInfo, PreStartInfoType, setCurrentEndScore,
    setCurrentStartUser,
    setCurrentTimer
} from "../../../../store/web-slices/select_slice";
import {GameBooleansType, postGameProcessInfo} from "../../../../store/web-slices/game_process_slice";
import {NICK_IN_STORAGE} from "../../../enterWindow/Enter";

const AdminMenu : React.FC = () => {
    const {usersList, timeList, scoreList} = useSelector((state : RootState) => state.usersListReducer)
    const {currentStartUser, currentTimer, currentEndScore} = useSelector((state : RootState) => state.selectReducer)
    const [user, setUser] = useState(sessionStorage.getItem(NICK_IN_STORAGE))
    const [time, setTime] = useState(timeList[0])
    const [endScore, setEndScore] = useState(scoreList[0])

    const dispatch = useTypeDispatch()

    useEffect(()=> {
        console.log(user + "ON USEFFET")
        dispatch(setCurrentStartUser(user))
        dispatch(setCurrentTimer(time))
        dispatch(setCurrentEndScore(endScore))
    },[])

    useEffect(() => {
        const preStartInfo : PreStartInfoType = {
            currentTimer : currentTimer,
            currentStartUser: currentStartUser,
            currentEndScore: currentEndScore
        }
        console.log(" POST PRE START INFO WITH + " + currentTimer + " " + currentStartUser)
        dispatch(postPreStartInfo(preStartInfo))
    }, [currentStartUser, currentTimer, currentEndScore])

    const onChangeValueUser = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setUser(e.target.value)
        dispatch(setCurrentStartUser(e.target.value))
    }

    const onChangeValueTimer = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setTime(e.target.value)
        dispatch(setCurrentTimer(e.target.value))
    }

    const onChangeValueScore = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setEndScore(e.target.value)
        dispatch(setCurrentEndScore(e.target.value))
    }

    const onStart = () => {
        dispatch(postGameProcessInfo('during'))
    }

    return (
        <ul className={styles.menuBar}>
            <li>
                <CustomSelect name={"userChoose"} options={usersList.map(x => x.name)} onChangeValue={onChangeValueUser}/>
            </li>
            <li>
                <CustomSelect name={"timeChoose"} options={timeList} onChangeValue={onChangeValueTimer}/>
            </li>
            <li>
                <CustomSelect name={"scoreChoose"} options={scoreList} onChangeValue={onChangeValueScore}/>
            </li>
            <li className={styles.play} onMouseUp={onStart}/>
        </ul>
    )
}

export default AdminMenu;