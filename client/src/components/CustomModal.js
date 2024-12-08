// RightModal.js
import React from "react";
import { Modal, Backdrop, Fade } from "@mui/material";
import { Box, Grid, Tab, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
      closeAfterTransition
      //   BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            width: "40%",
            background: "white",
            height: "100%",
            outline: "none",
            padding: "20px",
          }}
        >
          <Box onClick={handleClose} sx={{ cursor: "pointer", mt: "20px" }}>
            <CloseIcon />
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
