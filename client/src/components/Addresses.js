import { Box, Grid } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import Maps from "./Maps";
import { getAdresses } from "../api/restaurantApi";
import { LoginContext } from "../context/LoginContext";
import AddressCard from "./AddressCard";

function Addresses() {
  const { email } = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [nickname, setNickname] = useState("");
  const [landmark, setLandmark] = useState("");
  const [door, setDoor] = useState("");

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
            <Grid item xs={6} sx={{ pr: "10px" }}>
              <AddressCard data={address} />
            </Grid>
          );
        })}
      </Grid>

      <Box
        onClick={() => setOpenModal(true)}
        sx={{ mt: "15px", cursor: "pointer" }}
      >
        Add Address
      </Box>
      <CustomModal
        open={openModal}
        handleClose={handleClose}
        width="40%"
        haveCloseIcon={true}
      >
        <Maps
          draggable={true}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          address={address}
          setAddress={setAddress}
          nickname={nickname}
          setNickname={setNickname}
          door={door}
          setDoor={setDoor}
          landmark={landmark}
          setLandmark={setLandmark}
          add
        />
      </CustomModal>
    </Box>
  );
}

export default Addresses;
