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
        width: "90%",
        "&:hover": {
          transform: "scale(0.965)",
          transition: "transform 0.2s ease",
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "20px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "188 / 125",
            borderRadius: "20px",
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
      </Box>
      <Box sx={{ padding: "10px 0 0 10px" }}>
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
              ml: "3px",
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
    </Box>
  );
}

export default RestaurantCard;
