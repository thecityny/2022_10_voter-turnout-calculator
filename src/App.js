import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import classnames from "classnames";

import "./styles/app.scss";
import { FormControl, MenuItem, Select } from "@mui/material";

const voterData = {
  2020: {
    demCandidate: {
      name: "Biden",
      votes: 5244886,
    },
    repCandidate: {
      name: "Trump",
      votes: 3251997,
    },
  },
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
  2016: {
    demCandidate: {
      name: "Clinton",
      votes: 4556124,
    },
    repCandidate: {
      name: "Trump",
      votes: 2819534,
    },
  },
};

const VoteSlider = ({
  sliderPositions,
  handleChange,
  candidateType,
  pastElectionYear,
}) => {
  return (
    <Grid item xs={3}>
      <p>
        {voterData[pastElectionYear][candidateType].name}'s voters are split:
      </p>
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

const PastElectionSelector = ({ pastElection, handleElectionSelection }) => (
  <FormControl>
    <Select
      labelId="past-election-selector"
      id="past-election-selector"
      className="description past-election-selector"
      value={pastElection}
      defaultValue="2018"
      label="Past Election Year"
      InputLabelProps={{ shrink: false }}
      onChange={handleElectionSelection}
    >
      <MenuItem value="2020" className="description">
        2020 Presidential Election
      </MenuItem>
      <MenuItem value="2018" className="description">
        2018 Gubernatorial Election
      </MenuItem>
      <MenuItem value="2016" className="description">
        2016 Presidential Election
      </MenuItem>
    </Select>
  </FormControl>
);

const calculateTotalVotes = (
  candidateType,
  pastElectionYear,
  sliderPositions,
  opposingSliderPositions
) => {
  const opposingPartyType =
    candidateType === "demCandidate" ? "repCandidate" : "demCandidate";
  const samePartyVotes = voterData[pastElectionYear][candidateType].votes;
  const opposingPartyVotes =
    voterData[pastElectionYear][opposingPartyType].votes;

  return (
    (samePartyVotes * (100 - sliderPositions[1])) / 100 +
    (opposingPartyVotes *
      Math.abs(opposingSliderPositions[0] - opposingSliderPositions[1])) /
      100
  );
};

const App = () => {
  /**
   * This state holds the positions of the two break points on the slider widget
   * for the democratic candidate.
   */
  const [demSliderPositions, setDemSliderPositions] = useState([30, 45]);

  /**
   * This is a duplicate state but for the republican candidate.
   */
  const [repSliderPositions, setRepSliderPositions] = useState([30, 45]);

  const handleDemChange = (event, newValue) => {
    setDemSliderPositions(newValue);
  };

  const handleRepChange = (event, newValue) => {
    setRepSliderPositions(newValue);
  };

  const [pastElectionYear, setPastElectionYear] = React.useState("2018");

  const handleElectionSelection = (event) => {
    setPastElectionYear(event.target.value);
  };

  const votesForDemocrat = calculateTotalVotes(
    "demCandidate",
    pastElectionYear,
    demSliderPositions,
    repSliderPositions
  );
  const votesForRepublican = calculateTotalVotes(
    "repCandidate",
    pastElectionYear,
    repSliderPositions,
    demSliderPositions
  );

  return (
    <div className="app">
      <h1 className="title">Voter Turnout Prediction Calculator</h1>
      <h2 className="description">
        Based on results from the{" "}
        <PastElectionSelector
          pastElectionYear={pastElectionYear}
          handleElectionSelection={handleElectionSelection}
        />
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <h2>IF:</h2>
        </Grid>
        <VoteSlider
          sliderPositions={demSliderPositions}
          handleChange={handleDemChange}
          candidateType="demCandidate"
          pastElectionYear={pastElectionYear}
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
          pastElectionYear={pastElectionYear}
        />
      </Grid>
    </div>
  );
};

export default App;
