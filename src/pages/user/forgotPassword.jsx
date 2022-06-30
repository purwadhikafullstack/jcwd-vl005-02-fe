import React, { useRef, useState } from "react";
import Axios from "axios";
import ReactDOM from "react-dom";
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

export default function ForgotPassword() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const emailUser = useRef("");
  const onButtonRequest = () => {
    setLoading(true);
    Axios.post(API_URL + `/users/forgotpassword`, {
      emailUser: emailUser.current.value,
    }).then((respond) => {
      console.log("Respond:", respond.data);

      // reset state

      emailUser.current.value = "";

      toast({
        title: "Check Your Email to reset your password",
        // description: respond.data,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setLoading(false);
    });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
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
            ref={emailUser}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={onButtonRequest}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
