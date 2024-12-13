import React, { useEffect, useState, useContext } from "react";
import { Box, Grid } from "@mui/material";
import { LoginContext } from "../context/LoginContext";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import { updateCart, addToCart, getAdresses } from "../api/restaurantApi";
import Empty from "../assets/empty.png";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";

const CartDetails = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();
  const { email } = useContext(LoginContext);
  const { cartData } = useContext(LoginContext);
  const itemTotal = JSON.parse(localStorage.getItem("cartData"))?.billdetails
    ?.item_total;
  const total = JSON.parse(localStorage.getItem("cartData"))?.billdetails
    ?.total;
  const [notInitialrender, setNotInitialRender] = useState(false);
  const [addresses, setAddresses] = useState([]);

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

  useEffect(() => {
    if (email !== "") {
      getAdresses(email)
        .then((res) => {
          setAddresses(res?.addresses);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [email]);

  return (
    <Box
      sx={{
        width: "100vw",
        background: "#E9ECEE",
        display: "flex",
        justifyContent: "center",
        p: "30px 20px 0 20px",
      }}
    >
      <Grid container sx={{ maxWidth: "1200px", background: "white" }}>
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
            <Grid item xs={8} sx={{ background: "#E9ECEE" }}>
              <Box sx={{ background: "white", padding: "20px", mb: "25px" }}>
                <Box
                  sx={{
                    fontSize: "21px",
                    fontFamily: '"GilroyBold", sans-serif',
                    color: "#282c3f",
                    mb: "10px",
                  }}
                >
                  Account
                </Box>
                <Box
                  sx={{
                    fontSize: "16px",
                    fontFamily: '"GilroyBold", sans-serif',
                    color: "#7e808c",
                    mb: "15px",
                  }}
                >
                  To place your order now, log in to your existing account or
                  sign up.
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      color: "#60b246",
                      border: "1px solid #60b246",
                      padding: "7px 15px",
                      width: "140px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mr: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <Box sx={{ fontSize: "13px", mb: "2px" }}>
                      Have an account?
                    </Box>
                    <Box
                      sx={{
                        fontSize: "14px",
                        fontFamily: '"GilroyBold", sans-serif',
                      }}
                    >
                      LOG IN
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      background: "#60b246",
                      color: "white",
                      border: "1px solid #60b246",
                      padding: "7px 15px",
                      width: "140px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Box sx={{ fontSize: "13px", mb: "2px" }}>
                      New to Swiggy?
                    </Box>
                    <Box
                      sx={{
                        fontSize: "14px",
                        fontFamily: '"GilroyBold", sans-serif',
                      }}
                    >
                      SIGN UP
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ background: "white", padding: "20px" }}>
                <Box
                  sx={{
                    fontSize: "21px",
                    fontFamily: '"GilroyBold", sans-serif',
                    color: "#282c3f",
                    mb: "20px",
                  }}
                >
                  Choose a delivery address
                </Box>
                <Grid container>
                  {addresses.map((address) => {
                    return (
                      <Grid item xs={6} sx={{ pr: "10px" }}>
                        <AddressCard data={address} chooseAdress time="13" />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={0.2} sx={{ background: "#E9ECEE" }}></Grid>
            <Grid item xs={3.8}>
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
                          <Box key={item?.name} sx={{ mb: "4px" }}>
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
    </Box>
  );
};

export default CartDetails;
