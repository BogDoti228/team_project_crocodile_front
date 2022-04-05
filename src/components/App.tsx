import React, {useState} from 'react';
import EnterWindow from "./enterWindow/EnterWindow";
import MainWindow from "./mainWindow/MainWindow";
import ChoiceRoomWindow from "./choiceRoomWindow/ChoiceRoomWindow";
import { Routes, BrowserRouter, Link, Route } from "react-router-dom";


const App : React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<EnterWindow/>}/>
                <Route path='choiceRoom' element={<ChoiceRoomWindow/>}/>
                <Route path='game' element={<MainWindow />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
