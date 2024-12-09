import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";

const CustomTextField = ({
  label,
  value,
  setValue,
  password = false,
  height = "72px",
  editable = true,
  margin,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #d4d5d9",
        height: height,
        padding: "7px 20px 0 20px",
        margin: margin,
      }}
    >
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={password ? "password" : "text"}
        InputLabelProps={{
          style: { color: "#93959f" },
        }}
        InputProps={{
          readOnly: !editable ? true : false,
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
  );
};

export default CustomTextField;
