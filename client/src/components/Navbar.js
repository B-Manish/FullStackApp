import { Box, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swiggy from "../assets/swiggy.svg";
import Icon from "./Icon";
import NavbarCards from "./NavbarCards";
import CustomModal from "./CustomModal";
// import SignIn from "../containers/signin";
import Signin from "./SIgnin";
import Signupp from "./Signupp";
import { LoginContext } from "../context/LoginContext";
import { useMediaQuery } from "@mui/material";

function Navbar() {
  const navigate = useNavigate();
  const {
    username,
    isLoggedIn,
    cartData,
    extractUserInfoFromToken,
    selectedAddress,
  } = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const isSxScreen = useMediaQuery("(max-width:599px)");
  const [showSignIn, setShowSignIn] = useState(true);

  const openSigninModal = () => {
    if (!isLoggedIn) {
      setOpenModal(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const navbaritems = [
    {
      heading: "Search",
      hasSearch: true,
      hasSignin: false,
      clickHandler: () => navigate("/search"),
      isLoggedIn: isLoggedIn,
    },
    {
      heading: username !== "" ? username : "Sign In",
      hasSearch: false,
      hasSignin: true,
      clickHandler: openSigninModal,
      isLoggedIn: isLoggedIn,
    },

    {
      heading: "Cart",
      hasSearch: false,
      hasSignin: false,
      clickHandler: () => navigate("/cart"),
      isLoggedIn: isLoggedIn,
    },
  ];

  useEffect(() => {
    extractUserInfoFromToken();
  }, []);
  return (
    <Box
      sx={{
        height: "80px",
        width: "100%",
        display: "grid",
        justifyContent: "center",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        borderBottom: "1px solid grey",
      }}
    >
      <CustomModal open={openModal} handleClose={handleClose}>
        <Box>
          <Typography sx={{ color: "#282C3F", fontSize: "30px", mb: "7px" }}>
            {showSignIn ? "Login" : "Signup"}
          </Typography>
          <Box sx={{ display: "flex", mb: "20px" }}>
            <Box sx={{ mr: "4px" }}>or</Box>
            <Box
              onClick={() => setShowSignIn((prev) => !prev)}
              sx={{ cursor: "pointer", color: "orange" }}
            >
              {showSignIn ? "create an account" : "login to your account"}
            </Box>
          </Box>
          {showSignIn ? <Signin /> : <Signupp />}
        </Box>
      </CustomModal>
      <Box
        sx={{
          display: "flex",
          width: "50vw",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            onClick={() => navigate("/")}
            sx={{
              mr: "5px",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.2s ease",
              },
            }}
          >
            <Icon src={Swiggy} imgWidth="37px" imgHeight="54px" />
          </Box>
          <Box
            sx={{
              color: "#3d4152",
              fontSize: "14px",
              fontFamily: '"GilroyBold", sans-serif',
            }}
          >
            {selectedAddress?.nickname}
          </Box>
          <Box
            sx={{
              color: "#686b78",
              fontSize: "14px",
              whiteSpace: "nowrap",
              width: "300px",
              textOverflow: "ellipsis",
            }}
          >
            {selectedAddress?.address}
          </Box>
        </Box>
        {!isSxScreen && (
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
                  type={item?.type || "notsignin"}
                  isLoggedIn={item?.isLoggedIn}
                  cartCount={cartData?.items_count}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
