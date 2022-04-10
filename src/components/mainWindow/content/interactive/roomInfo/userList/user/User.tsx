import React, {useEffect, useState} from "react";
import styles from "./user.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store/store";

interface UserProps {
    name : string,
    key : number
}

const User : React.FC<UserProps> = ({name, key}) => {
    const {currentStartUser} = useSelector((state : RootState) => state.selectReducer)
    const [isSelected, setIsSelected] = useState<boolean>(false)

    useEffect(() => {
        if (currentStartUser === name) {
            setIsSelected(true)
        }
        else {
            setIsSelected(false)
        }
    },[currentStartUser])

    return (
        <li className={styles.wrap} key={key} style={{borderColor : isSelected ? "red" : "rgb(146 244 192)"}}>
            <span className={styles.name}>{name}</span>
            <div className={styles.utilsButton}>
                <div/>
                <div/>
            </div>
        </li>
    )
}

export default User;