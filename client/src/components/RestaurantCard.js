import { Box, InputBase, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import SwiggyRating from "../assets/swiggyrating.png";
import PlaceHolder from "../assets/placeholder.png";
import Icon from "./Icon";

function RestaurantCard({
  imgSrc,
  imgHeight,
  imgWidth,
  name,
  rating,
  type,
  clickHandler,
  location,
}) {
  return (
    <Box
      onClick={clickHandler}
      sx={{
        cursor: "pointer",
        border: "1px solid red",
        width: "90%",
        "&:hover": {
          transform: "scale(0.9)",
          transition: "transform 0.2s ease",
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "20px",
        }}
      >
        <Icon
          src={imgSrc || PlaceHolder}
          isRounded
          imgWidth="100%"
          imgHeight="100%"
        />
      </Box>
      <Typography
        sx={{ fontFamily: '"GilroyMedium", sans-serif', fontSize: "18px" }}
      >
        {name}
      </Typography>
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
      <Typography>{location}</Typography>
    </Box>
  );
}

export default RestaurantCard;
