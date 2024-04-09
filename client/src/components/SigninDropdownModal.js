// RightModal.js
import React, { useContext } from "react";
import { Modal, Backdrop, Fade } from "@mui/material";
import { Box, Grid, Tab, Button } from "@mui/material";
import { LoginContext } from "../context/LoginContext";

const SignInDropDownModal = ({ open, handleClose }) => {
  const { logOut } = useContext(LoginContext);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
      //   closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            width: "200px",
            height: "300px",
            background: "white",
            height: "100%",
            boorder: "1px solid red",
          }}
        >
          <Box onClick={() => logOut} sx={{ cursor: "pointer" }}>
            logout
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignInDropDownModal;
