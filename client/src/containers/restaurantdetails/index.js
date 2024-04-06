import { Box, InputBase, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchrestaurantdata } from "../../redux/restaurantDataSlice";

// import Swiggy from "../assets/swiggy.svg";
// import SwiggyRating from "../assets/swiggyrating.png";
// import Icon from "./Icon";

function RestaurantDetails() {
  const { restaurantID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchrestaurantdata(restaurantID));
  }, [restaurantID]);

  const gg = useSelector((state) => state);

  useEffect(() => {
    console.log("detail", gg);
  }, [gg, restaurantID]);

  return (
    <Box>
      <Typography sx={{ fontSize: "24px" }}>rest details page</Typography>
    </Box>
  );
}

export default RestaurantDetails;
