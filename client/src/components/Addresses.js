import { Box, Grid } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import Maps from "./Maps";
import { getAdresses } from "../api/restaurantApi";
import { LoginContext } from "../context/LoginContext";

function Addresses() {
  const { email } = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getAdresses(email)
      .then((res) => {
        setAddresses(res?.addresses);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          fontFamily: '"GilroyBold", sans-serif',
          fontSize: "24px",
          mb: "15px",
        }}
      >
        Manage Addresses
      </Box>
      <Grid container>
        {addresses.map((address) => {
          return (
            <Grid item xs={6}>
              {address?.nickname}
            </Grid>
          );
        })}
      </Grid>

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
