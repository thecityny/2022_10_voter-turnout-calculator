import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';

import "./styles/app.scss"

const App = () => {

  const [value, setValue] = useState([50, 70]);

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
          <p>Biden's voters:</p>
          <p>{100 - value[1]} for Hochul</p>
          <p>{value[1] - value[0]} for Zeldin</p>
          <p>{value[0]} don't vote</p>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        orientation="vertical"
        sx={{
          height: 300,
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      </Grid>
      </Grid>
    </div>
  );
}

export default App;
