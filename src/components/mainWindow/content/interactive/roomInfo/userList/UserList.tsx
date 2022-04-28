import styles from "./userList.module.scss";
import React, { useEffect } from "react";
import { RootState, useTypeDispatch } from "../../../../../../store/store";
import { useSelector } from "react-redux";
import { getUsersList } from "../../../../../../store/web-slices/list_users_slice";
import User from "./user/User";
import { deleteName } from "../../../../../../store/web-slices/profile_slice";
import { NICK_IN_STORAGE } from "../../../../../../constans";

const UserList: React.FC = () => {
  const dispatch = useTypeDispatch();
  const { usersList } = useSelector(
    (state: RootState) => state.usersListReducer
  );
  const { name } = useSelector((state: RootState) => state.profileReducer);

  const initBeforeUnLoad = () => {
    window.onbeforeunload = () => {
      dispatch(deleteName(sessionStorage.getItem(NICK_IN_STORAGE) as string));
    };
  };

  useEffect(() => {
    dispatch(getUsersList());
    const interval = setInterval(() => {
      dispatch(getUsersList());
    }, 1000);

    window.onload = function () {
      initBeforeUnLoad();
    };

    window.onunload = () => {
      dispatch(deleteName(name));
    };

    return () => {
      clearInterval(interval);
      dispatch(deleteName(name));
    };
  }, []);

  return (
    <ul className={styles.user_list_box}>
      {usersList.map((userInfo, index) => (
        <User name={userInfo.name} score={userInfo.score} key={index} />
      ))}
    </ul>
  );
};

export default UserList;
