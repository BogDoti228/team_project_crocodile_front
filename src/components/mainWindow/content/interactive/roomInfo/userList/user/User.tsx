import React, {useEffect, useState} from "react";
import styles from "./user.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store/store";

interface UserProps {
    name : string,
}

const User : React.FC<UserProps> = ({name}) => {
    const {currentStartUser} = useSelector((state : RootState) => state.selectReducer)
    const [isSelected, setIsSelected] = useState<boolean>(false)


    useEffect(() => {
        console.log(currentStartUser)
        console.log(name)
        if (currentStartUser === name) {
            console.log("selected")
            setIsSelected(true)
        }
        else {
            setIsSelected(false)
        }
    },[currentStartUser])

    return (
        <li className={styles.wrap} style={{borderColor : isSelected ? "red" : "rgb(146 244 192)"}}>
            <span className={styles.name}>{name}</span>
            <div className={styles.utilsButton}>
                <div/>
                <div/>
            </div>
        </li>
    )
}

export default User;