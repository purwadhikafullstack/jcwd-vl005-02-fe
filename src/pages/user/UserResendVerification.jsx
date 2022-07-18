import { EmailIcon } from "@chakra-ui/icons";
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
            You must verify your email address to access this page
          </Text>

          <Button
            margin={"2%"}
            // colorScheme="red.500"
            // bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            bgColor={"red.400"}
            color="white"
            variant="solid"
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
