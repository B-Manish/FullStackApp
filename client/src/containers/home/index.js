import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchrestaurantdata } from "../../redux/restaurantSlice";

function Home() {
  useEffect(() => {
    dispatch(fetchrestaurantdata());
  }, []);
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);

  return <Box>Homecontainer</Box>;
}

export default Home;
