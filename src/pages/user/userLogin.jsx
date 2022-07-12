import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Checkbox,
  Link,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Spinner,
  // IconProps,
  Icon,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  useToast,
  useColorModeValue,
  // Image,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link as ReactLink } from "react-router-dom";
// import { color } from "@mui/system";

export default function UserLogin() {
  const API_URL = process.env.REACT_APP_URL_API;
  const username = useRef("");
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [cookie, setCookie] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = () => {
    setChecked(!checked);
  };
  console.log(checked);

  const onButtonLogin = () => {
    setLoading(true);
    Axios.post(API_URL + `/users/login`, {
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
        console.log(respond.data.token);
        // save token to local storage

        // document.cookie = "loginstatus=loggedin";
        Cookies.set("loginstatus", "loggedin");
        localStorage.setItem("token", respond.data.token);
        localStorage.setItem("isChecked", checked);

        console.log(respond.data.dataLogin);

        // save user data to global state
        dispatch({ type: "LOGIN", payload: respond.data.dataLogin });
        navigate("/");
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

  // const value = Cookies.get("loginstatus");
  // console.log(value);
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" />;
  const color = useColorModeValue;

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Welcome to Pharmastore Medical{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.500,red.500)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Health
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,red.400)"
              bgClip="text"
            ></Text>{" "}
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}></Stack>
        </Stack>
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
              Sign in to your account
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
              bg={"red.500"}
              color={"white"}
              _hover={{ bg: "red.400" }}
              onClick={onButtonLogin}
            >
              Login
              {/* {loading ? "Login..." : "Login"} */}
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -9, md: -9, lg: -9 })}
      height="750px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...IconProps}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
