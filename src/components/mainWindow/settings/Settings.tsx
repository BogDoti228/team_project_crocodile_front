import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useTypeDispatch } from "../../../store/store";
import {
  setCurrentEndScore,
  setCurrentStartUser,
  setCurrentTimer,
} from "../../../store/web-slices/select_slice";
import CustomSelect from "../../utils/customSelect/CustomSelect";
import styles from "./settings.module.scss";
import { setSettingsShow } from "../../../store/web-slices/list_users_slice";
import { postGameProcessInfo } from "../../../store/web-slices/game_process_slice";

const Settings: React.FC = () => {
  const { usersList, timeList, scoreList } = useSelector(
    (state: RootState) => state.usersListReducer
  );

  const dispatch = useTypeDispatch();

  const handleChangeValueUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentStartUser(e.target.value));
  };

  const handleChangeValueTimer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentTimer(e.target.value));
  };

  const handleChangeValueScore = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentEndScore(e.target.value));
  };

  const onClose = () => {
    dispatch(setSettingsShow(false));
  };

  const handleStart = () => {
    dispatch(setSettingsShow(false));
    dispatch(postGameProcessInfo("during"));
  };

  return (
    <ul className={styles.settings_wrap_panel}>
      <li className={styles.li_block}>
        <p className={styles.text}>Выбрать кто начинает игру:</p>
        <CustomSelect
          name={"userChoose"}
          options={usersList.map((x) => x.name)}
          onChangeValue={handleChangeValueUser}
        />
      </li>
      <li className={styles.li_block}>
        <p className={styles.text}>Выбрать время раунда:</p>
        <CustomSelect
          name={"timeChoose"}
          options={timeList}
          onChangeValue={handleChangeValueTimer}
        />
      </li>
      <li className={styles.li_block}>
        <p className={styles.text}>Выбрать победное количество очков:</p>
        <CustomSelect
          name={"scoreChoose"}
          options={scoreList}
          onChangeValue={handleChangeValueScore}
        />
      </li>
      <li className={styles.li_block}>
        <button className={styles.button} onClick={onClose}>
          Вернуться
        </button>
        <button className={styles.button} onClick={handleStart}>
          Начать
        </button>
      </li>
    </ul>
  );
};

export default Settings;
