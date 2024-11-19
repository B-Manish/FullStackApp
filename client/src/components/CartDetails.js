import React, { useEffect, useState, useContext } from "react";
import { Box, Grid } from "@mui/material";
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
    <Grid container sx={{ maxWidth: "1200px", width: "100vw" }}>
      <Grid item xs={9}>
        l
      </Grid>
      <Grid item xs={3}>
        <Box>
          {isLoggedIn ? (
            <Box>Logged In</Box>
          ) : (
            <Box sx={{ padding: "10px" }}>
              <Box sx={{ display: "flex" }}>
                <Box>img</Box>
                <Box>
                  <Box sx={{ fontSize: "16px" }}>
                    {cartData?.restaurant_name}
                  </Box>
                  <Box sx={{ fontSize: "13px" }}>{cartData?.branch}</Box>
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
              <Box
                sx={{
                  fontSize: "13px",
                  fontFamily: '"GilroyBold", sans-serif',
                  mb: "5px ",
                  color: "#68687B",
                }}
              >
                Bill Details
              </Box>
              <Box
                sx={{
                  display: "flex",
                  fontSize: "13px",
                  justifyContent: "space-between",
                  mb: "5px ",
                  color: "#68687B",
                }}
              >
                <Box>Item Total : </Box>
                {cartData?.billdetails?.item_total}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  fontSize: "13px",
                  justifyContent: "space-between",
                  mb: "5px ",
                  color: "#68687B",
                }}
              >
                <Box>Delivery Fee:</Box> {cartData?.billdetails?.deliveryfee}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  fontSize: "13px",
                  justifyContent: "space-between",
                  mb: "5px ",
                  color: "#68687B",
                }}
              >
                <Box>Platform fee:</Box> {cartData?.billdetails?.platformfee}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  fontSize: "13px",
                  justifyContent: "space-between",
                  mb: "2px ",
                  color: "#68687B",
                }}
              >
                <Box> GST:</Box> {cartData?.billdetails?.gst}
              </Box>
              <Box
                sx={{
                  height: "1px",
                  background: "#68687B",
                  width: "100%",
                  mb: "5px ",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  fontSize: "14px",
                  justifyContent: "space-between",
                  mb: "5px ",
                  color: "black",
                  fontFamily: '"GilroyBold", sans-serif',
                }}
              >
                <Box>To Pay:</Box> ₹{cartData?.billdetails?.total}
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartDetails;
