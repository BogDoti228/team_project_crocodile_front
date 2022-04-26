import React, { useState } from "react";
import { RootState, useTypeDispatch } from "../../store/store";
import {
  postName,
  setAuth,
  setName,
} from "../../store/web-slices/profile_slice";
import style from "./enterWindow.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCurrentAdmin } from "../../store/web-slices/select_slice";
import { NICK_IN_STORAGE, ROOM_ID_IN_STORAGE } from "../../constans";

function Enter() {
  const [nick, setNick] = useState("");
  const [isErrorMaxLen, setIsErrorMaxLenMaxLen] = useState(false);
  const [isErrorZeroInput, setIsErrorZeroInput] = useState(false);
  const [isNickTaken, setIsNickTaken] = useState(false);
  const { currentAdmin } = useSelector(
    (state: RootState) => state.selectReducer
  );
  const dispatch = useTypeDispatch();

  const onChangeInput = (value: string) => {
    setIsNickTaken(false);
    setIsErrorZeroInput(false);
    if (value.length > 15) {
      setIsErrorMaxLenMaxLen(true);
    } else {
      setIsErrorMaxLenMaxLen(false);
      setNick(value);
    }
  };

  let navigate = useNavigate();

  const handleEnter = () => {
    if (nick.length === 0) {
      setIsErrorZeroInput(true);
      return;
    }
    setIsNickTaken(false);
    dispatch(setName(nick));
    dispatch(postName(nick)).then((x) => {
      if (x.payload) {
        dispatch(setAuth(true));
        if (currentAdmin === "admin") {
          dispatch(setCurrentAdmin(nick));
        }
        navigate("/game/" + sessionStorage.getItem(ROOM_ID_IN_STORAGE));
      } else setIsNickTaken(true);
    });
    sessionStorage.setItem(NICK_IN_STORAGE, nick);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  return (
    <div className={style.enter}>
      {isErrorMaxLen && (
        <div className={style.errorMessage}>Слишком длинный ник</div>
      )}
      {isErrorZeroInput && <div className={style.errorMessage}>Пустой ник</div>}
      {isNickTaken && <div className={style.errorMessage}>Ник занят</div>}
      <input
        placeholder="Введите свой ник"
        className={style.input + " input"}
        type="text"
        value={nick}
        onChange={(e) => {
          onChangeInput(e.target.value);
        }}
        onKeyPress={(e) => {
          handlePressEnter(e);
        }}
      />
      <button className={style.btn + " btn"} onClick={handleEnter}>
        Войти
      </button>
    </div>
  );
}

export default Enter;
