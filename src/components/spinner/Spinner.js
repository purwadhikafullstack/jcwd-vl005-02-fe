import { Box, Modal, CircularProgress } from "@mui/material";

const Spinner = ({ loading }) => {
  return (
    <Modal open={loading} aria-labelledby="modal" aria-describedby="modal">
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </Box>
    </Modal>
  );
};
export default Spinner;
