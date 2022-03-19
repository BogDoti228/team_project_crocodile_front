import React, {useState} from "react";

function Enter({setOpen, setDataInput}: propsEnterWindow){
    const [nick, setNick] = useState('');
    const [isErrorMaxLen, setIsErrorMaxLenMaxLen] = useState(false);
    const [isErrorZeroInput, setIsErrorZeroInput] = useState(false);

    const onChangeInput = (value: string) => {
        setIsErrorZeroInput(false);
        if (value.length > 15){
            setIsErrorMaxLenMaxLen(true);
        }else {
            setIsErrorMaxLenMaxLen(false);
            setNick(value);
        }
    }

    const handleClickBtn = () => {
        if (nick.length === 0){
            setIsErrorZeroInput(true);
            return;
        }
        setDataInput({name: nick})
        setOpen(v => !v );
    }

    const handlePressEnter = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleClickBtn();
    }

    return (
        <div className="enter-window__enter">
            {isErrorMaxLen && <div className="enter-window__error-message">Слишком длинный ник</div>}
            {isErrorZeroInput && <div className="enter-window__error-message">Пустой ник</div>}
            <input placeholder="Введите свой ник"
                   className="enter-window__input"
                   type="text"
                   value={nick}
                   onChange={(e) => {onChangeInput(e.target.value)}}
                   onKeyPress={e => {handlePressEnter(e)}}
            />
            <button className="enter-window__btn btn" onClick={handleClickBtn}>Войти</button>
        </div>
    )
}

export default Enter;