import React, {useEffect} from "react";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {getUsersList} from "../../../../../store/web-slices/list_users_slice";
import {useSelector} from "react-redux";

const RoomInfo : React.FC = () => {
    const dispatch = useTypeDispatch();
    const {usersList} = useSelector((state : RootState) => state.usersListReducer)

    useEffect(() => {
        dispatch(getUsersList())

        setInterval(() => {
            dispatch(getUsersList())
        }, 1000)
    },[])

    return (
        <div className={"room-info"}>
            <ul className={"box-word"}>
                {usersList.map((x, index) => <li key={index}>{x}</li>)}
            </ul>
        </div>
    )
}

export default RoomInfo