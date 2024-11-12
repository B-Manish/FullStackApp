import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
// import OrderCard from "../../components/OrderCard";
import { getOrders } from "../api/restaurantApi";
import OrderCard from "./OrderCard";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res?.orders);
      })
      .catch(() => {});
  }, []);
  return (
    <Box>
      {orders.map((order) => (
        <OrderCard key={order?.order_id} order={order} />
      ))}
    </Box>
  );
}

export default Orders;
