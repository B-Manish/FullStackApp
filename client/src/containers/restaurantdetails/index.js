import { Box, InputBase, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchrestaurantdata } from "../../redux/restaurantDataSlice";

// import Swiggy from "../assets/swiggy.svg";
// import SwiggyRating from "../assets/swiggyrating.png";
// import Icon from "./Icon";

import DeliveryDetailsCard from "../../components/DeliveryDetailsCard";
import MenuItemCard from "../../components/MenuItemCard";

function RestaurantDetails() {
  const { restaurantID } = useParams();
  const dispatch = useDispatch();

  const data = {
    restaurant: {
      _id: "660c3aa1736d2ea7a0dbf836",
      name: "Saravana Bhavan",
      type: ["South Indian"],
      locations: ["Perungudi", "Anna Nagar"],
      timings: "7AM-10PM",
      rating: 4.4,
      menu: {
        veg: [
          {
            name: "idli",
            price: "Rs.30",
            rating: 4.3,
          },
          {
            name: "dosa",
            price: "Rs.50",
            rating: 4.3,
          },
          {
            name: "pongal",
            price: "Rs.70",
            rating: 4.5,
          },
        ],
        nonveg: null,
      },
    },
  };

  useEffect(() => {
    dispatch(fetchrestaurantdata(restaurantID));
  }, [restaurantID]);

  const gg = useSelector((state) => state);

  // useEffect(() => {
  //   console.log("detail", gg);
  // }, [gg, restaurantID]);

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
        <MenuItemCard />
      ))}
    </Box>
  );
}

export default RestaurantDetails;
