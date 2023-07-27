import { useState } from "react";
import GamePage from "./components/GamePage";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-detail/:id" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
