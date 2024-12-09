import React, { useState } from "react";
import { Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CustomModal from "./CustomModal";
import Maps from "./Maps";

const AddressCard = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        padding: "15px 15px 20px 15px",
        border: "1px solid #d4d5d9",
      }}
    >
      <CustomModal
        open={openModal}
        handleClose={handleClose}
        haveCloseIcon={true}
      >
        <Box>
          <Maps draggable={true} />
        </Box>
      </CustomModal>
      <HomeOutlinedIcon />
      <Box sx={{ ml: "10px" }}>
        <Box
          sx={{
            color: "#3D4152",
            fontSize: "17px",
            mb: "5px",
            fontFamily: '"GilroyMedium", sans-serif',
          }}
        >
          {data?.nickname}
        </Box>
        <Box sx={{ color: "#525665", fontSize: "13px", mb: "8px" }}>
          {data?.location?.address}
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            onClick={() => setOpenModal(true)}
            sx={{
              fontSize: "14px",
              color: "#FF5200",
              mr: "15px",
              cursor: "pointer",
            }}
          >
            EDIT
          </Box>
          <Box sx={{ fontSize: "14px", color: "#FF5200", cursor: "pointer" }}>
            DELETE
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddressCard;
