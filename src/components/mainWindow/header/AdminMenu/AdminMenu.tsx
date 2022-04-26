import React, { SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./adminMenu.module.scss";
import { useSelector } from "react-redux";
import { RootState, useTypeDispatch } from "../../../../store/store";
import {
  postPreStartInfo,
  PreStartInfoType,
  setCurrentEndScore,
  setCurrentStartUser,
  setCurrentTimer,
} from "../../../../store/web-slices/select_slice";
import { postGameProcessInfo } from "../../../../store/web-slices/game_process_slice";
import { setSettingsShow } from "../../../../store/web-slices/list_users_slice";
import { NICK_IN_STORAGE } from "../../../../constans";

const AdminMenu: React.FC = () => {
  const { timeList, scoreList } = useSelector(
    (state: RootState) => state.usersListReducer
  );
  const { currentStartUser, currentTimer, currentEndScore } = useSelector(
    (state: RootState) => state.selectReducer
  );

  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(setCurrentStartUser(sessionStorage.getItem(NICK_IN_STORAGE)));
    dispatch(setCurrentTimer(timeList[0]));
    dispatch(setCurrentEndScore(scoreList[0]));
  }, []);

  useEffect(() => {
    const preStartInfo: PreStartInfoType = {
      currentTimer: currentTimer,
      currentStartUser: currentStartUser,
      currentEndScore: currentEndScore,
    };
    dispatch(postPreStartInfo(preStartInfo));
  }, [currentStartUser, currentTimer, currentEndScore]);

  const handleStart = () => {
    dispatch(setSettingsShow(false));
    dispatch(postGameProcessInfo("during"));
  };

  const handleSettingsShow = () => {
    dispatch(setSettingsShow(true));
  };

  return (
    <div className={styles.admin_panel_wrap}>
      <button className={styles.button} onClick={handleSettingsShow}>
        Настройки
      </button>
      <button className={styles.button} onClick={handleStart}>
        Начать
      </button>
    </div>
  );
};

export default AdminMenu;
