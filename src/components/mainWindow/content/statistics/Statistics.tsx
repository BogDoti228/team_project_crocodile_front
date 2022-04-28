import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useTypeDispatch } from "../../../../store/store";
import { getStatistics } from "../../../../store/web-slices/statistics_slice";
import styles from "./statistics.module.scss";
import { restartGame } from "../../../../store/web-slices/game_process_slice";
import { NICK_IN_STORAGE } from "../../../../constans";

const Statistics: React.FC = () => {
  const { currentAdmin } = useSelector(
    (state: RootState) => state.selectReducer
  );
  const { mostSuccessDrawing, mostSuccessGuessing, winner } = useSelector(
    (state: RootState) => state.statisticsReducer
  );
  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  const handleRestart = () => {
    dispatch(restartGame());
  };

  return (
    <div className={styles.boxWrapStatistics}>
      <div className={styles.textWrap}>
        <p className={styles.text}>Лучший игрок:</p>
        <p className={styles.user}>{winner}</p>
      </div>
      <div className={styles.textWrap}>
        <p className={styles.text}>Лучше всех рисовал:</p>
        <p className={styles.user}>{mostSuccessDrawing}</p>
      </div>
      <div className={styles.textWrap}>
        <p className={styles.text}>Лучше всех угадывал:</p>
        <p className={styles.user}>{mostSuccessGuessing}</p>
      </div>
      {currentAdmin === sessionStorage.getItem(NICK_IN_STORAGE) && (
        <button className={styles.button} onClick={handleRestart}>
          Перезапустить игру
        </button>
      )}
    </div>
  );
};

export default Statistics;
