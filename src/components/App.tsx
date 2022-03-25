import React, {useState} from 'react';
import EnterWindow from "./enterWindow/EnterWindow";
import MainWindow from "./mainWindow/MainWindow";
import ChoiceRoomWindow from "./choiceRoomWindow/ChoiceRoomWindow";


const App : React.FC = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isOpenMain, setIsOpenMain] = useState(false);

    return (
        <>
            {!isAuth && <EnterWindow setAuth={setIsAuth}/>}
            {!(!isAuth || isOpenMain) && <ChoiceRoomWindow setOpen={setIsOpenMain}/>}
            {isOpenMain && <MainWindow />}
        </>
    )
}

export default App;
