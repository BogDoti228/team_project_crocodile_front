import React from 'react';
import EnterWindow from "./enterWindow/EnterWindow";
import MainWindow from "./mainWindow/MainWindow";
import ChoiceRoomWindow from "./choiceRoomWindow/ChoiceRoomWindow";
import { Routes, BrowserRouter, Route } from "react-router-dom";


const App : React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ChoiceRoomWindow/>}/>
                <Route path='enter' element={<EnterWindow/>}/>
                <Route path='game' element={<MainWindow />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
