import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

function Package({
  itemHeight,
  occupied,
  itemsPerPage = Math.floor((window.innerHeight - occupied) / itemHeight) + 1,
  data,
  endReached,
  ItemComponent,
}) {
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(0);
  const containerRef = useRef(null);

  const containerHeight = itemHeight * (itemsPerPage + 1);
  const visibleItemCount = Math.ceil(containerHeight / itemHeight);

  const handleScroll = (e) => {
    const target = e.target;
    const scrollBottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;

    if (scrollBottom) {
      endReached();
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

  return (
    <Box
      sx={{
        height: `${window.innerHeight - occupied}px`,
        overflowY: "scroll",
        border: "1px solid red",
      }}
      onScroll={handleScroll}
      ref={containerRef}
    >
      <Box sx={{ position: "relative" }}>
        {data.slice(visibleStart, visibleEnd).map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: `${(index + visibleStart) * itemHeight}px`,
              width: "100%",
              height: `${itemHeight}px`,
              overflow: "hidden",
            }}
          >
            <ItemComponent item={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Package;
