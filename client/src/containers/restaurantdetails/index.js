import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getRestaurantDetails } from "../../api/restaurantApi";
import DeliveryDetailsCard from "../../components/DeliveryDetailsCard";
import MenuItemCard from "../../components/MenuItemCard";

function RestaurantDetails() {
  const { restaurantID } = useParams();
  const [data, setData] = useState({});

  const [cartData, setCartData] = useState({
    cart_id: "1",
    billdetails: {
      deliveryfee: 0,
      gst: 0,
      haspremium: false,
      platformfee: 0,
      total: 0,
      item_total: 0,
    },
    branch: "branch",
    items: [],
    items_count: 0,
    restaurant_id: "",
    restaurant_name: "",
    username: "default",
  });

  useEffect(() => {
    getRestaurantDetails(restaurantID)
      .then((res) => {
        setData(res);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // localStorage.setItem("cartData", JSON.stringify(cartData));
    console.log("cartData", cartData);
  }, [cartData]);

  const ClickHandler = (item, isVeg = true) => {
    setCartData((prev) => ({
      ...prev,
      items_count: prev.items_count + 1,
      billdetails: {
        ...prev.billdetails,
        total: prev.billdetails.total + item?.price,
        item_total: prev.billdetails.item_total + item?.price,
      },
      items: [
        ...prev.items,
        { ...item, isVeg: isVeg === true ? true : false, count: 1 },
      ],
    }));
  };

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

      {data?.restaurant?.menu?.veg?.map((item) => (
        <MenuItemCard
          key={item.name}
          isVeg
          name={item?.name}
          cost={item?.price}
          rating={item?.rating}
          clickHandler={() => ClickHandler(item, true)}
        />
      ))}
      {data?.restaurant?.menu?.nonveg?.map((item) => (
        <MenuItemCard
          key={item.name}
          isVeg={false}
          name={item?.name}
          cost={item?.price}
          rating={item?.rating}
          clickHandler={() => ClickHandler(item, false)}
        />
      ))}
    </Box>
  );
}

export default RestaurantDetails;
