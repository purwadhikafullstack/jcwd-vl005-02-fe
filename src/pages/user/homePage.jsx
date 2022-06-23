import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import {Navigate} from "react-router-dom"

export default function Home(props) {
     // cannot access this page if not login
   const token = localStorage.getItem('token')
   if(!token) return <Navigate to="/login" />
  return (
    <Box textAlign="center" py={10} px={6}>
      <DragHandleIcon boxSize={"50px"} color={"blue.300"} />

      <Heading as="h2" size="xl" mt={6} mb={2}>
        Home Page
      </Heading>
      <Text color={"gray.500"}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Text>
    </Box>
  );
}
