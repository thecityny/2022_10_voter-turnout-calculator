import React from "react";
import { Box } from "@mui/system";

import hochulPic from "../assets/images/hochul.jpeg";
import zeldinPic from "../assets/images/zeldin.jpeg";
import { Grid } from "@mui/material";

export const ElectionWinnerBanner = ({
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
