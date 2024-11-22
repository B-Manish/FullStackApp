import React, { useState } from "react";
import { Switch, FormControlLabel, Box } from "@mui/material";

const VegNonVegSwitch = ({ onToggle }) => {
  const [isVeg, setIsVeg] = useState(true);

  const handleSwitch = (event) => {
    setIsVeg(event.target.checked);
    // onToggle(event.target.checked ? "Veg" : "NonVeg");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <FormControlLabel
        control={<Switch checked={isVeg} onChange={handleSwitch} />}
        // label={isVeg ? "Veg" : "Non-Veg"}
      />
    </Box>
  );
};

export default VegNonVegSwitch;
