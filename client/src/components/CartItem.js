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
        cartData?.items.findIndex((dish) => cartitem?.mid === dish?.mid)
      ]?.count
        ? 0
        : cartData?.items[
            cartData?.items.findIndex((dish) => cartitem?.mid === dish?.mid)
          ]?.count
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const ClickHandler = (Item, isVeg = true) => {
    setCartData((prev) => {
      const itemIndex = prev.items.findIndex((item) => item.mid === Item.mid);

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
    <Box sx={{ display: "flex" }}>
      {cartitem.isVeg === true ? <Icon src={Veg} /> : <Icon src={NonVeg} />}
      {cartitem?.name}
      <AddButton
        clickHandler={() => ClickHandler(cartitem)}
        count={count}
        setCount={setCount}
        Item={cartitem}
      />
      {cartitem?.price * cartitem?.count}
    </Box>
  );
};

export default CartItem;
