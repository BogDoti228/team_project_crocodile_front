import React, {useState} from "react";

function Enter({setOpen}: propsEnterWindow){
    const [nick, setNick] = useState<DataInput>({name: ''});

    return (
        <div>
            <input type="text"
                   value={nick.name}
                   onChange={(e) => {setNick({...nick, name: e.target.value})}}/>
            <button onClick={() => {setOpen(v => !v )}}>Войти</button>
        </div>
    )
}

export default Enter;