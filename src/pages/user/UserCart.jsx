import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { CartItem } from "../../components/user/CartItem";
import { CartOrderSummary } from "../../components/user/CartOrderSummary";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link as RRLink } from "react-router-dom";
import api from "../../services/api";

const UserCart = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [updateCart, setUpdateCart] = useState(false);

  // const { email, username, id: userId } = useSelector((state) => state.user);
  // console.log(userId);

  useEffect(() => {
    let fetchCart = `/user/cart?page=${page}`;

    api
      .get(fetchCart)
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

  let maxPage;
  let productsPerPage = 5;

  if (totalData < productsPerPage) {
    maxPage = 1;
  } else if (totalData % productsPerPage > 0) {
    maxPage = Math.ceil(totalData / productsPerPage);
  } else {
    maxPage = totalData / productsPerPage;
  }

  const deleteCartItem = (productId) => {
    console.log(productId);
    let url = `/user/cart/delete/${productId}`;

    api
      .delete(url)
      .then((res) => {
        setUpdateCart(true);
        // console.log(res);
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
        setUpdateCart(true);
      });
  };

  return (
    <Box
      maxW={{
        base: "3xl",
        lg: "7xl",
      }}
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        align={{
          lg: "flex-start",
        }}
        spacing={{
          base: "8",
          md: "16",
        }}
      >
        <Stack
          spacing={{
            base: "8",
            md: "10",
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({totalData} item(s))
          </Heading>

          <Stack spacing="6">
            {data.length &&
              data.map((item) => (
                <CartItem
                  updateCart={updateCart}
                  setUpdateCart={setUpdateCart}
                  key={item.id}
                  {...item}
                  onClickDelete={() => deleteCartItem(item.product_id)}
                />
              ))}

            {data.length ? (
              <Box
                display="flex"
                flexDirection="row"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
                pb={10}
              >
                {page != 1 ? (
                  <Button p={1}>
                    <MdNavigateBefore
                      style={{ fontSize: "1.5em" }}
                      onClick={() => {
                        setPage(page - 1);
                      }}
                    />
                  </Button>
                ) : (
                  <Button p={1} disabled>
                    <MdNavigateBefore style={{ fontSize: "1.5em" }} />
                  </Button>
                )}
                <Box
                  // border="1px solid black"
                  height="100%"
                  p={2}
                  px={3}
                  backgroundColor="gray.100"
                  mx={3}
                  borderRadius="md"
                >
                  Page {page} of {maxPage}
                </Box>
                {page < maxPage ? (
                  <Button
                    p={1}
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    <MdNavigateNext style={{ fontSize: "1.5em" }} />
                  </Button>
                ) : (
                  <Button
                    p={1}
                    onClick={() => {
                      setPage(page + 1);
                    }}
                    disabled
                  >
                    <MdNavigateNext style={{ fontSize: "1.5em" }} />
                  </Button>
                )}
              </Box>
            ) : (
              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                m="auto"
                w="100%"
              >
                <Alert
                  status="warning"
                  maxW="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AlertIcon />
                  You don't have any items in your cart!
                </Alert>
              </Box>
            )}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary updateCart={updateCart} />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <RRLink to="/shop" style={{ color: "red" }}>
              Continue shopping
            </RRLink>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default UserCart;
