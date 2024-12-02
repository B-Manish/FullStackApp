import { Box, Grid } from "@mui/material";
import React from "react";
import Icon from "./Icon";

function OrderCard({ order }) {
  return (
    <Box sx={{ border: "1px solid red", padding: "20px", background: "white" }}>
      <Grid container>
        <Grid item xs={2}>
          <Icon src={order?.img} />
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>{order?.restaurantname}</Box>
            <Box>Delivered on {order?.deliverytime}</Box>
          </Box>
          <Box>{order?.branch}</Box>
          <Box>ORDER #{order?.order_id}</Box>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          {order?.items.map((item) => item?.name)}
        </Box>
        <Box>Total Paid {order?.billdetails?.total}</Box>
      </Box>
      <Box
        sx={{
          fontSize: "20px",
          padding: "5px",
          background: "#FF5200",
          width: "100px",
          cursor: "pointer",
        }}
      >
        REORDER
      </Box>
    </Box>
  );
}

export default OrderCard;
