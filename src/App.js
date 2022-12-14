import React, { useEffect, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import "./styles/app.scss";

import { PastElectionSelector } from "./components/ElectionSelector";
import { ElectionWinnerBanner } from "./components/ElectionWinnerBanner";
import { DoubleSlider, SingleSlider } from "./components/Sliders";

export const voterData = {
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
};

function useHasEnteredViewport(ref) {
  const [hasIntersected, setHasIntersected] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => !!entry.isIntersecting && setHasIntersected(true)
      ),
    []
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return hasIntersected;
}

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

export const VoterCalculator = () => {
  /**
   * This state holds the positions of the two break points on the slider widget
   * for the democratic candidate.
   */
  const [demSliderPositions, setDemSliderPositions] = useState([30, 50]);

  /**
   * This is a duplicate state but for the republican candidate.
   */
  const [repSliderPositions, setRepSliderPositions] = useState([10, 30]);

  const handleDemChange = (event, newValue) => {
    setDemSliderPositions(newValue);
  };

  const handleRepChange = (event, newValue) => {
    setRepSliderPositions(newValue);
  };

  const [pastElectionYear, setPastElectionYear] = React.useState("2020");

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
      <h1 className="title">
        How could voter turnout <em>and</em> party switching determine the
        election?
      </h1>
      <h2 className="description">
        Based on results from the{" "}
        <PastElectionSelector
          pastElectionYear={pastElectionYear}
          handleElectionSelection={handleElectionSelection}
        />
      </h2>
      <Grid container spacing={2}>
        <DoubleSlider
          sliderPositions={demSliderPositions}
          handleChange={handleDemChange}
          candidateType="demCandidate"
          pastElectionYear={pastElectionYear}
        />

        <ElectionWinnerBanner
          votesForDemocrat={votesForDemocrat}
          votesForRepublican={votesForRepublican}
        />

        <DoubleSlider
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

export const VoterCalculatorSimple = ({
  /** A boolean that defines Whether or not the simple slider shows votes that switch parties (if TRUE),
   * or non-voters (if FALSE or undefined).
   */
  showsPartyDefectors,
}) => {
  const defaultSliderPositions = {
    dem: showsPartyDefectors ? 81 : 62,
    rep: 100,
  };

  /**
   * This state holds the positions of the two break points on the slider widget
   * for the democratic candidate.
   */
  const [demSliderPosition, setDemSliderPosition] = useState(
    defaultSliderPositions.dem
  );

  /**
   * This is a duplicate state but for the republican candidate.
   */
  const [repSliderPosition, setRepSliderPosition] = useState(
    defaultSliderPositions.rep
  );

  const handleDemChange = (event, newValue) => {
    setDemSliderPosition(newValue);
  };

  const handleRepChange = (event, newValue) => {
    setRepSliderPosition(newValue);
  };

  const [pastElectionYear, setPastElectionYear] = React.useState("2020");

  const handleElectionSelection = (event) => {
    setPastElectionYear(event.target.value);
  };

  const appRef = useRef(null);
  const isInViewport = useHasEnteredViewport(appRef);

  const votesForDemocrat = calculateTotalVotes(
    "demCandidate",
    pastElectionYear,
    showsPartyDefectors
      ? [0, 100 - demSliderPosition]
      : [100 - demSliderPosition, 100 - demSliderPosition],
    showsPartyDefectors
      ? [0, 100 - repSliderPosition]
      : [100 - repSliderPosition, 100 - repSliderPosition]
  );
  const votesForRepublican = calculateTotalVotes(
    "repCandidate",
    pastElectionYear,
    showsPartyDefectors
      ? [0, 100 - repSliderPosition]
      : [100 - repSliderPosition, 100 - repSliderPosition],
    showsPartyDefectors
      ? [0, 100 - demSliderPosition]
      : [100 - demSliderPosition, 100 - demSliderPosition]
  );
  return (
    <div className="app">
      <h1 className="title" ref={appRef}>
        {showsPartyDefectors
          ? "How could voters switching parties determine the election?"
          : "How could voter turnout determine the election?"}
      </h1>
      <h2 className="description">
        Based on results from the{" "}
        <PastElectionSelector
          pastElectionYear={pastElectionYear}
          handleElectionSelection={handleElectionSelection}
        />
      </h2>
      <Grid container>
        <Grid container item xs={12} sm={6} spacing={2}>
          <SingleSlider
            sliderPosition={isInViewport ? demSliderPosition : 0}
            handleChange={handleDemChange}
            candidateType="demCandidate"
            pastElectionYear={pastElectionYear}
            showsPartyDefectors={showsPartyDefectors}
          />

          <SingleSlider
            sliderPosition={isInViewport ? repSliderPosition : 0}
            handleChange={handleRepChange}
            candidateType="repCandidate"
            pastElectionYear={pastElectionYear}
            showsPartyDefectors={showsPartyDefectors}
          />
        </Grid>
        <Grid item xs={12} sm={6} container spacing={2}>
          <ElectionWinnerBanner
            votesForDemocrat={votesForDemocrat}
            votesForRepublican={votesForRepublican}
            withSmallImage
          />
          <ElectionWinnerBanner
            votesForDemocrat={votesForDemocrat}
            votesForRepublican={votesForRepublican}
            isOnMobile
            withSmallImage
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const App = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const param = queryParams.get("type");
  // Use any querystring parameters in the page url to determine which viz to show:
  if (!!param) {
    return param === "defectors" ? (
      <VoterCalculatorSimple showsPartyDefectors />
    ) : (
      <VoterCalculatorSimple />
    );
  }
  return <VoterCalculator />;
};
