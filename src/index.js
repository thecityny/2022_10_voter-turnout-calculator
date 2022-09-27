import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { VoterCalculator, VoterCalculatorSimple } from "./App";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<VoterCalculator />} />
      <Route
        path="/turnout"
        element={<VoterCalculatorSimple showsPartyDefectors />}
      />
    </Routes>
  </Router>,

  document.getElementById("root")
);
