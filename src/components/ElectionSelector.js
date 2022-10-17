import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

export const PastElectionSelector = ({
  pastElection,
  handleElectionSelection,
}) => (
  <FormControl>
    <Select
      labelId="past-election-selector"
      id="past-election-selector"
      className="description past-election-selector"
      value={pastElection}
      defaultValue="2020"
      label="Past Election Year"
      onChange={handleElectionSelection}
    >
      <MenuItem value="2020" className="description">
        2020 Presidential Election
      </MenuItem>
      <MenuItem value="2018" className="description">
        2018 Gubernatorial Election
      </MenuItem>
    </Select>
  </FormControl>
);
