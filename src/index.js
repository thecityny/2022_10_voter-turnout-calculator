import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { VoterCalculator, VoterCalculatorSimple } from "./App";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<VoterCalculator />} />
      <Route path="/turnout" element={<VoterCalculatorSimple />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);
