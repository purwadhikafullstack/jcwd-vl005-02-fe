import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import axios from "axios";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import { URL_API } from "../../helpers";
import { formatPrice } from "./PriceTag";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = ({ updateCart }) => {
  const { email, username, id: userId } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  // console.log(updateCart);

  useEffect(() => {
    if (userId) {
      let fetchCart = `${URL_API}/user/cart/${userId}/all`;

      axios
        .get(fetchCart)
        .then((res) => {
          setData(() => res.data.content);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [updateCart, userId]);

  let subtotal = 0;
  if (data.length == 0) {
    subtotal = 0;
  } else {
    for (let i = 0; i < data.length; i++) {
      subtotal += data[i].amount * data[i].price;
      // console.log(subtotal);
    }
  }

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={`Rp ${subtotal}`} />
        <OrderSummaryItem label="Tax (10%)">
          Rp {(subtotal * 10) / 100}
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            Rp {(subtotal * 110) / 100}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="red"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button>
    </Stack>
  );
};
