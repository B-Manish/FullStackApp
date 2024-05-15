import { Box } from "@mui/material";
import React from "react";
import OrderCard from "../../components/OrderCard";

function Profile() {
  return (
    <Box
      sx={{
        width: "99.93vw",
        border: "1px solid red",
        background: "#37718E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%", height: "50vh" }}>
        <Box sx={{ background: "#37718E" }}>
          <Box>Manish</Box>
          <Box sx={{ display: "flex" }}>
            <Box>9949055750</Box>
            <Box>batchumanish@gmail.com</Box>
          </Box>
        </Box>
        <Box
          sx={{ background: "white", height: "100%", border: "1px solid red" }}
        >
          <OrderCard />
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
