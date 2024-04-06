import { Box, InputBase, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
// import Swiggy from "../assets/swiggy.svg";
import SwiggyRating from "../assets/swiggyrating.png";
import Icon from "./Icon";

function DeliveryDetailsCard({ rating, type, margin }) {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        border: "1px solid #02060c99",
        padding: "20px 10px",
        margin: margin,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Icon src={SwiggyRating} imgWidth="20px" imgHeight="20px" />
        <Typography
          sx={{ paddingLeft: "5px", fontSize: "16px", color: "02060CEB" }}
        >
          {rating}
        </Typography>
      </Box>

      <Box sx={{ display: "flex" }}>
        {type.map((item, index) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              fontSize: "14px",
              color: "#F15700",
              fontWeight: "700",
              paddingLeft: index !== 0 ? "3px" : "0px",
            }}
          >
            <Box>{item}</Box>
            {index !== type.length - 1 && <Box>,</Box>}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default DeliveryDetailsCard;
