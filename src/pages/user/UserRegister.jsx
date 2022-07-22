import React, { useRef, useState } from "react";
import Axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Container,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function UserRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = process.env.REACT_APP_URL_API;
  const username = useRef("");
  const email = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const password = useRef("");
  const repassword = useRef("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const onRegisterSubmit = () => {
    // input validation
    if (
      username.current.value === "" ||
      email.current.value === "" ||
      firstName.current.value === "" ||
      lastName.current.value === "" ||
      password.current.value === "" ||
      repassword.current.value === ""
    ) {
      return toast({
        title: "Warning",
        description: "Fill in all the form",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const newUser = {
      username: username.current.value,
      email: email.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      password: password.current.value,
      repassword: repassword.current.value,
    };
    console.log(newUser);

    setLoading(true);
    Axios.post(API_URL + `/users/register`, newUser)
      .then((respond) => {
        console.log("Respond:", respond.data);
        setLoading(false);

        // reset state
        username.current.value = "";
        email.current.value = "";
        firstName.current.value = "";
        lastName.current.value = "";
        password.current.value = "";
        repassword.current.value = "";
        toast({
          title: "Registrasi Success",
          description: respond.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
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
  //
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" />;
  const color = useColorModeValue;
  return (
    <Box position={"relative"}>
      <Container
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
      >
        <Flex justify={"center"} align={"center"}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={color("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Stack spacing={4}>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Create new account
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,red.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        ref={firstName}
                        type="text"
                        placeholder="firstname"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName" isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        ref={lastName}
                        type="text"
                        placeholder="lastname"
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input ref={email} type="email" placeholder="email" />
                </FormControl>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input ref={username} type="text" placeholder="Username" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      ref={password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl id="repassword" isRequired>
                  <FormLabel>Confirm password</FormLabel>
                  <InputGroup>
                    <Input
                      ref={repassword}
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Button
                leftIcon={loading ? <Spinner size="md" /> : null}
                disabled={loading}
                onClick={onRegisterSubmit}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bg={"red.400"}
                color={"white"}
                _hover={{ bg: "red.500" }}
              >
                Create Account
              </Button>
            </Box>
            form
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
