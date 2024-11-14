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

  function isWithinTimeRange(starttiming, endtiming) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    const [hours1, minutes1] = currentTime?.split(":").map(Number);
    const [hours2, minutes2] = starttiming?.split(":").map(Number);
    const [hours3, minutes3] = endtiming?.split(":").map(Number);

    const currentdate = new Date();
    currentdate.setHours(hours1, minutes1, 0, 0);

    const date2 = new Date();
    date2.setHours(hours2, minutes2, 0, 0);

    const date3 = new Date();
    date3.setHours(hours3, minutes3, 0, 0);

    if (currentdate > date2 && currentdate < date3) {
      return true;
    } else {
      return false;
    }
  }

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
        {!isWithinTimeRange(
          item?.availabletiming.starttime,
          item?.availabletiming.endtime
        ) ? (
          <>item not available</>
        ) : (
          <AddButton
            clickHandler={clickHandler}
            count={count}
            setCount={setCount}
            Item={item}
            absolute
          />
        )}

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
