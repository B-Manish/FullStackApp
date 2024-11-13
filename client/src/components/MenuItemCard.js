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

  function isWithinTimeRange(timing) {
    // Get the current time from Date object
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    console.log("now",now);

    // Extract the start and end times from the timing string (assumed in HH:mm format)
    const [startTime, endTime] = timing.split("-");

    // Convert start and end times to minutes
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (startTotalMinutes <= endTotalMinutes) {
      // If start and end are on the same day
      return (
        currentTotalMinutes >= startTotalMinutes &&
        currentTotalMinutes <= endTotalMinutes
      );
    } else {
      // If the time range crosses midnight
      return (
        currentTotalMinutes >= startTotalMinutes ||
        currentTotalMinutes <= endTotalMinutes
      );
    }
  }

  useEffect(() => {
    console.log("isWithinTimeRange",isWithinTimeRange(item?.availabletiming));
    console.log("item?.availabletiming",item?.availabletiming)
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
        gg
        {isWithinTimeRange(item?.availabletiming) ? (
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
