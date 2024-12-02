import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";

export default function CustomDialogBox({
  openDialogBox,
  setOpenDialogBox,
  title,
  subtitle,
  handler,
  message,
  paddingBottom,
  confirmButtonTitle,
  srcIcon,
  disableSaveButton,
}) {
  const handleClose = (e) => {
    e.stopPropagation();
    setOpenDialogBox(false);
  };

  return (
    <Modal open={openDialogBox} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          outline: "none", // removes the default black border
          p: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{ display: "flex" }}>
            <Typography
              sx={{
                paddingBottom: paddingBottom || "5px",
                paddingLeft: "4px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
        {subtitle && (
          <Typography
            sx={{
              paddingBottom: paddingBottom || "5px",
              paddingLeft: "4px",
              color: "grey",
            }}
            variant="subtitle2"
            data-testid="messageTitle"
          >
            {subtitle}
          </Typography>
        )}
        <Grid sx={{ display: "flex" }} mt={2}>
          {message}
        </Grid>

        <Box
          sx={{
            display: "flex",
            padding: "15px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              border: "1px solid #60B246",
              color: "#60B246",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "49%",
              cursor: "pointer",
              height: "50px",
            }}
            onClick={() => setOpenDialogBox(false)}
          >
            NO
          </Box>
          <Box
            sx={{
              border: "1px solid #60B246",
              background: "#60B246",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "49%",
              cursor: "pointer",
              height: "50px",
            }}
          >
            YES, START AFRESH
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
