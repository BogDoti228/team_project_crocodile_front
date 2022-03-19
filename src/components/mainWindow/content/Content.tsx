import React from "react";
import DrawTable from "./drawTable/DrawTable";
import Interactive from "./interactive/Interactive";

const Content : React.FC<ProfileProps> = ({name}) => {
    return (
        <main className={"content"}>
            <DrawTable/>
            <Interactive name={name}/>
        </main>
    )
}

export default Content