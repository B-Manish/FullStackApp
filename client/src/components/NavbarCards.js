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
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [openSigninDropdownModal, setOpenSigninDropdownModal] = useState(false);
  const openModal = () => {
    if (isLoggedIn === true && hasSignin && openSigninDropdownModal === false) {
      setOpenSigninDropdownModal(true);
    }
  };

  const handleClose = () => {
    setOpenSigninDropdownModal(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        cursor: "pointer",
        height: "80px",
        alignItems: "center",
        border: "1px solid red",
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
      <SignInDropDownModal
        open={openSigninDropdownModal}
        handleClose={handleClose}
      />
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
