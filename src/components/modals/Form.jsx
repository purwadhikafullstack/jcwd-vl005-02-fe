import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
};

export default function Form({
  withOptions,
  show,
  close,
  confirm,
  successTitle,
  successDescription,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={show}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <Box sx={style}>
            <Box
              sx={{
                backgroundColor: blue[400],
                padding: "15px 40px",
                borderRadius: "20px 20px 0 0",
                color: blue[50],
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {successTitle}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: blue[50],
                padding: "10px 40px",
                borderRadius: "0 0 20px 20px",
                color: "black",
              }}
            >
              <Typography
                id="transition-modal-description"
                sx={{ mt: 1, mb: 2 }}
              >
                {successDescription}
              </Typography>
              {withOptions ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: " space-around",
                    padding: "0 50px",
                  }}
                >
                  <Button variant="outlined" color="primary" onClick={confirm}>
                    Yes
                  </Button>
                  <Button variant="outlined" color="error" onClick={close}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
