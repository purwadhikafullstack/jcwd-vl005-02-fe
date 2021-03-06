import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link as RRLink } from "react-router-dom";
import api from "../../services/api";

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
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `/user/cart/all`;

    api
      .get(url)
      .then((res) => {
        setData(() => res.data.content);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateCart]);

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
        {/* <OrderSummaryItem label="Subtotal" value={`Rp ${subtotal}`} />
        <OrderSummaryItem label="Tax (10%)">
          Rp {(subtotal * 10) / 100}
        </OrderSummaryItem> */}
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {/* Rp {(subtotal * 110) / 100} */}
            Rp {parseInt(subtotal).toLocaleString("id-ID")}
          </Text>
        </Flex>
      </Stack>

      <RRLink to="/checkout" style={{ width: "100%" }}>
        <Button
          colorScheme="red"
          size="lg"
          fontSize="md"
          rightIcon={<FaArrowRight />}
          width="100%"
        >
          Checkout
        </Button>
      </RRLink>
    </Stack>
  );
};
