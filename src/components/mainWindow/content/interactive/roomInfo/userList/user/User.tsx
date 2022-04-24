import React, {useEffect, useState} from "react";
import styles from "./user.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store/store";
import {UserInfoType} from "../../../../../../../store/web-slices/list_users_slice";
import style from "../../../../../header/header.module.scss";
import star from "../../../../../../../resources/images/star.svg";


const User : React.FC<UserInfoType> = ({name,score}) => {
    const {currentStartUser} = useSelector((state : RootState) => state.selectReducer)
    const [isSelected, setIsSelected] = useState<boolean>(false)

    /*console.log('произошел рендер')*/
    useEffect(() => {
        console.log(`start: ${currentStartUser} = name is: ${name}`)
        if (currentStartUser === name) {
            setIsSelected(true)
        }
        else {
            setIsSelected(false)
        }
    },[currentStartUser, name])

    return (
        <li className={styles.wrap} style={{borderColor : isSelected ? "red" : "rgb(146 244 192)"}}>
            <span className={styles.name}>{name}</span>
            <div className={styles.utils}>
                <img className={style.admin} src={star} alt="crocodile"/>
                <div className={styles.score}>{score}</div>
            </div>
        </li>
    )
}

export default User;