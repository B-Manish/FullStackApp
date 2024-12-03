import { Box, InputBase, Grid, Typography, Skeleton } from "@mui/material";
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
  loading = false,
}) {
  return loading ? (
    <Box
      sx={{
        cursor: "pointer",
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
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) )`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Box>
      <Box sx={{ padding: "10px 0 0 10px" }}>
        <Skeleton variant="text" sx={{ fontSize: "18px" }} width="70%" />
        <Skeleton variant="text" sx={{ fontSize: "18px" }} width="55%" />
        <Skeleton variant="text" sx={{ fontSize: "18px" }} width="40%" />
        <Skeleton variant="text" sx={{ fontSize: "18px" }} width="25%" />
      </Box>
    </Box>
  ) : (
    <Box
      onClick={clickHandler}
      sx={{
        cursor: "pointer",
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
            backgroundImage: ` url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
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
        <Box sx={{ display: "flex" }}>
          {type.map((item, index) => (
            <Typography
              key={item}
              sx={{
                color: "#02060c99",
                fontSize: "16px",
              }}
            >
              {item}
              {index !== type.length - 1 && ","}
            </Typography>
          ))}
        </Box>

        <Typography>{location}</Typography>
      </Box>
    </Box>
  );
}

export default RestaurantCard;
