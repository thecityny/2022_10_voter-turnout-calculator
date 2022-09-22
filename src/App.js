import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

import "./styles/app.scss";

const App = () => {
  /**
   * This state holds the positions of the two break points on the slider widget
   * for the democratic candidate.
   */
  const [demSliderPositions, setDemSliderPositions] = useState([30, 50]);

  /**
   * This is a duplicate state but for the republican candidate.
   */
  const [repSliderPositions, setRepSliderPositions] = useState([30, 50]);

  const handleDemChange = (event, newValue) => {
    setDemSliderPositions(newValue);
  };

  const handleRepChange = (event, newValue) => {
    setRepSliderPositions(newValue);
  };

  return (
    <div>
      <h1>Voter Turnout Prediction Calculator</h1>
      <h2>Based on results from the 2018 gubernatorial election</h2>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <h2>IF:</h2>
        </Grid>
        <Grid item xs={3}>
          <p>Biden's voters are split:</p>
          <p className="color-dem">{100 - demSliderPositions[1]}% for Hochul</p>
          <p className="color-rep">
            {demSliderPositions[1] - demSliderPositions[0]}% for Zeldin
          </p>
          <p>{demSliderPositions[0]}% don't vote</p>
          <Slider
            data-size={demSliderPositions[0]}
            orientation="vertical"
            className={`dem-slider slider-position-${demSliderPositions[0]}`}
            sx={{
              height: 300,
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            value={demSliderPositions}
            onChange={handleDemChange}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={3}>
          <p>Trump's voters are split:</p>
          <p className="color-rep">{100 - repSliderPositions[1]}% for Hochul</p>
          <p className="color-dem">
            {repSliderPositions[1] - repSliderPositions[0]}% for Zeldin
          </p>
          <p>{repSliderPositions[0]}% don't vote</p>
          <Slider
            data-size={repSliderPositions[0]}
            orientation="vertical"
            className={`rep-slider slider-position-${repSliderPositions[0]}`}
            sx={{
              height: 300,
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            value={repSliderPositions}
            onChange={handleRepChange}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
