import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import Orders from "../../components/Orders";

function Profile() {
  return (
    <Grid
      container
      sx={{
        width: "100vw",
        maxWidth: "1300px",
        border: "1px solid red",
        background: "#37718E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        height: "calc(100vh - 80px)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ background: "#37718E" }}>
          <Box>Manish</Box>
          <Box sx={{ display: "flex" }}>
            <Box>9949055750</Box>
            <Box>batchumanish@gmail.com</Box>
          </Box>
        </Box>
        <Grid container sx={{ mt: "10px" }}>
          <Grid item xs={2}>
            ORDERS
          </Grid>
          <Grid item xs={10}>
            <Orders itemHeight={150} occupied={145}  />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Profile;
