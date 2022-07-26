import {
  Heading,
  Container,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { GoVerified, GoUnverified } from "react-icons/go";

export default function UserProfile() {
  const [data, setData] = useState({});

  useEffect(() => {
    let url = `/users/user-data`;
    api
      .get(url)
      .then((res) => {
        setData(() => res.data.content);
      })
      .catch((err) => {
        // console.log("error");
        console.log(err);
      });
  }, []);

  console.log(data);
  return (
    <Container maxW={"7xl"} margin="auto" py={12} px={10}>
      <Heading textAlign="center">User Profile</Heading>
      <Center py={6}>
        <Box
          maxW={"320px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Avatar
            size={"xl"}
            name={data.username}
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
          />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {data.first_name} {data.last_name}
          </Heading>
          <Flex alignItems="center" justifyContent="center">
            {data.is_verified == "verified" ? (
              <GoVerified color="green" fontSize={"1rem"} />
            ) : (
              <GoUnverified color="gray" fontSize={"1rem"} />
            )}
            <Text fontWeight={600} fontSize={"1rem"} color={"gray.500"} ml={1}>
              {data.username}
            </Text>{" "}
          </Flex>

          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {data.email}
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
              textTransform="none"
            >
              Joined since: {data.created_at}
            </Badge>
          </Stack>

          {/* <Stack mt={8} direction={"row"} spacing={4}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
            >
              Message
            </Button>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Follow
            </Button>
          </Stack> */}
        </Box>
      </Center>
    </Container>
  );
}
