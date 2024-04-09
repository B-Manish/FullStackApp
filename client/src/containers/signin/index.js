import React, { useState, useContext } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../UserPool";
import { LoginContext } from "../../context/LoginContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername, setIsLoggedIn } = useContext(LoginContext);
  const onSubmit = (event) => {
    // event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess: ", data);
        console.log("data?.idToken?.email", data?.idToken?.email);
        setIsLoggedIn(true);
        setUsername("Cognito User");
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };
  return (
    <Box>
      {/* <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <button type="submit">SignIn</button>
      </form> */}

      <Box sx={{ width: "360px", margin: "20px 0 0 50px" }}>
        <Typography
          sx={{ color: "#282C3F", fontSize: "30px", marginBottom: "50px" }}
        >
          Login
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
          Login
        </Box>

        <Typography
          sx={{
            mt: "6px",
            color: "#686b78",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          By creating an account,I accept the Terms & Conditions & Privacy
          Policy
        </Typography>
      </Box>
    </Box>
  );
};
export default SignIn;
