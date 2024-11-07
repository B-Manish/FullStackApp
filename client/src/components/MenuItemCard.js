import { Box, InputBase, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Veg from "../assets/veg.png";
import NonVeg from "../assets/nonveg.png";
import Saravana from "../assets/saravanabhavan.png";
import PlaceHolder from "../assets/placeholder.png";
import Star from "../assets/greenstar.png";
import AddButton from "./AddButton";
import Icon from "./Icon";
import { LoginContext } from "../context/LoginContext";

function MenuItemCard({ img, isVeg, name, cost, rating, clickHandler, item }) {
  const [count, setCount] = useState(0);
  const { cartData } = useContext(LoginContext);

  useEffect(() => {
    setCount(
      !cartData?.items[
        cartData?.items.findIndex((dish) => item?.mid === dish?.mid)
      ]?.count
        ? 0
        : cartData?.items[
            cartData?.items.findIndex((dish) => item?.mid === dish?.mid)
          ]?.count
    );
  }, []);

  return (
    <Grid
      container
      sx={{
        minHeight: "100px",
        borderTop: ".5px solid #d3d3d3",
        borderBottom: ".5px solid #d3d3d3",
        display: "flex",
        padding: "20px 0",
      }}
    >
      <Grid item xs={8}>
        {isVeg === true ? <Icon src={Veg} /> : <Icon src={NonVeg} />}
        <Typography sx={{ color: "#02060CBF", fontSize: "18px" }}>
          {name}
        </Typography>
        <Typography sx={{ color: "#02060CEB", fontSize: "16px" }}>
          {cost}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Icon
            src={Star}
            imgHeight="14px"
            imgWidth="14px"
            margin="0 5px 0 0"
          />
          <Typography
            sx={{
              color: "#116649",
              fontSize: "13px",
              fontWeight: "700",
              lineHeight: "16px",
            }}
          >
            {rating}
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={4}
        sx={{ display: "grid", placeItems: "center", position: "relative" }}
      >
        <AddButton
          clickHandler={clickHandler}
          count={count}
          setCount={setCount}
          Item={item}
        />
        {!img ? (
          <Icon
            src={PlaceHolder}
            imgHeight="155px"
            imgWidth="155px"
            isRounded
          />
        ) : (
          <Icon src={Saravana} imgHeight="155px" imgWidth="155px" isRounded />
        )}
      </Grid>
    </Grid>
  );
}

export default MenuItemCard;
