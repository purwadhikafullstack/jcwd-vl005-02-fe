import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Box, Button, Heading, Text, Flex } from "@chakra-ui/react";
import { CheckCircleIcon, WarningTwoIcon, CloseIcon } from "@chakra-ui/icons";

export default function VerificationPage() {
  const API_URL = process.env.REACT_APP_URL_API;
  const [message, setMessage] = useState("Failed to verify your account");
  const params = useParams();
  useEffect(() => {
    console.log("MYPARAMETER:", params.token);

    Axios.patch(
      API_URL + `/users/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    )
      .then((respond) => {
        setMessage(" Your account has been verified");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box textAlign="center" py={150} px={6}>
      {message === " Your account has been verified" ? (
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      ) : (
        <Box display="inline-block">
          <Flex
          // test
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={"red.500"}
            rounded={"50px"}
            w={"55px"}
            h={"55px"}
            textAlign="center"
          >
            <CloseIcon boxSize={"20px"} color={"white"} />
          </Flex>
        </Box>
      )}

      <Heading as="h2" size="xl" mt={6} mb={2}>
        {message}
      </Heading>
      {/* <Text color={"gray.500"}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Text> */}
    </Box>
  );
}
