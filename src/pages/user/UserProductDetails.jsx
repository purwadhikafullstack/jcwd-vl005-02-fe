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
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import { useParams } from "react-router-dom";
import { URL_API } from "../../helpers";
import { GiMedicinePills } from "react-icons/gi";
import { MdPayments } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import api from "../../services/api";
import { useSelector } from "react-redux";

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

  const { id: userId, is_verified } = useSelector((state) => state.user);

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    category: 0,
    description: "",
    picture: "",
    price: 0,
    stock: 0,
    stock_in_unit: 0,
    volume: 0,
    unit: "",
    sold: 0,
    sold_times: 0,
  });

  const [isOpen, setIsOpen] = useState({
    open: false,
    status: "",
    subject: "",
    message: "",
  });

  const productId = useParams().productId;
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

  const increaseQuantity = () => {
    if (currentAmount < product.stock_in_unit) {
      setCurentAmount((currentAmount) => currentAmount + 1);
    } else {
      setCurentAmount(product.stock_in_unit);
    }
  };

  const decreaseQuantity = () => {
    if (currentAmount > 0) {
      setCurentAmount((currentAmount) => currentAmount - 1);
    }
  };

  const changeQuantity = (event) => {
    if (event.target.value < product.stock_in_unit) {
      setCurentAmount(event.target.value);
    } else {
      setCurentAmount(product.stock_in_unit);
    }
  };

  const addToCart = () => {
    let url = `/user/cart/add/${productId}/${currentAmount}`;
    api
      .post(url, product)
      .then((res) => {
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
              {/* Rp {parseInt(product.price).toLocaleString("id-ID")} */}
              Rp {parseInt(product.price).toLocaleString("id-ID")}/
              {product.unit}
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
                  {product.stock_in_unit > 0 ? (
                    <Tag size="md" variant="solid" colorScheme="teal">
                      {/* In stock - {product.stock} unit(s) */}
                      In stock - {product.stock_in_unit} {product.unit}
                    </Tag>
                  ) : (
                    <Tag size="md" variant="solid" colorScheme="red">
                      Out of stock
                    </Tag>
                  )}
                </ListItem>
                {product.sold ? (
                  <>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Units Sold:
                      </Text>{" "}
                      {product.sold} {product.unit}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Times Sold:
                      </Text>{" "}
                      {product.sold_times} times
                    </ListItem>
                  </>
                ) : (
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Product has not been sold yet.
                    </Text>{" "}
                  </ListItem>
                )}
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
          {product.stock_in_unit > 0 && userId && is_verified === "verified" ? (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <InputGroup size="lg " w={"30%"}>
                <NumberInput
                  size="lg"
                  value={currentAmount}
                  min={1}
                  max={product.stock_in_unit}
                >
                  <NumberInputField onChange={changeQuantity} />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={
                        currentAmount < product.stock_in_unit
                          ? increaseQuantity
                          : null
                      }
                    />
                    <NumberDecrementStepper
                      onClick={currentAmount > 1 ? decreaseQuantity : null}
                    />
                  </NumberInputStepper>
                </NumberInput>
                <InputRightAddon
                  children={product.unit}
                  w={"50px"}
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  rounded="lg"
                />
              </InputGroup>
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

          {/* <Stack direction="row" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack> */}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
