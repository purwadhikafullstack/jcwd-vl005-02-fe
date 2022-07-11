import React, { useEffect, useState } from "react";

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  CircularProgress,
} from "@chakra-ui/react";
import CheckoutShipping from "../../components/user/CheckoutShipping";
import { CheckoutItem } from "../../components/user/CheckoutItem";
import { useSelector } from "react-redux";
import { URL_API } from "../../helpers";
import axios from "axios";
import { CartItem } from "../../components/user/CartItem";
import CheckoutPayment from "../../components/user/CheckoutPayment";
import { useNavigate } from "react-router-dom";
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

function Spinner({ isOpen }) {
  return (
    <>
      <Modal isCentered isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay
          backgroundColor="rgba(211, 211, 211, 0.7)"
          opacity="0.4"
        />
        <CircularProgress
          isIndeterminate
          color="red.300"
          position="absolute"
          top="50vh"
          left="50vw"
          transform="translate(-50%, -50%)"
          zIndex="99999"
        />
      </Modal>
    </>
  );
}

export default function UserCheckout() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [updateCart, setUpdateCart] = useState(false);
  const [userShippingInfo, setUserShippingInfo] = useState({});
  const [userPaymentMethod, setUserPaymentMethod] = useState("");
  let navigate = useNavigate();

  const { email, username, id: userId } = useSelector((state) => state.user);
  console.log(userId);

  const [isOpen, setIsOpen] = useState({
    open: false,
    status: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let url = `/user/checkout`;

    api
      .get(url)
      .then((res) => {
        setData(() => res.data.content);
        setTotalData(res.data.details);
        setUpdateCart(false);
        // console.log(res);
      })
      .catch((err) => {
        // console.log("error");
        console.log(err);
        setUpdateCart(false);
      });
  }, [page, updateCart]);

  let subtotal = 0;
  if (data.length == 0) {
    subtotal = 0;
  } else {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      subtotal += data[i].amount * data[i].price;
      console.log(subtotal);
    }
  }

  console.log(userShippingInfo);
  console.log(userPaymentMethod);

  const submitOrder = () => {
    let data = {
      userId: userShippingInfo.user_id,
      addressId: userShippingInfo.id,
      total_payment: subtotal,
      payment_method: userPaymentMethod,
      status: "Waiting for verification",
    };

    console.log(data);

    setLoading(true);

    let url = `/user/checkout/invoice`;
    api
      .post(url, data)
      .then((res) => {
        setLoading(false);
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
        setLoading(false);
      });
  };

  console.log(userPaymentMethod);

  return (
    <Container maxW={"8xl"} py={12}>
      <Spinner isOpen={loading}></Spinner>
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
          navigate("/invoice", { replace: true });
        }}
        status={isOpen.status}
        subject={isOpen.subject}
        message={isOpen.message}
      ></ModalMessage>
      <Heading textAlign="center">Checkout Page</Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} pt={10}>
        <Stack spacing={4}>
          <CheckoutShipping onShippingInfo={setUserShippingInfo} />
        </Stack>

        <Stack
          spacing={4}
          paddingLeft={{ base: 0, lg: 10 }}
          marginTop={{ base: 10, lg: 0 }}
        >
          <Box
            bg={useColorModeValue("gray.50", "gray.800")}
            borderRadius="20px"
          >
            <Stack spacing={4} mx={"auto"} maxW={"xl"} py={12} px={6}>
              <Text
                textTransform={"uppercase"}
                color={"red.400"}
                fontWeight={600}
                fontSize={"lg"}
                bg={useColorModeValue("red.50", "red.900")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Payment Information
              </Text>
              {data &&
                data.map((item) => (
                  <CheckoutItem
                    updateCart={updateCart}
                    setUpdateCart={setUpdateCart}
                    key={item.id}
                    {...item}
                  />
                ))}
              <CheckoutPayment
                subtotal={subtotal}
                onSelectPaymentMethod={setUserPaymentMethod}
              />
              <Stack spacing={10} pt={2}>
                {Object.keys(userShippingInfo).length !== 0 &&
                userPaymentMethod != "" ? (
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"red.400"}
                    color={"white"}
                    _hover={{
                      bg: "red.500",
                    }}
                    onClick={submitOrder}
                  >
                    Place Order
                  </Button>
                ) : (
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"red.400"}
                    color={"white"}
                    _hover={{
                      bg: "red.500",
                    }}
                    disabled={true}
                  >
                    Place Order
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
