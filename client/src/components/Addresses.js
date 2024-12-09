import { Box } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import Maps from "./Maps";

function Addresses() {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      <Box>MANAGE ADDRESSES</Box>

      <Box onClick={() => setOpenModal(true)}>Add Address</Box>
      <CustomModal
        open={openModal}
        handleClose={handleClose}
        width="100%"
        haveCloseIcon={true}
      >
        <Box sx={{ width: "70%" }}>
          <Maps draggable={true} />
        </Box>
      </CustomModal>
    </Box>
  );
}

export default Addresses;
