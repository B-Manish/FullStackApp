import { Box, InputBase, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

function Icon({
  src,
  imgWidth = "17px",
  imgHeight = "17px",
  isRounded,
  margin,
}) {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: imgWidth,
        height: imgHeight,
        margin: margin,
      }}
    >
      <img
        src={src}
        alt="img"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: isRounded && "15px",
        }}
      />
    </Box>
  );
}

export default Icon;
