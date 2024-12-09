import { Box, Grid } from "@mui/material";
import React, { useState, useContext } from "react";
import Orders from "../../components/Orders";
import Addresses from "../../components/Addresses";
import { LoginContext } from "../../context/LoginContext";

function Profile() {
  const [tabValue, setTabValue] = useState("Orders");
  const { username, email } = useContext(LoginContext);

  const profileItems = [
    { title: "Orders" },
    { title: "Addresses" },
    { title: "Favourites" },
  ];
  return (
    <Grid
      container
      sx={{
        width: "100vw",
        background: "#37718E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        height: "calc(100vh - 81px)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "80%", maxWidth: "1300px" }}>
        <Box sx={{ background: "#37718E", color: "white", padding: "0 20px" }}>
          <Box
            sx={{
              fontSize: "32px",
              mb: "4px",
              fontFamily: '"GilroyBold", sans-serif',
            }}
          >
            {username}
          </Box>
          <Box sx={{ fontSize: "16px" }}>{email}</Box>
        </Box>
        <Grid container sx={{ mt: "30px", background: "white" }}>
          <Grid
            item
            xs={2}
            sx={{ background: "#DFE3E8", p: "15px 0 15px 20px" }}
          >
            {profileItems.map((item) => {
              return (
                <Box
                  onClick={() => setTabValue(item?.title)}
                  sx={{
                    cursor: "pointer",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                    background: tabValue === item?.title ? "white" : "none",
                    fontFamily: '"GilroyBold", sans-serif',
                  }}
                >
                  {item?.title}
                </Box>
              );
            })}
          </Grid>
          <Grid item xs={10} sx={{ p: "15px 15px 0 15px" }}>
            {tabValue === "Orders" && (
              // <Orders itemHeight={150} occupied={145} />
              <Box
                sx={{
                  fontFamily: '"GilroyBold", sans-serif',
                  fontSize: "24px",
                  mb: "15px",
                }}
              >
                Orders
              </Box>
            )}
            {tabValue === "Addresses" && <Addresses />}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Profile;
