import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchrestaurantdata } from "../../redux/restaurantSlice";
import Cards from "../../components/Cards";

function Home() {
  useEffect(() => {
    dispatch(fetchrestaurantdata());
  }, []);
  const dispatch = useDispatch();
  const restData = useSelector((state) => state);
  console.log("restData", restData);

  return (
    <Box>
      <Cards />
    </Box>
  );
}

export default Home;
