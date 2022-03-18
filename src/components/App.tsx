import React, {useState} from 'react';
import EnterWindow from "./enterWindow/EnterWindow";
import MainWindow from "./mainWindow/MainWindow";

interface DataInput {
    name : string
}

const App : React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dataInput, setDataInput] = useState<DataInput>({ name : ""})


    return (
        <>
            {isOpen && <EnterWindow/>}
            {!isOpen && <MainWindow name={dataInput.name}/>}
        </>
    )
}

export default App;
