import React from "react";
import { InputBase, Grid, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

function Inputfields({
  variant, // to accomodate two types of variant such as search,inputs,taginput etc
  id,
  placeholderTxt, // it displays text of the placeholder directly
  placeholderValue, // displays the dynamic value
  error,
  autoComplete,
  name, // fixed name for the input to prevent browser autofill
  handleChange, // manages the input changes
  value, // to control the state value
  handleEnter,
  typeInput,
  width, // each variant has different width
  height, // each height has a different height
  fieldName, // provides reference fields for validationtyping,
  readOnly, // to ensure the field is readable
  onChange, // update the state based on the input
  cancelSearch, // if clear icon is not needed then pass this prop as null
  disabled,
  inputRef,
  page,
  endadornment,
  ...props
}) {
  return (
    <InputBase
      disabled={disabled}
      data-testid="searchInputBase"
      name="noAutoFill"
      id="search-jha"
      placeholder="Search for restaurants or food"
      fullWidth
      value={value || ""}
      inputProps={{
        autoComplete: "off",
      }}
      sx={{
        border: "1px solid grey",
        padding: "10px",
        color: "#282c3f",
      }}
      //   sx={{
      //     borderRadius: "20px",
      //     border: (theme) => `1px solid ${theme.palette.shades.covBlack02}`,
      //     width: "260px",
      //     height: "32px",

      //     "&:hover": {
      //       border: (theme) => `1px solid ${theme.palette.blues.blue03}`,
      //     },
      //     "&.Mui-focused ": {
      //       border: (theme) => `1px solid ${theme.palette.blues.blue03}`,
      //     },
      //     "& .MuiInputBase-input::placeholder": {
      //       color: (theme) => theme.palette.grays.gray02,
      //     },
      //     ...sx,
      //   }}
      onChange={onChange}
      endAdornment={
        <Grid sx={{ paddingRight: "5px" }}>
          {value && cancelSearch ? (
            <Box onClick={cancelSearch}>
              <CloseIcon />
            </Box>
          ) : (
            <SearchIcon />
          )}
        </Grid>
      }
    />
  );
}

export default Inputfields;
