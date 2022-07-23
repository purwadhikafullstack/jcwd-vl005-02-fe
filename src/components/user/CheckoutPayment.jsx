import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  Divider,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const group1 = [
  "Aceh",
  "Bangka Belitung Islands",
  "Bengkulu",
  "Jambi",
  "Lampung",
  "North Sumatra",
  "Riau",
  "Riau Islands",
  "South Sumatra",
  "West Sumatra",
];

const group2 = [
  "Banten",
  "Central Java",
  "East Java",
  "Special Capital Region of Jakarta",
  "Special Region of Yogyakarta",
  "West Java",
];

const group3 = [
  "Central Kalimantan",
  "East Kalimantan",
  "North Kalimantan",
  "South Kalimantan",
  "West Kalimantan",
];

const group4 = [
  "Central Papua",
  "Highland Papua",
  "Papua",
  "South Papua",
  "West Papua",
];

const group5 = ["Bali", "East Nusa Tenggara", "West Nusa Tenggara"];

const group6 = [
  "Central Sulawesi",
  "Gorontalo",
  "Maluku",
  "North Maluku",
  "North Sulawesi",
  "Southeast Sulawesi",
  "South Sulawesi",
  "West Sulawesi",
];

export default function CheckoutPayment({
  subtotal,
  onSelectPaymentMethod,
  address,
  shipping,
}) {
  const [method, setMethod] = useState("");

  onSelectPaymentMethod(method);

  let shippingCost;

  if (group1.includes(address.province)) {
    shippingCost = 15000;
  } else if (group2.includes(address.province)) {
    shippingCost = 10000;
  } else if (group3.includes(address.province)) {
    shippingCost = 20000;
  } else if (group4.includes(address.province)) {
    shippingCost = 50000;
  } else if (group5.includes(address.province)) {
    shippingCost = 35000;
  } else if (group6.includes(address.province)) {
    shippingCost = 40000;
  } else {
    shippingCost = 0;
  }

  useEffect(() => {
    shipping(shippingCost);
  }, [shippingCost]);

  let totalPayment = subtotal + shippingCost;

  return (
    <>
      <Flex direction="row" justify="space-between" align="center">
        <Text>Subtotal</Text>
        <Text my="auto" fontWeight="500">
          Rp {parseInt(subtotal).toLocaleString("id-ID")}
        </Text>
      </Flex>
      {/* <Flex direction="row" justify="space-between" align="center">
        <Text>Tax (10%)</Text>
        <Text my="auto" fontWeight="500">
          Rp {(subtotal * 10) / 100}
        </Text>
      </Flex> */}
      <Flex direction="row" justify="space-between" align="center">
        <Text>Shipping cost</Text>
        <Text my="auto" fontWeight="500">
          Rp {parseInt(shippingCost).toLocaleString("id-ID")}
        </Text>
      </Flex>
      <Divider />
      <Flex direction="row" justify="space-between" align="center">
        <Text fontWeight="500">ORDER TOTAL</Text>
        <Text my="auto" fontWeight="500" fontSize="1.2rem">
          {/* Rp {(subtotal * 110) / 100 + shippingCost} */}
          Rp {parseInt(totalPayment).toLocaleString("id-ID")}
        </Text>
      </Flex>
      <Divider />
      <Text fontWeight="500">Payment Method</Text>
      <RadioGroup onChange={setMethod} value={method}>
        <Stack direction="column">
          <Radio value="Bank Transfer">Bank Transfer</Radio>
          {method == "Bank Transfer" ? (
            <Text>
              Please transfer to our bank account number: 123-456-78, and upload
              your proof of payment.
            </Text>
          ) : (
            ""
          )}
          <Radio value="Credit Card">Credit Card</Radio>
        </Stack>
      </RadioGroup>
    </>
  );
}
