import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import UserPool from "../../UserPool";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const onSubmit = (event) => {
    UserPool.signUp(
      email,
      password,
      [{ Name: "phone_number", Value: phone }],
      null,
      (err, data) => {
        if (err) {
          console.error(err);
        }
        if (data) {
          navigate("/signin");
        }
        console.log(data);
      }
    );
  };

  return (
    <Box sx={{ width: "360px" }}>
      <Typography
        sx={{ color: "#282C3F", fontSize: "30px", marginBottom: "50px" }}
      >
        Sign Up
      </Typography>
      <Box
        sx={{
          border: "1px solid #d4d5d9",
          height: "72px",
          padding: "7px 0 0 20px",
        }}
      >
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          InputLabelProps={{
            style: { color: "#93959f" },
          }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottom: "none",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "none",
            },
            "& .MuiInput-root": {
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          border: "1px solid #d4d5d9",
          height: "72px",
          padding: "7px 0 0 20px",
        }}
      >
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          InputLabelProps={{
            style: { color: "#93959f" },
          }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottom: "none",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "none",
            },
            "& .MuiInput-root": {
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          border: "1px solid #d4d5d9",
          height: "72px",
          padding: "7px 0 0 20px",
        }}
      >
        <TextField
          id="standard-basic"
          label="Phone"
          variant="standard"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          InputLabelProps={{
            style: { color: "#93959f" },
          }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottom: "none",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "none",
            },
            "& .MuiInput-root": {
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            },
          }}
        />
      </Box>

      <Box
        onClick={() => onSubmit()}
        sx={{
          background: "#FC8019",
          height: "50px",
          color: "white",
          fontWeight: "700",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          margin: "35px 0 0 0",
        }}
      >
        CONTINUE
      </Box>

      <Typography
        sx={{
          mt: "6px",
          color: "#686b78",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        By creating an account,I accept the Terms & Conditions & Privacy Policy
      </Typography>
    </Box>
  );
};
export default SignUp;
