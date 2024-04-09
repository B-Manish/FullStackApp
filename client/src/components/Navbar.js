import { Paper, Box } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swiggy from "../assets/swiggy.svg";
import Icon from "./Icon";
import NavbarCards from "./NavbarCards";
import CustomModal from "./CustomModal";
import SignIn from "../containers/signin";
import { LoginContext } from "../context/LoginContext";

function Navbar() {
  const navigate = useNavigate();
  const { username, isLoggedIn } = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const ppp = () => {
    console.log("p");
  };

  const openSigninModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const navbaritems = [
    {
      heading: "Search",
      hasSearch: true,
      hasSignin: false,
      clickHandler: ppp,
    },
    {
      heading: isLoggedIn ? username : "Sign In",
      hasSearch: false,
      hasSignin: true,
      clickHandler: openSigninModal,
    },
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
      <CustomModal open={openModal} handleClose={handleClose}>
        <SignIn />
      </CustomModal>
      <Box
        sx={{
          display: "flex",
          width: "50vw",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.2s ease",
            },
          }}
        >
          <Icon src={Swiggy} imgWidth="37px" imgHeight="54px" />
        </Box>

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
                clickhandler={item?.clickHandler}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

export default Navbar;
