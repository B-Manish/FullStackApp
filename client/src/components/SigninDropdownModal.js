// RightModal.js
import React, { useContext } from "react";
import { Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const SignInDropDownModal = () => {
  const navigate = useNavigate();
  const { handleSignOut } = useContext(LoginContext);

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        margin: "152px 0 0 -40px",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "20px",
          height: "20px",
          border: "2px solid #FC8019",
          transform: "rotate(45deg)",
          zIndex: "9",
        }}
      ></Box>
      <Paper
        square
        elevation={3}
        sx={{
          width: "100%",
          height: "100%",
          margin: "-20px 0 0 0",
          zIndex: "100",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              height: "2px",
              borderTop: "2px solid #FC8019",
              width: "119px",
            }}
          />
          <Box
            sx={{
              height: "2px",
              width: "12px",
            }}
          />
          <Box
            sx={{
              height: "2px",
              borderTop: "2px solid #FC8019",
              width: "119px",
            }}
          />
        </Box>
        <Box sx={{ padding: "20px" }}>
          <Box
            onClick={() => goTo("/profile")}
            sx={{
              cursor: "pointer",
              marginBottom: "15px",
              "&:hover": {
                fontWeight: "500",
              },
            }}
          >
            Profile
          </Box>
          <Box
            onClick={() => {
              handleSignOut();
              goTo(`/`);
            }}
            sx={{
              cursor: "pointer",
              "&:hover": {
                fontWeight: "500",
              },
            }}
          >
            Logout
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignInDropDownModal;
