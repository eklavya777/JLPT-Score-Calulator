import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import InputPage from "./components/inputPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input/:level" element={<InputPage />} />
      </Routes>
    </Router>
  );
}

export default App;
