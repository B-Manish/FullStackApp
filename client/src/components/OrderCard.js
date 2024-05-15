import { Box } from "@mui/material";
import React from "react";

function OrderCard({ width = "100%" }) {
  return (
    <Box sx={{ width: width, border: "1px solid red", height: "auto" }}>
      Order Card
    </Box>
  );
}

export default OrderCard;
