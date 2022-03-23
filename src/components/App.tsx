import React, {useState} from 'react';
import EnterWindow from "./enterWindow/EnterWindow";
import MainWindow from "./mainWindow/MainWindow";

//Interface DataInput moved to d.ts
const App : React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <>
            {isOpen && <EnterWindow setOpen={setIsOpen}/>}
            {!isOpen && <MainWindow />}
        </>
    )
}

export default App;
