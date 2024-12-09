import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import Orders from "../../components/Orders";
import Addresses from "../../components/Addresses";

function Profile() {
  const [tabValue, setTabValue] = useState("Orders");
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
            <Box
              onClick={() => setTabValue("Orders")}
              sx={{ cursor: "pointer" }}
            >
              ORDERS
            </Box>{" "}
            <Box
              onClick={() => setTabValue("Addresses")}
              sx={{ cursor: "pointer" }}
            >
              ADDRESSES
            </Box>
          </Grid>
          <Grid item xs={10}>
            {tabValue === "Orders" && (
              <Orders itemHeight={150} occupied={145} />
            )}
            {tabValue === "Addresses" && <Addresses />}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Profile;
