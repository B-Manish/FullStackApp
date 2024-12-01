import { Box, Paper, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";

function AddButton({
  top = "130px",
  clickHandler,
  count,
  setCount,
  Item,
  absolute = false,
  updateCount,
}) {
  const { cartData, setCartData, setCartRestaurant } = useContext(LoginContext);
  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

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
        position: absolute === true && "absolute",
        top: top,
      }}
      onClick={() => {
        if (updateCount === true) {
          clickHandler();
          increaseCount();
        }
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
        position: absolute === true && "absolute",
        top: top,
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={4}
          onClick={() => {
            if (updateCount === true) {
              if (cartData?.items_count === 1) setCartRestaurant("");
              setCount((prev) => prev - 1);
              setCartData((prev) => {
                const itemIndex = prev.items.findIndex(
                  (item) => item.name === Item.name
                );

                if (itemIndex === -1) {
                  return {
                    ...prev,
                    items: [
                      ...prev.items,
                      { ...Item, name: Item.name, count: 1 },
                    ],
                    billdetails: {
                      ...prev.billdetails,
                      total: prev.billdetails.total - Number(Item.price),
                      item_total:
                        prev.billdetails.item_total - Number(Item.price),
                    },
                    items_count: prev.items_count - 1,
                  };
                } else {
                  const updatedItems = [...prev.items];
                  updatedItems[itemIndex] = {
                    ...Item,
                    ...updatedItems[itemIndex],
                    count: updatedItems[itemIndex]?.count - 1,
                  };

                  return {
                    ...prev,
                    items: updatedItems,
                    billdetails: {
                      ...prev.billdetails,
                      total: prev.billdetails.total - Number(Item.price),
                      item_total:
                        prev.billdetails.item_total - Number(Item.price),
                    },
                    items_count: prev.items_count - 1,
                  };
                }
              });
            }
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
            if (updateCount === true) {
              setCount((prev) => prev + 1);
              setCartData((prev) => {
                const itemIndex = prev.items.findIndex(
                  (item) => item.name === Item.name
                );

                if (itemIndex === -1) {
                  return {
                    ...prev,
                    items: [
                      ...prev.items,
                      { ...Item, name: Item.name, count: 1 },
                    ],
                    billdetails: {
                      ...prev.billdetails,
                      total: prev.billdetails.total + Number(Item.price),
                      item_total:
                        prev.billdetails.item_total + Number(Item.price),
                    },
                    items_count: prev.items_count + 1,
                  };
                } else {
                  const updatedItems = [...prev.items];
                  updatedItems[itemIndex] = {
                    ...Item,
                    ...updatedItems[itemIndex],
                    count: updatedItems[itemIndex]?.count + 1,
                  };

                  return {
                    ...prev,
                    items: updatedItems,
                    billdetails: {
                      ...prev.billdetails,
                      total: prev.billdetails.total + Number(Item.price),
                      item_total:
                        prev.billdetails.item_total + Number(Item.price),
                    },
                    items_count: prev.items_count + 1,
                  };
                }
              });
            }
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
