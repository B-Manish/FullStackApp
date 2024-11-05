// RightModal.js
import React, { useEffect, useState } from "react";
import { Box, Grid ,Paper} from "@mui/material";
import Icon from "./Icon";
import Veg from "../assets/veg.png";
import NonVeg from "../assets/nonveg.png";

const CartDetails = ({ isLoggedIn = false }) => {
  const cartData = JSON.parse(localStorage.getItem("cartData"));
  const [itemTotal, setItemTotal] = useState(
    JSON.parse(localStorage.getItem("cartData"))?.billdetails?.item_total
  );

  const [total, setTotal] = useState(
    JSON.parse(localStorage.getItem("cartData"))?.billdetails?.total
  );

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
          {cartData?.items.map((item, index) => (
            <Box key={item?.name} sx={{ display: "flex" }}>
              {item?.isVeg === true ? (
                <Icon src={Veg} />
              ) : (
                <Icon src={NonVeg} />
              )}
              {item?.name}{" "}
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
                }}
              >
                <Grid container sx={{ height: "100%" }}>
                  <Grid
                    item
                    xs={4}
                    onClick={() => {
                      setItemTotal((prev) => prev - item?.price);
                      setTotal((prev) => prev - item?.price);
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
                  <Grid
                    item
                    xs={4}
                    sx={{ display: "grid", placeItems: "center" }}
                  >
                    {item?.count}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    onClick={() => {
                      setItemTotal((prev) => prev + item?.price);
                      setTotal((prev) => prev + item?.price);
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
              {item?.price}
            </Box>
          ))}
          <Box> Bill Details</Box>
          <Box sx={{ display: "flex" }}>Item Total : {itemTotal}</Box>
          <Box sx={{ display: "flex" }}>
            Delivery Fee: {cartData?.billdetails?.deliveryfee}
          </Box>
          <Box sx={{ display: "flex" }}>
            Platform fee: {cartData?.billdetails?.platformfee}
          </Box>
          <Box sx={{ display: "flex" }}>GST: {cartData?.billdetails?.gst}</Box>
          <Box sx={{ height: "1px", background: "black", width: "100%" }} />
          <Box sx={{ display: "flex" }}>To Pay:{total}</Box>
        </Box>
      )}
    </Box>
  );
};

export default CartDetails;
