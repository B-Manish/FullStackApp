import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import { LoginContext } from "../context/LoginContext";
import CartItem from "./CartItem";
import { updateCart, addToCart } from "../api/restaurantApi";

const CartDetails = ({ isLoggedIn = false }) => {
  const { cartData } = useContext(LoginContext);
  const itemTotal = JSON.parse(localStorage.getItem("cartData"))?.billdetails
    ?.item_total;
  const total = JSON.parse(localStorage.getItem("cartData"))?.billdetails
    ?.total;
  const [notInitialrender, setNotInitialRender] = useState(false);

  useEffect(() => {
    const updatedData = {
      ...cartData,
      billdetails: {
        ...cartData.billdetails,
        total: total,
        item_total: itemTotal,
      },
    };
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  }, [total, itemTotal]);

  useEffect(() => {
    setNotInitialRender(true);
  }, []);

  useEffect(() => {
    if (cartData?.items_count > 1 && notInitialrender) {
      updateCart("gg", cartData)
        .then((res) => {
          console.log("updated cart");
        })
        .catch(() => {
          console.log("error");
        });
    }
    if (cartData?.items_count === 1 && notInitialrender) {
      addToCart(cartData)
        .then((res) => {
          console.log("added to cart");
        })
        .catch(() => {
          console.log("error");
        });
    }
  }, [cartData]);

  return (
    <Box>
      {isLoggedIn ? (
        <Box>Logged In</Box>
      ) : (
        <Box sx={{ border: "1px solid red", padding: "10px" }}>
          <Box sx={{ display: "flex" }}>
            <Box>img</Box>
            <Box>
              <Box>{cartData?.restaurant_name}</Box>
              <Box>{cartData?.branch}</Box>
            </Box>
          </Box>
          {cartData?.items.map(
            (item) =>
              item?.count > 0 && (
                <Box key={item?.name}>
                  <CartItem cartitem={item} />
                </Box>
              )
          )}
          <Box> Bill Details</Box>
          <Box sx={{ display: "flex" }}>
            Item Total : {cartData?.billdetails?.item_total}
          </Box>
          <Box sx={{ display: "flex" }}>
            Delivery Fee: {cartData?.billdetails?.deliveryfee}
          </Box>
          <Box sx={{ display: "flex" }}>
            Platform fee: {cartData?.billdetails?.platformfee}
          </Box>
          <Box sx={{ display: "flex" }}>GST: {cartData?.billdetails?.gst}</Box>
          <Box sx={{ height: "1px", background: "black", width: "100%" }} />
          <Box sx={{ display: "flex" }}>
            To Pay:{cartData?.billdetails?.total}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartDetails;
