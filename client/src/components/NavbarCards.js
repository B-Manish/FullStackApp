import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

function NavbarCards({ img, heading, clickhandler, hasSearch, hasSignin }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        cursor: "pointer",
        height: "80px",
        alignItems: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => clickhandler()}
    >
      {img && <Icon src={img} />}
      {hasSearch && (
        <SearchIcon style={{ color: isHovered ? "#FC8019" : "#3D4152" }} />
      )}
      {hasSignin && (
        <PersonOutlineOutlinedIcon
          style={{ color: isHovered ? "#FC8019" : "#3D4152" }}
        />
      )}
      <Typography
        sx={{
          marginLeft: "5px",
          color: isHovered ? "#FC8019" : "#3D4152",
          fontSize: "16px",
        }}
      >
        {heading}
      </Typography>
    </Box>
  );
}

export default NavbarCards;
