import React, {useState} from "react";
import logo from "../../../resources/images/logo.svg"
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import style from './header.module.scss';
import AdminMenu from "./AdminMenu/AdminMenu";
import {ROOM_ID_IN_STORAGE} from "../../../store/web-slices/chat_slice";
import {NICK_IN_STORAGE} from "../../enterWindow/Enter";

const Header : React.FC = () => {
    const {name} = useSelector((state : RootState) => state.profileReducer)
    const [showCopied, setShowCopied] = useState(false);
    const {gameState} = useSelector((state : RootState) => state.gameProcessReducer)
    const {currentAdmin} = useSelector((state : RootState) => state.selectReducer)
    
    const handleCopyToClipboard = () => {
        let text = sessionStorage.getItem(ROOM_ID_IN_STORAGE);
        if (text)
            navigator.clipboard.writeText(text)
                .then(() => {
                    setShowCopied(true);
                    setTimeout(() => setShowCopied(false), 3000)
                })
                .catch(console.log);
    }

    return (
        <header className={style.header}>
            <div className={style.titleBox}>
                <img className={style.logo} src={logo} alt="crocodile"/>
                    <h1 className={style.title}>AlligatorZ</h1>
            </div>
            {currentAdmin === sessionStorage.getItem(NICK_IN_STORAGE) && gameState === "preStart" && <AdminMenu/>}
            {console.log(`${currentAdmin} name: ${sessionStorage.getItem(NICK_IN_STORAGE)}`)}
            <div className={style.info}>
                <div className={style.boxWrap}>
                    <div className={style.copiedText} onClick={handleCopyToClipboard}>Идентификатор комнаты: {sessionStorage.getItem(ROOM_ID_IN_STORAGE)}</div>
                </div>
                <div className={style.boxWrap}>
                    Имя: {name}
                </div>
            </div>
            {showCopied && <div className={style.copied}>Скопировано!</div>}
        </header>
    )
}

export default Header