import React, { useRef, useState } from "react";
import Axios from "axios";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  InputGroup,
  useToast,
  InputRightElement
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// const API_URL = process.env.REACT_APP_URL_API;

export default function ResetPassword() {
  // const API_URL = process.env.REACT_APP_URL_API;
  const API_URL = "http://localhost:5000";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const email = useRef("");
  const password = useRef("");
  const repassword = useRef("");

  const onButtonSubmit = () => {
    // input validation
    if (
      email.current.value === "" ||
      password.current.value === "" ||
      repassword.current.value === ""
    ) {
      return toast({
        title: "Warning",
        description: "Fill in all the form",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }

    const newUser = {
      email: email.current.value,
      password: password.current.value,
      repassword: repassword.current.value
    };
    console.log(newUser);

    setLoading(true);
    Axios.post(API_URL + `/users/resetpassword`, newUser).then(respond => {
      console.log("Respond:", respond.data);

      // reset state
      

      email.current.value = "";
      password.current.value = "";
      repassword.current.value = "";
      toast({
        title: "Reset Password Success",
        description: respond.data,
        status: "success",
        duration: 3000,
        isClosable: true
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
          Enter new password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            ref={email}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input ref={password} type={showPassword ? "text" : "password"} />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="repassword" isRequired>
          <FormLabel>Repassword</FormLabel>
          <InputGroup>
            <Input ref={repassword} type={showPassword ? "text" : "password"} />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={onButtonSubmit}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl"
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
