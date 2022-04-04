import styles from "./userList.module.scss"
import React, {useEffect} from "react";
import {RootState, useTypeDispatch} from "../../../../../../store/store";
import {useSelector} from "react-redux";
import {getUsersList} from "../../../../../../store/web-slices/list_users_slice";

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
            {usersList.map((x, index) => <li key={index}>{x}</li>)}
        </ul>
    )
}

export default UserList;