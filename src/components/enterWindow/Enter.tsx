import React, {useState} from "react";

function Enter({setOpen, setDataInput}: propsEnterWindow){
    const [nick, setNick] = useState('');
    const [isError, setIsError] = useState(false);

    const onChangeInput = (value: string) => {
        if (value.length > 15){
            setIsError(true);
        }else {
            setIsError(false);
            setNick(value);
        }
    }

    const handleClickBtn = () => {
        setDataInput({name: nick})

        setOpen(v => !v );
    }

    return (
        <div className="enter-window__enter">
            {isError && <div className="enter-window__error-message">Слишком длинный ник</div>}
            <input placeholder="Введите свой ник"
                   className="enter-window__input"
                   type="text"
                   value={nick}
                   onChange={(e) => {onChangeInput(e.target.value)}}/>
            <button className="enter-window__btn btn" onClick={handleClickBtn}>Войти</button>
        </div>
    )
}

export default Enter;