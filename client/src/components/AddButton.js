import { Box, Paper, Grid } from "@mui/material";
import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

function AddButton({ top = "130px", clickHandler, count, setCount, Item }) {
  const { setCartData } = useContext(LoginContext);
  const increaseCount = () => {
    setCount((prev) => prev + 1);
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
        clickHandler();
        increaseCount();
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
            setCount((prev) => prev - 1);
            setCartData((prev) => {
              const itemIndex = prev.items.findIndex(
                (item) => item.mid === Item.mid
              );

              if (itemIndex === -1) {
                return {
                  ...prev,
                  items: [...prev.items, { ...Item, mid: Item.mid, count: 1 }],
                  billdetails: {
                    ...prev.billdetails,
                    total: prev.billdetails.total - Item.price,
                    item_total: prev.billdetails.item_total - Item.price,
                  },
                  items_count: prev.items_count - 1,
                };
              } else {
                const updatedItems = [...prev.items];
                updatedItems[itemIndex] = {
                  ...Item,
                  ...updatedItems[itemIndex],
                  count: updatedItems[itemIndex].count - 1,
                };

                return {
                  ...prev,
                  items: updatedItems,
                  billdetails: {
                    ...prev.billdetails,
                    total: prev.billdetails.total - Item.price,
                    item_total: prev.billdetails.item_total - Item.price,
                  },
                  items_count: prev.items_count - 1,
                };
              }
            });
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
            setCount((prev) => prev + 1);
            setCartData((prev) => {
              const itemIndex = prev.items.findIndex(
                (item) => item.mid === Item.mid
              );

              if (itemIndex === -1) {
                return {
                  ...prev,
                  items: [...prev.items, { ...Item, mid: Item.mid, count: 1 }],
                  billdetails: {
                    ...prev.billdetails,
                    total: prev.billdetails.total + Item.price,
                    item_total: prev.billdetails.item_total + Item.price,
                  },
                  items_count: prev.items_count + 1,
                };
              } else {
                const updatedItems = [...prev.items];
                updatedItems[itemIndex] = {
                  ...Item,
                  ...updatedItems[itemIndex],
                  count: updatedItems[itemIndex].count + 1,
                };

                return {
                  ...prev,
                  items: updatedItems,
                  billdetails: {
                    ...prev.billdetails,
                    total: prev.billdetails.total + Item.price,
                    item_total: prev.billdetails.item_total + Item.price,
                  },
                  items_count: prev.items_count + 1,
                };
              }
            });
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
