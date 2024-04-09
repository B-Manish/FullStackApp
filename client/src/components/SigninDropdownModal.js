// RightModal.js
import React from "react";
import { Modal, Backdrop, Fade } from "@mui/material";
import { Box, Grid, Tab, Button } from "@mui/material";
const SignInDropDownModal = ({ open, handleClose }) => {
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
          signindropdownmodal
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignInDropDownModal;
