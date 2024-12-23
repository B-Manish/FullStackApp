import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Paper } from "@mui/material";
import AddButton from "./AddButton";
import { LoginContext } from "../context/LoginContext";
import Icon from "./Icon";
import Veg from "../assets/veg.png";
import NonVeg from "../assets/nonveg.png";

const CartItem = ({ cartitem }) => {
  const [count, setCount] = useState(0);
  const { cartData, setCartData } = useContext(LoginContext);

  useEffect(() => {
    setCount(
      !cartData?.items[
        cartData?.items.findIndex((dish) => cartitem?.name === dish?.name)
      ]?.count
        ? 0
        : cartData?.items[
            cartData?.items.findIndex((dish) => cartitem?.name === dish?.name)
          ]?.count
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const ClickHandler = (Item, isVeg = true) => {
    setCartData((prev) => {
      const itemIndex = prev.items.findIndex((item) => item.name === Item.name);

      if (itemIndex === -1) {
        return {
          ...prev,
          items: [...prev.items, { ...Item, name: Item.name, count: 1 }],
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
          count: updatedItems[itemIndex]?.count + 1,
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
  };
  return (
    <Grid container>
      <Grid item xs={6.5} sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: "5px" }}>
          {cartitem.veg_or_non_veg === "Veg" ? (
            <Icon src={Veg} />
          ) : (
            <Icon src={NonVeg} />
          )}
        </Box>
        <Box
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
          }}
        >
          {cartitem?.name}
        </Box>
      </Grid>
      <Grid
        item
        xs={5.5}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <AddButton
          clickHandler={() => ClickHandler(cartitem)}
          count={count}
          setCount={setCount}
          Item={cartitem}
          updateCount={true}
        />
        <Box
          sx={{
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            color: "#55665",
          }}
        >
          ₹{cartitem?.price * cartitem?.count}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartItem;
