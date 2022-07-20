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
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";
import * as React from "react";
import { CartProductMeta } from "./CartProductMeta";
import { URL_API } from "../../helpers";
import { useState, useEffect } from "react";

import api from "../../services/api";

export const CartItem = (props) => {
  const [data, setData] = useState([]);
  const {
    name,
    product_id,
    category,
    picture,
    price,
    amount,
    unit,
    stock,
    stock_in_unit,
    onClickDelete,
    updateCart,
    setUpdateCart,
  } = props;
  const [currentAmount, setCurentAmount] = useState(amount);

  const increaseQuantity = () => {
    if (currentAmount < stock) {
      setCurentAmount((currentAmount) => currentAmount + 1);
      setUpdateCart(true);
    } else {
      setCurentAmount(stock);
      setUpdateCart(true);
    }
  };

  const decreaseQuantity = () => {
    if (currentAmount > 0) {
      setCurentAmount((currentAmount) => currentAmount - 1);
      setUpdateCart(true);
    }
  };

  const changeQuantity = (event) => {
    if (event.target.value < stock_in_unit) {
      setCurentAmount(event.target.value);
      setUpdateCart(true);
    } else {
      setCurentAmount(stock_in_unit);
      setUpdateCart(true);
    }
  };

  useEffect(() => {
    let url = `/user/cart/update/${product_id}`;

    let obj = {
      qty: currentAmount,
    };

    api
      .patch(url, obj)
      .then((res) => {
        setData(() => res.data.content);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentAmount, updateCart]);

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={category}
        image={URL_API + picture}
        stock={stock_in_unit}
        unit={unit}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        {stock_in_unit ? (
          <InputGroup size="sm">
            <NumberInput
              size="sm"
              maxW="100px"
              defaultValue={currentAmount}
              min={1}
              max={stock_in_unit}
              type="number"
              keepWithinRange={true}
            >
              <NumberInputField onChange={changeQuantity} />
            </NumberInput>
            <InputRightAddon children={unit} />
          </InputGroup>
        ) : (
          // <NumberInput
          //   size="sm"
          //   maxW={20}
          //   defaultValue={currentAmount}
          //   min={1}
          //   max={stock}
          // >
          //   <NumberInputField onChange={changeQuantity} />

          //   <NumberInputStepper>
          //     <NumberIncrementStepper
          //       onClick={currentAmount < stock ? increaseQuantity : null}
          //     />
          //     <NumberDecrementStepper
          //       onClick={currentAmount > 1 ? decreaseQuantity : null}
          //     />
          //   </NumberInputStepper>
          // </NumberInput>
          <Box>
            <Text
              bg="red.300"
              px={2}
              py={1}
              color="gray.900"
              fontSize="xs"
              fontWeight="600"
              rounded="xl"
            >
              Out of Stock
            </Text>
          </Box>
        )}

        {/* <PriceTag price={price} currency={currency} /> */}
        <Text my="auto" fontWeight="500" width="100%">
          Rp {parseInt(price * currentAmount).toLocaleString("id-ID")}
        </Text>
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Button
          fontSize="sm"
          onClick={onClickDelete}
          // backgroundColor="red.300"
          py={1}
          variant="outline"
        >
          Delete
        </Button>
        {stock_in_unit ? (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <InputGroup size="sm">
              <NumberInput
                size="sm"
                maxW="100px"
                defaultValue={currentAmount}
                min={1}
                max={stock_in_unit}
                type="number"
                keepWithinRange={true}
              >
                <NumberInputField onChange={changeQuantity} />
              </NumberInput>
              <InputRightAddon children={unit} />
            </InputGroup>
            {/* <NumberInput
              size="lg"
              maxW={20}
              value={currentAmount}
              min={1}
              max={stock}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={currentAmount < stock ? increaseQuantity : null}
                />
                <NumberDecrementStepper
                  onClick={currentAmount > 0 ? decreaseQuantity : null}
                />
              </NumberInputStepper>
            </NumberInput> */}
          </Box>
        ) : (
          <Box>
            <Text
              bg="red.300"
              px={2}
              py={1}
              color="gray.900"
              fontSize="xs"
              fontWeight="600"
              rounded="xl"
            >
              Out of Stock
            </Text>
          </Box>
        )}
        <Text my="auto" fontWeight="500">
          Rp {parseInt(price * currentAmount).toLocaleString("id-ID")}
        </Text>
      </Flex>
    </Flex>
  );
};
