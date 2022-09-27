import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { VoterCalculator, VoterCalculatorSimple } from "./App";

ReactDOM.render(
  <Router>
    <Routes>
      {/* Here is where we create all of the pages we're deploying: */}
      <Route path="/" element={<VoterCalculator />} />
      {/* <Route
        path="/defectors"
        element={<VoterCalculatorSimple showsPartyDefectors />}
      />
      <Route path="/turnout" element={<VoterCalculatorSimple />} /> */}
    </Routes>
  </Router>,

  document.getElementById("root")
);
