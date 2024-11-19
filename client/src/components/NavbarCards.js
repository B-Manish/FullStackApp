import { Box, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Icon from "./Icon";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SignInDropDownModal from "./SigninDropdownModal";

function NavbarCards({
  img,
  heading,
  clickhandler,
  hasSearch,
  hasSignin = false,
  isLoggedIn,
  cartCount,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [openSigninDropdown, setOpenSigninDropdown] = useState(false);
  const openModal = () => {
    if (isLoggedIn === true && hasSignin && openSigninDropdown === false) {
      setOpenSigninDropdown(true);
    }
  };

  const handleClose = () => {
    setOpenSigninDropdown(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        cursor: "pointer",
        height: "80px",
        alignItems: "center",
        position: "relative",
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        openModal();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        handleClose();
      }}
      onClick={() => clickhandler()}
    >
      {isLoggedIn === true && hasSignin && openSigninDropdown && (
        <SignInDropDownModal />
      )}
      {img && <Icon src={img} />}
      {hasSearch && (
        <SearchIcon style={{ color: isHovered ? "#FC8019" : "#3D4152" }} />
      )}
      {hasSignin && (
        <PersonOutlineOutlinedIcon
          style={{ color: isHovered ? "#FC8019" : "#3D4152" }}
        />
      )}

      {heading === "Cart" && (
        <Box
          sx={{ fontSize: "16px", color: isHovered ? "#FC8019" : "#3D4152" }}
        >
          {cartCount}
        </Box>
      )}
      <Typography
        sx={{
          marginLeft: "5px",
          color: isHovered ? "#FC8019" : "#3D4152",
          fontSize: "16px",
          whiteSpace: "nowrap",
        }}
      >
        {heading}
      </Typography>
    </Box>
  );
}

export default NavbarCards;
