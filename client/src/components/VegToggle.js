import React, { useState } from "react";
import Box from "@mui/material/Box";

export default function VegToggle() {
  const [moved, setMoved] = useState(false);

  const handleClick = () => {
    setMoved((prev) => !prev);
  };
  return (
    <Box
      sx={{
        height: "32px",
        width: "74px",
        borderRadius: "100px",
        border: "1px solid #02060c26",
        display: "grid",
        placeItems: "center",
        transition: "all 0.5s ease",
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: moved ? "row-reverse" : "row",
        }}
      >
        <Box
          sx={{
            width: "15px",
            height: "15px",
            border: "2.5px solid green",
            display: "flex",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: "green",
              borderRadius: "50%",
              m: "calc(50% - 5px) 0 0 calc(50% - 5px)",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "23px",
            height: "10px",
            background: moved ? "green" : "#02060c26",
            borderRadius: moved ? "10px 0px 0px 10px" : "0px 10px 10px 0px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
}
