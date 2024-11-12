import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
// import OrderCard from "../../components/OrderCard";
import { getOrders } from "../api/restaurantApi";
import OrderCard from "./OrderCard";

function Orders({ totalOrders = 17, page, setPage }) {
  const [orders, setOrders] = useState([]);
  // const [page, setPage] = useState(1);
  const [renderedData, setRenderedData] = useState([]);

  const handleScroll = (e) => {
    const target = e.target;
    const scrollBottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;

    if (scrollBottom && orders?.length !== totalOrders) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (orders?.length !== totalOrders) {
      getOrders(page)
        .then((res) => {
          setOrders((prev) => {
            return [...prev, ...res.orders];
          });
        })
        .catch(() => {});
    }
  }, [page]);

  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);

  return (
    <Box sx={{ height: "1000px", overflowY: "scroll" }} onScroll={handleScroll}>
      {orders.map((order) => (
        <OrderCard key={order?.order_id} order={order} />
      ))}
    </Box>
  );
}

export default Orders;
