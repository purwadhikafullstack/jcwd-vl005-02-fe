import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import Cookies from "js-cookie";
import {
  Spinner,
  Container,
  SimpleGrid,
  Checkbox,
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
  Link,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

export default function SignupCard() {
  const API_URL = process.env.REACT_APP_URL_API;
  const username = useRef("");
  const password = useRef("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [cookie, setCookie] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = () => {
    setChecked(!checked);
  };

  const onButtonLogin = () => {
    setLoading(true);
    Axios.post(API_URL + `/admin/login`, {
      username: username.current.value,
      password: password.current.value,
    })
      .then((respond) => {
        console.log(respond.data);
        setLoading(false);
        // if success =>

        toast({
          title: "Login Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        Cookies.set("loginstatusadmin", "loggedin");
        localStorage.setItem("adminToken", respond.data.token);
        localStorage.setItem("isCheckedAdmin", checked);
        // save user data to global state
        dispatch({ type: "ADMINLOGIN", payload: respond.data.dataLogin });
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.response.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) return <Navigate to="/admin" />;
  const color = useColorModeValue;

  return (
    <ChakraProvider>
      <Box position={"relative"}>
        <Container marginTop={"10"}>
          <Stack
            // bg={"gray.50"}
            bg={color("white", "gray.700")}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            boxShadow={"lg"}
          >
            <Stack spacing={4}>
              <Heading
                color={color("black", "white")}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Sign in use admin account
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, blue.300,blue.300)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email or Username </FormLabel>
                  <Input ref={username} type="text" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      ref={password}
                      type={showPassword ? "text" : "password"}
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
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox onChange={handleChange}>Remember me</Checkbox>
                <Link as={ReactLink} to="/forgotpassword" color={"blue.400"}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                leftIcon={loading ? <Spinner size="md" /> : null}
                disabled={loading}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bg={"blue.300"}
                color={"white"}
                _hover={{ bg: "blue.400" }}
                onClick={onButtonLogin}
              >
                Login
                {/* {loading ? "Login..." : "Login"} */}
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
