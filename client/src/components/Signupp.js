import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { userPool } from "../aws-cognito"; // Cognito User Pool configuration
import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const SignUpAndVerify = () => {
  // States for Sign-Up
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);

  // States for Verification
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  // Handle Sign-Up
  const handleSignUp = (e) => {
    e.preventDefault();

    // Validate password against Cognito's password policy
    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password)
    ) {
      setSignUpError(
        "Password must be at least 8 characters long and contain 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }

    const attributeList = [];
    const dataEmail = {
      Name: "email",
      Value: email,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    // Create the user in Cognito
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        setSignUpError("Error during sign-up: " + err.message);
        setSignUpMessage("");
        return;
      }
      setVerifyingCode(true);
      setSignUpMessage(
        "User registered successfully. Please check your email for verification."
      );
      setSignUpError("");
    });
  };

  // Handle Verification
  const handleVerification = (e) => {
    e.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: username, // This should be the email/phone number used during sign-up
      Pool: userPool,
    });

    // Verify the user's email or phone number
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        setVerificationError("Error during verification: " + err.message);
        setVerificationMessage("");
        return;
      }
      setVerificationMessage("Verification successful! You can now sign in.");
      setVerificationError("");
      setVerifyingCode(false);
    });
  };

  return (
    // <div>
    //   {/* Sign-Up Form */}
    //   <h2>Sign Up</h2>
    //   <form onSubmit={handleSignUp}>
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Sign Up</button>
    //   </form>
    //   {signUpError && <p>{signUpError}</p>}
    //   {signUpMessage && <p>{signUpMessage}</p>}

    //   {/* Verification Form */}
    //   <h2>Verify Your Email/Phone</h2>
    //   <form onSubmit={handleVerification}>
    //     <input
    //       type="text"
    //       placeholder="Username (email/phone)"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="text"
    //       placeholder="Verification Code"
    //       value={verificationCode}
    //       onChange={(e) => setVerificationCode(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Verify</button>
    //   </form>
    //   {verificationError && <p>{verificationError}</p>}
    //   {verificationMessage && <p>{verificationMessage}</p>}
    // </div>

    verifyingCode ? (
      <Box sx={{ width: "360px" }}>
        <Box sx={{ mb: "20px" }}>Verify Your Email</Box>
        <Box
          sx={{
            border: "1px solid #d4d5d9",
            height: "72px",
            padding: "7px 0 0 20px",
          }}
        >
          <TextField
            id="standard-basic"
            label="Verification Code"
            variant="standard"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
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
          onClick={(e) => handleVerification(e)}
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
          Verify
        </Box>
        {verificationError && <p>{verificationError}</p>}
        {verificationMessage && <p>{verificationMessage}</p>}
      </Box>
    ) : (
      <Box sx={{ width: "360px" }}>
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
            label="Username"
            variant="standard"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
            type="password"
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
          onClick={(e) => handleSignUp(e)}
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
          By creating an account,I accept the Terms & Conditions & Privacy
          Policy
        </Typography>

        {signUpError && <p>{signUpError}</p>}
        {signUpMessage && <p>{signUpMessage}</p>}
      </Box>
    )
  );
};

export default SignUpAndVerify;
