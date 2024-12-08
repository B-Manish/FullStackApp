import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { userPool } from "../aws-cognito"; // Cognito User Pool configuration
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInMessage, setSignInMessage] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: username, // This should be the email/phone number used during sign-up
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    // Authenticate the user
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setSignInMessage(
          "Sign-in successful! Access Token: " +
            result.getAccessToken().getJwtToken()
        );
        setSignInError("");
        console.log("result", result);
      },
      onFailure: (err) => {
        setSignInError("Error during sign-in: " + err.message);
        setSignInMessage("");
      },
    });
  };

  return (
    // <div>
    //   <h2>Sign In</h2>
    //   <form onSubmit={handleSignIn}>
    //     <input
    //       type="text"
    //       placeholder="Username (email/phone)"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Sign In</button>
    //   </form>
    //   {signInError && <p>{signInError}</p>}
    //   {signInMessage && <p>{signInMessage}</p>}
    // </div>

    <Box sx={{ width: "360px" }}>
      <Box
        sx={{
          border: "1px solid #d4d5d9",
          height: "72px",
          padding: "7px 0 0 20px",
        }}
      >
        <TextField
          label="Email"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          type="password"
          onChange={(e) => setPassword(e.target.value)}
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
        onClick={(e) => handleSignIn(e)}
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
        SIGN IN
      </Box>
      <Typography
        sx={{
          mt: "6px",
          color: "#686b78",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        By clicking on Login, I accept the Terms & Conditions & Privacy Policy
      </Typography>

      {signInError && <p>{signInError}</p>}
      {signInMessage && <p>{signInMessage}</p>}
    </Box>
  );
};

export default Signin;
