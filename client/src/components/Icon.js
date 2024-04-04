import { Box, InputBase, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

function Icon({ src, imgWidth = "17px", imgHeight = "17px" }) {
  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <img src={src} alt="img" style={{ width: imgWidth, height: imgHeight }} />
    </Box>
  );
}

export default Icon;
