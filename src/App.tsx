import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import classnames from "classnames";

import "./styles/app.scss";

const voterData = {
  2018: {
    demCandidate: {
      name: "Cuomo",
      votes: 3635340,
    },
    repCandidate: {
      name: "Molinaro",
      votes: 2207602,
    },
  },
};

type CandidateType = "demCandidate" | "repCandidate";

const VoteSlider: React.FC<{
  sliderPositions: [number, number];
  handleChange: (event: Event, value: number | number[]) => void;
  candidateType: CandidateType;
}> = ({ sliderPositions, handleChange, candidateType }) => {
  return (
    <Grid item xs={3}>
      <p>{voterData[2018][candidateType].name}'s voters are split:</p>
      <p
        className={candidateType === "demCandidate" ? "color-dem" : "color-rep"}
      >
        {100 - sliderPositions[1]}% for{" "}
        {candidateType === "demCandidate" ? "Hochul" : "Zeldin"}
      </p>
      <p
        className={candidateType === "demCandidate" ? "color-rep" : "color-dem"}
      >
        {sliderPositions[1] - sliderPositions[0]}% for{" "}
        {candidateType === "demCandidate" ? "Zeldin" : "Hochul"}
      </p>
      <p>{sliderPositions[0]}% don't vote</p>
      <Slider
        data-size={sliderPositions[0]}
        orientation="vertical"
        className={classnames(
          candidateType === "demCandidate" ? "dem-slider" : "rep-slider",
          `slider-position-${sliderPositions[0]}`
        )}
        sx={{
          height: 300,
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
        }}
        value={sliderPositions}
        onChange={handleChange}
        valueLabelDisplay="off"
        marks={[
          {
            value: 100,
            label: "100%",
          },
        ]}
      />
    </Grid>
  );
};

const App = () => {
  /**
   * This state holds the positions of the two break points on the slider widget
   * for the democratic candidate.
   */
  const [demSliderPositions, setDemSliderPositions] = useState<
    [number, number]
  >([30, 45]);

  /**
   * This is a duplicate state but for the republican candidate.
   */
  const [repSliderPositions, setRepSliderPositions] = useState<
    [number, number]
  >([30, 45]);

  const handleDemChange = (event, newValue) => {
    setDemSliderPositions(newValue);
  };

  const handleRepChange = (event, newValue) => {
    setRepSliderPositions(newValue);
  };

  const votesForDemocrat =
    (voterData[2018].demCandidate.votes * (100 - demSliderPositions[1])) / 100 +
    (voterData[2018].repCandidate.votes *
      Math.abs(repSliderPositions[0] - repSliderPositions[1])) /
      100;

  const votesForRepublican =
    (voterData[2018].repCandidate.votes * (100 - repSliderPositions[1])) / 100 +
    (voterData[2018].demCandidate.votes *
      Math.abs(demSliderPositions[0] - demSliderPositions[1])) /
      100;

  return (
    <div className="app">
      <h1>Voter Turnout Prediction Calculator</h1>
      <h2>Based on results from the 2018 gubernatorial election</h2>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <h2>IF:</h2>
        </Grid>
        <VoteSlider
          sliderPositions={demSliderPositions}
          handleChange={handleDemChange}
          candidateType="demCandidate"
        />
        <Grid item xs={3}>
          {votesForDemocrat >= votesForRepublican ? (
            <h1 className="color-dem">Hochul wins</h1>
          ) : (
            <h1 className="color-rep">Zeldin wins</h1>
          )}
          <p>
            {Math.round(votesForDemocrat).toLocaleString()} votes for Hochul.
          </p>
          <p>
            {Math.round(votesForRepublican).toLocaleString()} votes for Zeldin.
          </p>
        </Grid>
        <VoteSlider
          sliderPositions={repSliderPositions}
          handleChange={handleRepChange}
          candidateType="repCandidate"
        />
      </Grid>
    </div>
  );
};

export default App;
