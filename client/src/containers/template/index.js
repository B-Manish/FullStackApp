import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";

function Template({ screen }) {
  return (
    <Box sx={{ width: "99.93vw", display: "grid", placeItems: "center" }}>
      <Navbar />
      <Box>{screen}</Box>
    </Box>
  );
}

export default Template;
