import { Box } from "@chakra-ui/react";
import Banner from "../../components/user/Banner.tsx";
import BestSeller from "../../components/user/BestSeller";
import Feature from "../../components/user/Feature";
function UserHome() {
  return (
    <div>
      <Box pt="5vh" height="92vh" margin="auto">
        <Banner></Banner>
      </Box>
      {/* <Box margin="auto">
        <BestSeller />
      </Box>
      <Box margin="auto"></Box>
      <Feature></Feature> */}
    </div>
  );
}

export default UserHome;
