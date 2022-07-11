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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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
import { useSelector } from "react-redux";
import api from "../../services/api";

function ModalMessage({ isOpen, onClose, status, subject, message }) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          backgroundColor="rgba(211, 211, 211, 0.7)"
          opacity="0.4"
        />
        <ModalContent
          p={3}
          backgroundColor={status == "success" ? "green.100" : "red.100"}
        >
          <ModalHeader>{subject}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function UserProductDetails() {
  const [currentAmount, setCurentAmount] = useState(1);

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

  const [isOpen, setIsOpen] = useState({
    open: false,
    status: "",
    subject: "",
    message: "",
  });

  const { email, username, id: userId } = useSelector((state) => state.user);

  const productId = useParams().productId;
  console.log(productId);
  useEffect(() => {
    let url = `/user/products/${productId}`;
    api
      .get(url)
      .then((res) => {
        setProduct({ ...product, ...res.data.content });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(product);

  const increaseQuantity = () => {
    if (currentAmount < product.stock) {
      setCurentAmount((currentAmount) => currentAmount + 1);
    } else {
      setCurentAmount(product.stock);
    }
  };

  const decreaseQuantity = () => {
    if (currentAmount > 0) {
      setCurentAmount((currentAmount) => currentAmount - 1);
    }
  };

  const changeQuantity = (event) => {
    if (event.target.value < product.stock) {
      setCurentAmount(event.target.value);
    } else {
      setCurentAmount(product.stock);
    }
  };

  const addToCart = () => {
    console.log(currentAmount);
    let url = `/user/cart/add/${productId}/${currentAmount}`;
    api
      .post(url, product)
      .then((res) => {
        console.log(res);
        setIsOpen({
          ...isOpen,
          open: true,
          status: "success",
          subject: res.data.subject,
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsOpen({
          ...isOpen,
          open: true,
          status: "error",
          subject: err.data.subject,
          message: err.data.message,
        });
      });
  };

  return (
    <Container maxW={"7xl"}>
      <ModalMessage
        isOpen={isOpen.open}
        onClose={() => {
          setIsOpen({
            ...isOpen,
            open: false,
            status: "",
            subject: "",
            message: "",
          });
        }}
        status={isOpen.status}
        subject={isOpen.subject}
        message={isOpen.message}
      ></ModalMessage>
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
              Rp {parseInt(product.price).toLocaleString("id-ID")}
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
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItenms="center"
            >
              <NumberInput
                size="lg"
                w={"20%"}
                value={currentAmount}
                min={1}
                max={product.stock}
              >
                <NumberInputField onChange={changeQuantity} />
                <NumberInputStepper>
                  <NumberIncrementStepper
                    onClick={
                      currentAmount < product.stock ? increaseQuantity : null
                    }
                  />
                  <NumberDecrementStepper
                    onClick={currentAmount > 1 ? decreaseQuantity : null}
                  />
                </NumberInputStepper>
              </NumberInput>
              <Button
                rounded={"lg"}
                w={"80%"}
                // mt={8}
                size={"lg"}
                // py={"7"}
                bg="red.500"
                color="white"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                marginLeft={2}
                onClick={addToCart}
              >
                Add to cart
              </Button>
            </Box>
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
