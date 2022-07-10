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
  const [methodDetails, setMethodDetails] = useState("");

  let shippingCost = 10000;

  const paymentMethodHandler = (event) => {
    setMethodDetails(event.target.value);
    onSelectPaymentMethod({ method, methodDetails: event.target.value });
  };

  console.log(method);
  console.log(methodDetails);
  return (
    <>
      <Flex direction="row" justify="space-between" align="center">
        <Text>Subtotal</Text>
        <Text my="auto" fontWeight="500">
          Rp {subtotal}
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
          Rp {shippingCost}
        </Text>
      </Flex>
      <Divider />
      <Flex direction="row" justify="space-between" align="center">
        <Text fontWeight="500">ORDER TOTAL</Text>
        <Text my="auto" fontWeight="500" fontSize="1.2rem">
          {/* Rp {(subtotal * 110) / 100 + shippingCost} */}
          Rp {subtotal + shippingCost}
        </Text>
      </Flex>
      <Divider />
      <Text fontWeight="500">Payment Method</Text>
      <RadioGroup onChange={setMethod} value={method}>
        <Stack direction="column">
          <Radio value="Bank Transfer">Bank Transfer</Radio>
          {method == "Bank Transfer" ? (
            <Select
              placeholder="Select your bank account"
              onChange={paymentMethodHandler}
              value={methodDetails}
            >
              <option value="BCA">BCA</option>
              <option value="BNI">BNI</option>
              <option value="BRI">BRI</option>
              <option value="Mandiri">Mandiri</option>
            </Select>
          ) : (
            ""
          )}
          <Radio value="Credit Card">Credit Card</Radio>
          <Radio value="Paypal">Paypal</Radio>
        </Stack>
      </RadioGroup>
    </>
  );
}
