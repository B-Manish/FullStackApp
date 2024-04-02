import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";

function Template({ screen }) {
  return (
    <Box sx={{ width: "100vw", height: "100vh", border: "1px solid yellow" }}>
      <Navbar />
      <Box>{screen}</Box>
    </Box>
  );
}

export default Template;
