import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { userPool } from "../aws-cognito"; // Cognito User Pool configuration
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInMessage, setSignInMessage] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    // Authenticate the user
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setSignInMessage(
          "Sign-in successful! Access Token: " +
            result.getAccessToken().getJwtToken()
        );
        setSignInError("");
        setIsSignedIn(true); // Update sign-in status
        setCognitoUser(user); // Store the user object for sign-out
        console.log("result", result);
      },
      onFailure: (err) => {
        setSignInError("Error during sign-in: " + err.message);
        setSignInMessage("");
      },
    });
  };

  const handleSignOut = () => {
    if (cognitoUser) {
      cognitoUser.signOut();
      setSignInMessage("You have successfully signed out.");
      setSignInError("");
      setIsSignedIn(false); // Update sign-in status
    } else {
      setSignInError("No active user session found.");
    }
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
      {!isSignedIn ? (
        <>
          <Box
            sx={{
              border: "1px solid #d4d5d9",
              height: "72px",
              padding: "7px 20px 0 20px",
            }}
          >
            <TextField
              label="Email/Username"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{
                style: { color: "#93959f" },
              }}
              sx={{
                width: "100%",
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
              padding: "7px 20px 0 20px",
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
                width: "100%",
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
            By clicking on Login, I accept the Terms & Conditions & Privacy
            Policy
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ mt: "6px", color: "green", fontWeight: "700" }}>
            {signInMessage}
          </Typography>
          <Box
            onClick={handleSignOut}
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
            SIGN OUT
          </Box>
        </>
      )}

      {signInError && <p>{signInError}</p>}
    </Box>
  );
};

export default Signin;
