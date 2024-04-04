import { Box, InputBase, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Swiggy from "../assets/swiggy.svg";
import SwiggyRating from "../assets/swiggyrating.png";
import Icon from "./Icon";

function RestaurantCard({ imgSrc, imgHeight, imgWidth, name, rating, type }) {
  return (
    <Box>
      <img
        src={imgSrc}
        alt="img"
        style={{ height: "180px", width: "270px", border: "1px solid red" }}
      />
      <Typography>{name}</Typography>
      <Box sx={{ display: "flex" }}>
        <Icon src={SwiggyRating} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {rating}
        </Box>
      </Box>
      <Typography
        sx={{
          color: "#02060c99",
          fontSize: "16px",
        }}
      >
        {type}
      </Typography>
    </Box>
  );
}

export default RestaurantCard;
