import React, {useState} from 'react';
import EnterWindow from "./enterWindow/EnterWindow";
import MainWindow from "./mainWindow/MainWindow";
import ChoiceRoomWindow from "./choiceRoomWindow/ChoiceRoomWindow";

const App : React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <>
            {/*<ChoiceRoomWindow/>*/}
            {isOpen && <EnterWindow setOpen={setIsOpen}/>}
            {!isOpen && <MainWindow />}
        </>
    )
}

export default App;
