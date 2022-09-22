import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

import "./styles/app.scss";

const App = () => {
  const [value, setValue] = useState([30, 50]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <p className="color-dem">{100 - value[1]}% for Hochul</p>
          <p className="color-rep">{value[1] - value[0]}% for Zeldin</p>
          <p>{value[0]}% don't vote</p>
          <Slider
            data-size={value[0]}
            orientation="vertical"
            className={`slider-position-${value[0]}`}
            sx={{
              height: 300,
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          ></Slider>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
