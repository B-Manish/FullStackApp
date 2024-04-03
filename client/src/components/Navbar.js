import { Paper, Box } from "@mui/material";
import React from "react";
import Swiggy from "../assets/swiggy.svg";

function Navbar() {
  return (
    <Paper sx={{ width: "100vw", border: "1px solid red" }}>
      Navbar
      <img src={Swiggy} width="37px" height="54px" alt="icon" />
      <Box
        sx={{ fontFamily: "ProximaNova, arial, Helvetica Neue, sans-serif" }}
      >
        ggwp
      </Box>
    </Paper>
  );
}

export default Navbar;
