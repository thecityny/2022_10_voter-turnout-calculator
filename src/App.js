import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import classnames from "classnames";

import "./styles/app.scss";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";

import hochulPic from "./assets/images/hochul.jpeg";
import zeldinPic from "./assets/images/zeldin.jpeg";

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
    <Grid
      item
      xs={6}
      sm={3}
      className="description slider-text"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <div
        className={classnames(
          candidateType === "demCandidate" ? "dem-slider" : "rep-slider",
          `slider-position-${sliderPositions[0]}`
        )}
      >
        <p>
          {`If ${voterData[pastElectionYear][candidateType].name}'s voters are split`}
        </p>
        <Slider
          data-size={sliderPositions[0]}
          orientation="vertical"
          sx={{
            height: { sm: 300, xs: 200 },
            '& input[type="range"]': {
              WebkitAppearance: "slider-vertical",
            },
          }}
          value={sliderPositions}
          onChange={handleChange}
          valueLabelDisplay="off"
        />
        <p
          className={
            candidateType === "demCandidate" ? "color-dem" : "color-rep"
          }
        >
          {100 - sliderPositions[1]}% for{" "}
          {candidateType === "demCandidate" ? "Hochul" : "Zeldin"}
        </p>
        <p
          className={
            candidateType === "demCandidate" ? "color-rep" : "color-dem"
          }
        >
          {sliderPositions[1] - sliderPositions[0]}% for{" "}
          {candidateType === "demCandidate" ? "Zeldin" : "Hochul"}
        </p>
        <p>{sliderPositions[0]}% don't vote</p>
      </div>
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

const ElectionWinnerBanner = ({
  votesForDemocrat,
  votesForRepublican,
  isOnMobile,
}) => (
  <Grid
    item
    className="election-winner"
    xs={12}
    sm={6}
    alignItems="center"
    justifyContent="center"
    display={
      isOnMobile ? { xs: "flex", sm: "none" } : { xs: "none", sm: "flex" }
    }
  >
    <Box textAlign="center">
      <Box
        className={
          votesForDemocrat >= votesForRepublican ? "color-dem" : "color-rep"
        }
        component="img"
        sx={{
          height: { xs: 75, sm: 150 },
          width: { xs: 75, sm: 150 },
        }}
        borderRadius={100}
        alt={
          votesForDemocrat >= votesForRepublican ? "Kathy Hochul" : "Lee Zeldin"
        }
        src={votesForDemocrat >= votesForRepublican ? hochulPic : zeldinPic}
      />
      <h1
        className={
          votesForDemocrat >= votesForRepublican ? "color-dem" : "color-rep"
        }
      >
        {votesForDemocrat >= votesForRepublican ? "Hochul wins" : "Zeldin wins"}
      </h1>

      <p className="description">
        {Math.round(votesForDemocrat).toLocaleString()} votes for Hochul.
      </p>
      <p className="description">
        {Math.round(votesForRepublican).toLocaleString()} votes for Zeldin.
      </p>
    </Box>
  </Grid>
);

const App = () => {
  /**
   * This state holds the positions of the two break points on the slider widget
   * for the democratic candidate.
   */
  const [demSliderPositions, setDemSliderPositions] = useState([30, 40]);

  /**
   * This is a duplicate state but for the republican candidate.
   */
  const [repSliderPositions, setRepSliderPositions] = useState([30, 40]);

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
        <VoteSlider
          sliderPositions={demSliderPositions}
          handleChange={handleDemChange}
          candidateType="demCandidate"
          pastElectionYear={pastElectionYear}
        />

        <ElectionWinnerBanner
          votesForDemocrat={votesForDemocrat}
          votesForRepublican={votesForRepublican}
        />

        <VoteSlider
          sliderPositions={repSliderPositions}
          handleChange={handleRepChange}
          candidateType="repCandidate"
          pastElectionYear={pastElectionYear}
        />
        <ElectionWinnerBanner
          votesForDemocrat={votesForDemocrat}
          votesForRepublican={votesForRepublican}
          isOnMobile
        />
      </Grid>
    </div>
  );
};

export default App;
