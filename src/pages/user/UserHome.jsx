import { Box } from "@chakra-ui/react";
import Banner from "../../components/user/Banner.tsx";
import Feature from "../../components/user/Feature";
function UserHome() {
  return (
    <div>
      <Box pt="5vh" height="90vh" margin="auto">
        <Banner></Banner>
      </Box>
      <Feature></Feature>
    </div>
  );
}

export default UserHome;
