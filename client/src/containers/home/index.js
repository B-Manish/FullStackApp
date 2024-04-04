import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchrestaurantdata } from "../../redux/restaurantSlice";
import RestaurantCard from "../../components/RestaurantCard";
import Swiggy from "../../assets/swiggy.svg";

function Home() {
  useEffect(() => {
    dispatch(fetchrestaurantdata());
  }, []);
  const dispatch = useDispatch();
  const restData = useSelector((state) => state);
  console.log("restData", restData);

  return (
    <Box>
      <Grid container>
        {restData?.data?.restaurantdata?.map((item, index) => (
          <Grid
            item
            xs={3}
            sx={{
              border: "1px solid yellow",
              display: "grid",
              placeItems: "center",
            }}
          >
            <RestaurantCard
              imgSrc={Swiggy}
              name={item?.name}
              rating={item?.rating}
              type={item?.type[0]}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
