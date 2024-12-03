import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import Icon from "../../components/Icon";
import home from "../../assets/home.png";

function MySvgComponent() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 78 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.25939C27 -0.240624 53.5 -0.2406 77 4.25939"
        stroke="#FF5200"
        stroke-width="1.5"
      ></path>
    </svg>
  );
}

function Template({ screen, page = "nothome" }) {
  return (
    <Box sx={{ width: "99.93vw", display: "grid", placeItems: "center" }}>
      <Navbar />
      {page === "home" && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderBottomLeftRadius: "24px",
            borderBottomRightRadius: "24px",
            background:
              "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(255, 255, 255) 95.83%)",
          }}
        >
          <Box
            sx={{
              width: "80vw",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "grid", placeItems: "center" }}>
              <Box>
                <Box
                  sx={{
                    fontSize: "48px",
                    fontFamily: '"GilroyBold", sans-serif',
                    maxWidth: "350px",
                    display: "grid",
                    placeItems: "center",
                    color: "#3D3F48",
                  }}
                >
                  Order Food Online in Hyderabad
                </Box>
                <Box sx={{ width: "130px", height: "10px" }}>
                  <MySvgComponent />
                </Box>
              </Box>
            </Box>

            <Icon src={home} imgHeight="300px" imgWidth="500px" />
          </Box>
        </Box>
      )}
      <Box>{screen}</Box>
    </Box>
  );
}

export default Template;
