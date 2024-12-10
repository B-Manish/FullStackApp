import React, { useEffect, useState, useContext } from "react";
import { Box, Grid } from "@mui/material";
import { LoginContext } from "../context/LoginContext";
import CartItem from "./CartItem";
import { updateCart, addToCart } from "../api/restaurantApi";
import Empty from "../assets/empty.png";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";

const CartDetails = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();
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
      {cartData?.items_count === 0 ? (
        <Grid
          item
          xs={12}
          sx={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon src={Empty} imgHeight="250px" imgWidth="250px" />
          <Box sx={{ fontSize: "22px", m: "23px 0 7px 0" }}>
            Your cart is empty
          </Box>
          <Box sx={{ fontSize: "14px", mb: "30px" }}>
            You can go to home page to view more restaurants
          </Box>

          <Box
            onClick={() => navigate("/")}
            sx={{
              background: "#FC8019",
              height: "40px",
              color: "white",
              fontWeight: "700",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              padding: "0 10px",
            }}
          >
            SEE RESTAURANTS NEAR YOU
          </Box>
        </Grid>
      ) : (
        <>
          <Grid item xs={9}></Grid>
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
                      m: "10px 0 5px 0",
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
                    <Box>Delivery Fee:</Box>{" "}
                    {cartData?.billdetails?.deliveryfee}
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
                    <Box>Platform fee:</Box>{" "}
                    {cartData?.billdetails?.platformfee}
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
        </>
      )}
    </Grid>
  );
};

export default CartDetails;
