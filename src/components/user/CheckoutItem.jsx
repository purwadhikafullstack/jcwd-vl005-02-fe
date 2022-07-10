import {
  CloseButton,
  Flex,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Box,
  Button,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import { URL_API } from "../../helpers";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CheckoutProductMeta } from "./CheckoutProductMeta";

export const CheckoutItem = (props) => {
  const [data, setData] = useState([]);
  const { name, product_id, category, picture, price, amount, unit } = props;
  const [currentAmount, setCurentAmount] = useState(amount);

  console.log(unit);
  return (
    <>
      <Flex direction="row" justify="space-between" align="center">
        <Box width="75%">
          <CheckoutProductMeta
            name={name}
            description={category}
            image={URL_API + picture}
            amount={amount}
            price={price}
            unit={unit}
          />
        </Box>

        <Text my="auto" fontWeight="500" width="25%" textAlign="end">
          Rp {price * currentAmount}
        </Text>
      </Flex>
      <Divider></Divider>
    </>
  );
};
