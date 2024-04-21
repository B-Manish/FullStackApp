// RightModal.js
import React, { useContext } from "react";
import { Box, Paper } from "@mui/material";
import { LoginContext } from "../context/LoginContext";

const SignInDropDownModal = () => {
  const { logOut } = useContext(LoginContext);
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
            onClick={() => logOut()}
            sx={{
              cursor: "pointer",
              "&:hover": {
                fontWeight: "600",
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
