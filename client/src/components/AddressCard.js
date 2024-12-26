import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CustomModal from "./CustomModal";
import Maps from "./Maps";
import { deleteAddress } from "../api/restaurantApi";
import { LoginContext } from "../context/LoginContext";
import { setDeliveryAddress } from "../api/restaurantApi";

const AddressCard = ({ data, chooseAdress = false, time }) => {
  const { email, setSelectedAddress } = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [nickname, setNickname] = useState(data?.nickname);
  const [landmark, setLandmark] = useState(data?.landmark);
  const [address, setAddress] = useState(data?.address);
  const [door, setDoor] = useState(data?.door);
  const [currentLocation, setCurrentLocation] = useState({
    lat: parseFloat(data?.location?.lat),
    lng: parseFloat(data?.location?.lng),
  });

  const handleClose = () => {
    setOpenModal(false);
  };

  const removeAdress = (email, addresId) => {
    deleteAddress(email, addresId)
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };

  const setDelAddress = (email, address) => {
    setDeliveryAddress(email, address)
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });
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
          <Maps
            draggable={true}
            nickname={nickname}
            setNickname={setNickname}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            door={door}
            setDoor={setDoor}
            adressId={data?.adressId}
            landmark={landmark}
            setLandmark={setLandmark}
            address={address}
            setAddress={setAddress}
          />
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
          {data?.address}
        </Box>
        {!chooseAdress ? (
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
            <Box
              sx={{ fontSize: "14px", color: "#FF5200", cursor: "pointer" }}
              onClick={() => {
                removeAdress(email, data?.adressId);
              }}
            >
              DELETE
            </Box>
          </Box>
        ) : (
          <Box sx={{ fontSize: "13px" }}>
            <Box sx={{ mb: "7px" }}>{time}MINS</Box>

            <Box
              onClick={() => {
                setSelectedAddress(data);
                setDelAddress(email, data?.address);
              }}
              sx={{
                fontSize: "14px",
                color: "white",
                cursor: "pointer",
                background: "#60B246",
                height: "34px",
                display: "inline-flex",
                alignItems: "center",
                padding: "0 10px",
                fontFamily: '"GilroyBold", sans-serif',
              }}
            >
              DELIVER HERE
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddressCard;
