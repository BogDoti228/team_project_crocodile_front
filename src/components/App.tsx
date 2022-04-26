import React from "react";
import EnterWindow from "./enterWindow/EnterWindow";
import MainWindow from "./mainWindow/MainWindow";
import ChoiceRoomWindow from "./choiceRoomWindow/ChoiceRoomWindow";
import { Routes, BrowserRouter, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChoiceRoomWindow />} />
        <Route path="enter" element={<EnterWindow />} />
        <Route path="game/:roomId" element={<MainWindow />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem", margin: "0 auto" }}>
              <p>Тут ничего нет, проверьте правильность ссылки!</p>
              <a
                href="/"
                style={{
                  display: "block",
                  margin: "20px auto",
                  textAlign: "center",
                }}
              >
                На главную
              </a>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
