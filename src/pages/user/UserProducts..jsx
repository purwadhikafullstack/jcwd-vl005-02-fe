import { ReactNode } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Wrap,
  WrapItem,
  Center,
  Container,
  Grid,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  Radio,
  RadioGroup,
  Select,
  Drawer,
} from "@chakra-ui/react";

import UserProductCard from "../../components/user/ProductCard";
import FilterDrawer from "../../components/user/FilterDrawer";

export default function UserProducts() {
  return (
    <Flex>
      <Box w="20vw" h="100vh" backgroundColor="gray.100" padding="1rem">
        <FilterDrawer></FilterDrawer>
      </Box>

      <Box w="80vw">
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Plans that fit your need
          </Heading>
          <Text fontSize="lg" color={"gray.500"}>
            Start with 14-day free trial. No credit card needed. Cancel at
            anytime.
          </Text>
        </VStack>

        <Container maxW="6xl" centerContent>
          <Wrap
            spacing="20px"
            padding="50px 0"
            alignItems="center"
            justifyContent="center"
            justify="center"
          >
            <WrapItem>
              <UserProductCard></UserProductCard>
            </WrapItem>
            <WrapItem>
              <UserProductCard></UserProductCard>
            </WrapItem>
            <WrapItem>
              <UserProductCard></UserProductCard>
            </WrapItem>
            <WrapItem>
              <UserProductCard></UserProductCard>
            </WrapItem>{" "}
            <WrapItem>
              <UserProductCard></UserProductCard>
            </WrapItem>{" "}
            <WrapItem>
              <UserProductCard></UserProductCard>
            </WrapItem>{" "}
            <WrapItem>
              <UserProductCard></UserProductCard>
            </WrapItem>{" "}
            <WrapItem>
              <UserProductCard></UserProductCard>
            </WrapItem>
          </Wrap>
        </Container>
      </Box>
    </Flex>
  );
}
