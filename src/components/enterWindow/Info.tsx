import React from "react";
import style from "./enterWindow.module.scss";

const Info : React.FC = () => {
    return (
        <div className={style.info}>
            Тут можно рассказать про игру,
            правила, про проект, ченить такое,
            <span>Вот так можно помечать важное</span>
        </div>
    )
}

export default Info;