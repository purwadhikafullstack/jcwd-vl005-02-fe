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
import { useState } from "react";

export default function CheckoutPayment({ subtotal, onSelectPaymentMethod }) {
  const [method, setMethod] = useState("");

  onSelectPaymentMethod(method);

  let shippingCost = 10000;
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
          <Radio value="Credit Card or Paypal">Credit Card or Paypal</Radio>
        </Stack>
      </RadioGroup>
    </>
  );
}
