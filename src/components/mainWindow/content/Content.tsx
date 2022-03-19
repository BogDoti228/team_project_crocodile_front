import React from "react";
import DrawTable from "./drawTable/DrawTable";
import Interactive from "./interactive/Interactive";

const Content : React.FC = () => {
    return (
        <main className={"content"}>
            <DrawTable/>
            <Interactive/>
        </main>
    )
}

export default Content