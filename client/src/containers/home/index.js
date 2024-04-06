import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchallrestaurantsdata } from "../../redux/restaurantSlice";
import RestaurantCard from "../../components/RestaurantCard";
import Swiggy from "../../assets/swiggy.svg";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchallrestaurantsdata());
  }, []);
  const dispatch = useDispatch();
  const restData = useSelector((state) => state);
  console.log("restData", restData);

  const goTo = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <Box>
      Home Page
      <Grid container sx={{ border: "1px solid blue", width: "80vw" }}>
        {restData?.data?.restaurantdata?.map((item, index) => (
          <Grid
            item
            xs={3}
            key={item?._id}
            sx={{
              border: "1px solid yellow",
              display: "grid",
              placeItems: "center",
              padding: "20px",
            }}
          >
            <RestaurantCard
              // imgSrc={Swiggy}
              name={item?.name}
              rating={item?.rating}
              type={item?.type[0]}
              clickHandler={() => goTo(item?._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
