import React, { useEffect, useState } from "react";
import styles from "./user.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../store/store";
import { UserInfoType } from "../../../../../../../store/web-slices/list_users_slice";
import star from "../../../../../../../resources/images/star.svg";

const User: React.FC<UserInfoType> = ({ name, score }) => {
  const { currentStartUser, currentAdmin } = useSelector(
    (state: RootState) => state.selectReducer
  );
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [styleSelected, setStyleSelected] = useState(
    styles.wrap_li + " " + styles.not_selected
  );
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

  useEffect(() => {
    setIsAdminUser(currentAdmin === name);
  }, [currentAdmin, name]);

  useEffect(() => {
    setIsSelected(currentStartUser === name);
    if (currentStartUser === name) {
      setStyleSelected(styles.wrap_li + " " + styles.selected);
    } else {
      setStyleSelected(styles.wrap_li + " " + styles.not_selected);
    }
  }, [currentStartUser, name]);

  return (
    <li className={styleSelected}>
      <span className={styles.name}>{name}</span>
      <div className={styles.utils}>
        {isAdminUser && (
          <img className={styles.admin} src={star} alt="crocodile" />
        )}
        <div className={styles.score}>{score}</div>
      </div>
      {isSelected && <div className={styles.gradient_flex} />}
    </li>
  );
};

export default User;
