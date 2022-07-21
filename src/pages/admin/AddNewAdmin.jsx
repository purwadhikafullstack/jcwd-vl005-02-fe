import React, { useRef, useState } from "react";
import Axios from "axios";
import {
  Box,
  Stack,
  Heading,
  Container,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

export default function AddNewAdmin() {
  const API_URL = process.env.REACT_APP_URL_API;
  const username = useRef("");
  const email = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const onSubmit = () => {
    // input validation
    if (
      username.current.value === "" ||
      email.current.value === "" ||
      firstName.current.value === "" ||
      lastName.current.value === "" ||
      password.current.value === ""
    ) {
      return toast({
        title: "Warning",
        description: "Fill in all the form",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const newAdmin = {
      username: username.current.value,
      email: email.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      password: password.current.value,
    };

    setLoading(true);
    Axios.post(API_URL + `/admin/addnewadmin`, newAdmin)
      .then((respond) => {
        console.log("Respond:", respond.data);
        setLoading(false);

        // reset state
        username.current.value = "";
        email.current.value = "";
        firstName.current.value = "";
        lastName.current.value = "";
        password.current.value = "";

        toast({
          title: "Add New Admin Success",
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
  return (
    <ChakraProvider>
      <Box position={"relative"}>
        <Container>
          <Stack
            bg={"gray.20"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Add new admin
              </Heading>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  placeholder="Firstname"
                  ref={firstName}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  placeholder="Lastname"
                  ref={lastName}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  placeholder="Username"
                  ref={username}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  placeholder="Email"
                  ref={email}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  type={"password"}
                  ref={password}
                  placeholder="Password"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </Stack>
              <Button
                onClick={onSubmit}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.400,blue.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, blue.500,blue.500)",
                  boxShadow: "xl",
                }}
              >
                Submit
              </Button>
            </Box>
            form
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
