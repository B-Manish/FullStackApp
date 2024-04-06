import { Paper, Box } from "@mui/material";
import React from "react";
import Swiggy from "../assets/swiggy.svg";
import Icon from "./Icon";
import NavbarCards from "./NavbarCards";

function Navbar() {
  const navbaritems = [
    { heading: "Search", hasSearch: true, hasSignin: false },
    { heading: "Sign In", hasSearch: false, hasSignin: true },
  ];
  return (
    <Paper
      sx={{
        height: "80px",
        width: "99.93vw",
        display: "grid",
        justifyContent: "center",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "50vw",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Icon src={Swiggy} imgWidth="37px" imgHeight="54px" />
        <Box sx={{ display: "flex" }}>
          {navbaritems.map((item, index) => (
            <Box
              key={item?.heading}
              sx={{
                display: "flex",
                marginRight: index !== navbaritems.length ? "60px" : "0px",
              }}
            >
              <NavbarCards
                heading={item?.heading}
                hasSearch={item?.hasSearch}
                hasSignin={item?.hasSignin}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

export default Navbar;
