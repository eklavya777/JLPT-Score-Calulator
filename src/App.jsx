import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import InputPage from "./components/inputPage";
import UserChoice from "./components/userChoice";
import TestChoice from "./components/testChoice";
import MockTestPage from "./components/mockTest.jsx";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input/:level" element={<InputPage />} />
        <Route path="/user-choice/:level" element={<UserChoice />} />
        <Route path="/test-choice/:level" element={<TestChoice />} />
        <Route path="/mock-test/:level/:testId" element={<MockTestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
