import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { getOrders } from "../api/restaurantApi";
import OrderCard from "./OrderCard";
import Package from "./Package";

function Orders({
  itemHeight,
  occupied,
  itemsPerPage = Math.floor((window.innerHeight - occupied) / itemHeight) + 1,
}) {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);

  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(0);
  const containerRef = useRef(null);

  const containerHeight = itemHeight * (itemsPerPage + 1);
  const visibleItemCount = Math.ceil(containerHeight / itemHeight);

  const handleScroll = (e) => {
    const target = e.target;
    const scrollBottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;

    if (scrollBottom && orders?.length !== totalOrders) {
      setPage((prev) => prev + 1);
    }

    const scrollTop = containerRef.current.scrollTop;
    const startIdx = Math.floor(scrollTop / itemHeight);
    const endIdx = startIdx + visibleItemCount;

    setVisibleStart(startIdx);
    setVisibleEnd(endIdx);
  };

  useEffect(() => {
    setVisibleEnd(visibleStart + visibleItemCount);
  }, [visibleStart, visibleItemCount]);

  useEffect(() => {
    if (orders?.length <= totalOrders) {
      getOrders(page)
        .then((res) => {
          setOrders((prev) => {
            return [...prev, ...res.orders];
          });
          setTotalOrders(res.count);
        })
        .catch(() => {});
    }
  }, [page]);

  const item = ({ item }) => {
    return <OrderCard order={item} />;
  };

  return (
    <Package
      itemHeight={itemHeight}
      occupied={occupied}
      ItemComponent={item}
      data={orders}
      endReached={() => console.log("End reached")}
    />
  );
}

export default Orders;
