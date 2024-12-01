import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
// import Icon from '../../icon';
// import closeIcon from '../../../assets/actions/close.svg';
// import PrimaryButton from '../../primaryButton';

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
          border: "1px solid #6473FF",
          //   borderRadius: "24px",
          boxShadow: 24,
          p: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{ display: "flex" }}>
            {/* {srcIcon && (
              <Icon
                src={srcIcon}
                type="static"
                alt="arrowRightAltIcon"
                padding="0px 3px 4px 3.5px"
              />
            )}{" "} */}
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
          <Grid>
            {/* <Icon
              src={closeIcon}
              type="pointer"
              alt="arrowRightAltIcon"
              clickHandler={handleClose}
            /> */}
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
        <Grid
          container
          display="flex"
          justifyContent="flex-end"
          spacing={1}
          mt={2}
          sx={{ maxWidth: "100%" }}
        >
          <Grid item>
            {/* <PrimaryButton
              handler={handleClose}
              title="Cancel"
              bgColor="#2A2A5C"
              hoverColor="#5552FF"
              className="cancelButton"
            /> */}
          </Grid>
          <Grid item>
            {/* <PrimaryButton
              disabled={disableSaveButton}
              handler={handler}
              title={confirmButtonTitle}
              bgColor="#5552FF"
              hoverColor="#403cff"
            /> */}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
