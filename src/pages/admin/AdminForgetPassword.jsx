import React, { useRef, useState } from "react";
import Axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import {
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

const API_URL = process.env.REACT_APP_URL_API;

export default function AdminForgotPassword() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const emailAdmin = useRef("");
  const onButtonRequest = () => {
    setLoading(true);
    Axios.post(API_URL + `/admin/forgetpassword`, {
      Email: emailAdmin.current.value,
    })
      .then((respond) => {
        console.log("Respond:", respond.data);

        toast({
          title: "Check Your Email to reset your password",
          // description: respond.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // reset state

        emailAdmin.current.value = "";

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          toast({
            title: "Error",
            description: error.response.data,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setLoading(false);
      });
  };
  return (
    <ChakraProvider>
      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        // bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          //   bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              ref={emailAdmin}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={onButtonRequest}
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bg={"blue.500"}
              color={"white"}
              _hover={{ bg: "blue.400" }}
            >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
}
