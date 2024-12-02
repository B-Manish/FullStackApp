import { Box } from "@mui/material";
import React from "react";

function Icon({
  src,
  imgWidth = "17px",
  imgHeight = "17px",
  isRounded,
  margin,
  clickHandler,
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
      onClick={clickHandler}
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
