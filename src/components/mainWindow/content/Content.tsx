import React from "react";
import DrawTable from "./drawTable/DrawTable";
import Interactive from "./interactive/Interactive";
import style from './content.module.scss';

const Content : React.FC = () => {

    return (
        <main className={style.content}>
            <DrawTable/>
            <Interactive />
        </main>
    )
}

export default Content