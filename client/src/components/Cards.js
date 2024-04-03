import { Box, InputBase, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";

function Cards(img, imgHeight = "270px", imgWidth = "180px") {
  return (
    <Box>
      <img src={img} alt="img" style={{ height: imgHeight, width: imgWidth }} />
    </Box>
  );
}

export default Cards;
