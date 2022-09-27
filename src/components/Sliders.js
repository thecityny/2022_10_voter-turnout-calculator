import React from "react";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import classnames from "classnames";
import { voterData } from "../App";

export const SingleSlider = ({
  sliderPosition,
  handleChange,
  candidateType,
  pastElectionYear,
  /** A boolean that defines Whether or not the simple slider shows votes that switch parties (if TRUE),
   * or non-voters (if FALSE or undefined).
   */
  showsPartyDefectors,
}) => (
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
        candidateType === "demCandidate" ? "dem-slider" : "rep-slider"
      )}
    >
      <p>
        {`If ${voterData[pastElectionYear][candidateType].name}'s voters are split`}
      </p>
      <br />
      <p
        className={candidateType === "demCandidate" ? "color-dem" : "color-rep"}
      >
        {100 - sliderPosition}% for{" "}
        {candidateType === "demCandidate" ? "Hochul" : "Zeldin"}
      </p>
      {!!showsPartyDefectors ? (
        <p
          className={
            candidateType === "demCandidate" ? "color-rep" : "color-dem"
          }
        >
          {sliderPosition}% for{" "}
          {candidateType === "demCandidate" ? "Zeldin" : "Hochul"}
        </p>
      ) : (
        <p>{sliderPosition}% don't vote</p>
      )}
      <Slider
        orientation="vertical"
        className={classnames(!showsPartyDefectors && "only-show-one-party")}
        sx={{
          height: { sm: 300, xs: 200 },
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
        }}
        value={sliderPosition}
        onChange={handleChange}
        valueLabelDisplay="off"
      />
    </div>
  </Grid>
);

export const DoubleSlider = ({
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
        <br />
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
      </div>
    </Grid>
  );
};
