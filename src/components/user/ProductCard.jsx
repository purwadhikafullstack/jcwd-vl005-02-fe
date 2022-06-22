import { ReactNode } from "react";
import {
  Box,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export default function UserProductCard() {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      <Box position="relative">
        <Box
          position="absolute"
          top="-16px"
          left="50%"
          style={{ transform: "translate(-50%)" }}
        >
          <Text
            textTransform="uppercase"
            bg={useColorModeValue("red.300", "red.700")}
            px={3}
            py={1}
            color={useColorModeValue("gray.900", "gray.300")}
            fontSize="sm"
            fontWeight="600"
            rounded="xl"
          >
            Most Popular
          </Text>
        </Box>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            Growth
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              $
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              149
            </Text>
            <Text fontSize="3xl" color="gray.500">
              /month
            </Text>
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              unlimited build minutes
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Lorem, ipsum dolor.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              5TB Lorem, ipsum dolor.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              5TB Lorem, ipsum dolor.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              5TB Lorem, ipsum dolor.
            </ListItem>
          </List>
          <Box w="80%" pt={7}>
            <Button w="full" colorScheme="red">
              Start trial
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
