import { Box, InputBase, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// import Swiggy from "../assets/swiggy.svg";
// import SwiggyRating from "../assets/swiggyrating.png";
// import Icon from "./Icon";

import DeliveryDetailsCard from "../../components/DeliveryDetailsCard";
import MenuItemCard from "../../components/MenuItemCard";
import { getRestaurantData } from "../../api/swiggyApi";

function RestaurantDetails() {
  const { restaurantID } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    getRestaurantData(restaurantID)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.error(error);
        setData({});
      });
  }, []);

  return (
    <Box sx={{ width: "800px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "800" }}>
        {data?.restaurant?.name}
      </Typography>

      <DeliveryDetailsCard
        rating={data?.restaurant?.rating}
        type={data?.restaurant?.type}
        // type={["Pizza"]}
        margin="0 0 50px 0"
      />

      {data?.restaurant?.menu?.veg?.map((item, index) => (
        <MenuItemCard
          key={item.name}
          isVeg
          name={item?.name}
          cost={item?.price}
          rating={item?.rating}
        />
      ))}
      {data?.restaurant?.menu?.nonveg?.map((item, index) => (
        <MenuItemCard
          key={item.name}
          isVeg={false}
          name={item?.name}
          cost={item?.price}
          rating={item?.rating}
        />
      ))}
    </Box>
  );
}

export default RestaurantDetails;
