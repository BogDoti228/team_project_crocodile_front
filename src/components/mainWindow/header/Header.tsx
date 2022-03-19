import React, {useEffect, useState} from "react";
import logo from "../../../resources/images/logo.svg"

type HeaderType = {
    name : string
}

const Header : React.FC<HeaderType> = ({name }) => {
    const [nameDefault, setNameDefault] = useState<string>("")

    useEffect(() => {
        if (!name) {
            setNameDefault("Akame228")
        }
    })

    return (
        <header className={"header"}>
            <div className={"header__title-box"}>
                <img className={"header__title-box__logo"} src={logo} alt="crocodile"/>
                <h1 className={"header__title-box__title"}>AlligatorZ</h1>
            </div>
            <div className={"header__profile"}>
                {name || nameDefault}
            </div>
        </header>
    )
}

export default Header