import { EmailIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import Axios from "axios";
import {
  Box,
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const ResendEmailVerification = () => {
  const API_URL = process.env.REACT_APP_URL_API;
  const { is_verified, email, id, username, first_name, last_name } =
    useSelector((state) => state.user);
  const toast = useToast();

  const onBtnResend = () => {
    // alert(last_name)
    Axios.post(API_URL + `/users/resendemail`, {
      id: id,
      email: email,
      is_verified: is_verified,
    })
      .then((respond) => {
        // setMessage(" Your account has been verified");
        // alert(respond.data);
        toast({
          title: respond.data,
          // description: respond.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.30", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Box textAlign="center" py={5} px={10}>
          <EmailIcon boxSize={"50px"} color={"red.500"} />
          <Heading as="h3" size="md" mt={6} mb={2}>
            Verify email address
          </Heading>

          <Text color={"gray.500"}>
            Hi {username} you must verify your email address to access this page
          </Text>

          <Button
            onClick={onBtnResend}
            margin={"2%"}
            bgColor={"red.500"}
            color="white"
            variant="solid"
            _hover={{ bg: "red.400" }}
          >
            Resend verification email
          </Button>
          <Text color={"gray.500"}>
            Issues with the verification process or entered the wrong email?
          </Text>
          <Text color={"gray.500"}>
            Please sign up with another email address
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ResendEmailVerification;
