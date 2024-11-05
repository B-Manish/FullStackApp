import { Box, Paper, Grid } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context/LoginContext";

function AddButton({ top = "130px" }) {
  const [count, setCount] = useState(0);
  const { setCartCount } = useContext(LoginContext);
  const cartData = {
    cart_id: "1",
    billdetails: {
      deliveryfee: 0,
      gst: 0,
      haspremium: false,
      platformfee: 0,
      total: 600,
      item_total: 600,
    },
    branch: "branch",
    items: [
      {
        mid: "1",
        name: "chicken pizza",
        price: 350,
        rating: 4.2,
        isVeg: false,
        count: 1,
      },
      {
        mid: "2",
        name: "veg pizza",
        price: 250,
        rating: 3.9,
        isVeg: true,
        count: 1,
      },
    ],
    items_count:2,
    restaurant_id: "r1",
    restaurant_name: "Ovenstory",
    username: "default",
  };
  return count === 0 ? (
    <Paper
      sx={{
        height: "38px",
        width: "120px",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        color: "#1BA672",
        fontSize: "18px",
        fontWeight: "800",
        "&:hover": {
          background: "rgb(226, 226, 231)",
        },
        position: "absolute",
        top: top,
      }}
      onClick={() => {
        // setCount(count + 1);
        // setCartCount((prev) => prev + 1);
        // localStorage.setItem("cartData", JSON.stringify(cartData));
      }}
    >
      ADD
    </Paper>
  ) : (
    <Paper
      sx={{
        height: "38px",
        width: "120px",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        color: "#1BA672",
        fontSize: "18px",
        fontWeight: "800",
        position: "absolute",
        top: top,
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={4}
          onClick={() => {
            setCount(count - 1);
            setCartCount((prev) => prev - 1);
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              "&:hover": {
                background: "rgb(226, 226, 231)",
              },
            }}
          >
            -
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ display: "grid", placeItems: "center" }}>
          {count}
        </Grid>
        <Grid
          item
          xs={4}
          onClick={() => {
            setCount(count + 1);
            setCartCount((prev) => prev + 1);
          }}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
              "&:hover": {
                background: "rgb(226, 226, 231)",
              },
            }}
          >
            +
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddButton;
