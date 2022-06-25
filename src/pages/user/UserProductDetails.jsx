import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Badge,
  Tag,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL_API } from "../../helpers";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MedicationIcon from "@mui/icons-material/Medication";
import { GiMedicinePills } from "react-icons/gi";
import { MdPayments } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

export default function UserProductDetails() {
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    category: 0,
    description: "",
    picture: "",
    price: 0,
    stock: 0,
    volume: 0,
    unit: "",
  });

  const productId = useParams().productId;
  console.log(productId);
  useEffect(() => {
    axios
      .get(URL_API + `/user/products/${productId}`)
      .then((res) => {
        setProduct({ ...product, ...res.data.content });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(product);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={`${URL_API}/${product.picture}`}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 4, md: 4 }} my={4}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"3xl"}
            >
              Rp {product.price.toLocaleString("de-DE")}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{product.description}</Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("red.500", "red.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Category:
                  </Text>{" "}
                  <Badge
                    textTransform="unset"
                    fontSize="0.9rem"
                    p={1}
                    borderRadius="0.5rem"
                  >
                    {product.category}
                  </Badge>
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Stock:
                  </Text>{" "}
                  {product.stock > 0 ? (
                    <Tag size="md" variant="solid" colorScheme="teal">
                      In stock - {product.stock} unit(s)
                    </Tag>
                  ) : (
                    <Tag size="md" variant="solid" colorScheme="red">
                      Out of stock
                    </Tag>
                  )}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Volume per unit:
                  </Text>{" "}
                  {product.volume} {product.unit}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Sold:
                  </Text>{" "}
                  {product.sold} unit(s)
                </ListItem>
              </List>
            </Box>

            <Box mb={8}>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("red.500", "red.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 2, lg: 10 }}
              >
                <List spacing={2}>
                  <ListItem
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <GiMedicinePills fontSize="2em" />
                    <Box sx={{ marginLeft: "10px" }}>
                      <Text fontWeight="bold">Best Product</Text>
                      <Text>Certified product guarantee</Text>
                    </Box>
                  </ListItem>
                  <ListItem
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <FaHandHoldingMedical fontSize="2em" />
                    <Box sx={{ marginLeft: "10px" }}>
                      <Text fontWeight="bold">Professional Service</Text>
                      <Text>Medical expert service</Text>
                    </Box>
                  </ListItem>
                </List>
                <List spacing={2}>
                  <ListItem
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <MdPayments fontSize="2em" />
                    <Box sx={{ marginLeft: "10px" }}>
                      <Text fontWeight="bold">Easy Payment</Text>
                      <Text>Pay with local bank transfer</Text>
                    </Box>
                  </ListItem>
                  <ListItem
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <BiSupport fontSize="2em" />
                    <Box sx={{ marginLeft: "10px" }}>
                      <Text fontWeight="bold">Aftersales Support</Text>
                      <Text>24/7 product aftersales support</Text>
                    </Box>
                  </ListItem>
                </List>
              </SimpleGrid>
            </Box>
          </Stack>
          {product.stock > 0 ? (
            <Button
              rounded={"lg"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg="red.500"
              color="white"
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Add to cart
            </Button>
          ) : (
            <Button
              rounded={"lg"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg="red.500"
              color="white"
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              disabled
            >
              Add to cart
            </Button>
          )}

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
