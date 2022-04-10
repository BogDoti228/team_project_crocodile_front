import styles from "./userList.module.scss"
import React, {useEffect} from "react";
import {RootState, useTypeDispatch} from "../../../../../../store/store";
import {useSelector} from "react-redux";
import {getUsersList} from "../../../../../../store/web-slices/list_users_slice";
import User from "./user/User";

const UserList : React.FC = () => {
    const dispatch = useTypeDispatch();
    const {usersList} = useSelector((state : RootState) => state.usersListReducer)

    useEffect(() => {
        dispatch(getUsersList())

        setInterval(() => {
            dispatch(getUsersList())
        }, 1000)
    },[])

    return (
        <ul className={styles.user_list_box}>
            {usersList.map((name, index) => <User name={name} key={index}/>)}
        </ul>
    )
}

export default UserList;