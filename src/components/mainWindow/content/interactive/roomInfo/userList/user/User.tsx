import React, {useEffect, useState} from "react";
import styles from "./user.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store/store";
import {UserInfoType} from "../../../../../../../store/web-slices/list_users_slice";
import style from "../../../../../header/header.module.scss";
import star from "../../../../../../../resources/images/star.svg";
import {NICK_IN_STORAGE} from "../../../../../../enterWindow/Enter";


const User : React.FC<UserInfoType> = ({name,score}) => {
    const {currentStartUser, currentAdmin} = useSelector((state : RootState) => state.selectReducer)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [isAdminUser, setIsAdminUser] = useState<boolean>(false)

    useEffect(() => {
        setIsAdminUser(currentAdmin === name)
    }, [currentAdmin, name])

    useEffect(() => {
        setIsSelected(currentStartUser === name)
    },[currentStartUser, name])

    return (
        <li className={styles.wrap} style={{borderColor : isSelected ? "red" : "rgb(146 244 192)"}}>
            <span className={styles.name}>{name}</span>
            <div className={styles.utils}>
                {isAdminUser && <img className={styles.admin} src={star} alt="crocodile"/>}
                <div className={styles.score}>{score}</div>
            </div>
        </li>
    )
}

export default User;