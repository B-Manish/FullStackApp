import { Box, InputBase, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getRestaurantDetails } from "../../api/restaurantApi";

// import Swiggy from "../assets/swiggy.svg";
// import SwiggyRating from "../assets/swiggyrating.png";
// import Icon from "./Icon";

import DeliveryDetailsCard from "../../components/DeliveryDetailsCard";
import MenuItemCard from "../../components/MenuItemCard";

function RestaurantDetails() {
  const { restaurantID } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    getRestaurantDetails(restaurantID)
      .then((res) => {
        setData(res);
      })
      .catch(() => {});
  }, []);

  return (
    <Box sx={{ width: "800px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "800" }}>
        {data?.restaurant?.name}
      </Typography>

      <DeliveryDetailsCard
        rating={data?.restaurant?.rating}
        type={data?.restaurant?.type}
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
