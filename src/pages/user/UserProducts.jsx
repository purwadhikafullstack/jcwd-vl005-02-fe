import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Wrap,
  WrapItem,
  Center,
  Container,
  Grid,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  Radio,
  RadioGroup,
  Select,
  Drawer,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_API } from "../../helpers";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

import UserProductCard from "../../components/user/ProductCard";
import FilterDrawer from "../../components/user/FilterDrawer";

export default function UserProducts() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  const [showSuccess, setShowSuccess] = useState({
    open: false,
    title: "",
    description: "",
  });
  const [showError, setShowError] = useState({
    open: false,
    title: "",
    description: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState(1);
  const [sortProperty, setSortProperty] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilterSelected, setCategoryFilterSelected] = useState("");

  console.log("test");

  // Make axios request
  useEffect(() => {
    let fetchUrl;
    if (
      searchQuery == "" &&
      priceFilter == 1 &&
      sortProperty == "" &&
      sortOrder == "" &&
      categoryFilterSelected == ""
    ) {
      fetchUrl = `${URL_API}/user/products?page=${page}&limit=${productsPerPage}`;
    } else {
      fetchUrl = `${URL_API}/user/products?page=${page}&limit=${productsPerPage}&sortBy=${sortProperty}&order=${sortOrder}&name=${searchQuery}&price=${priceFilter}&category=${categoryFilterSelected}`;
    }
    console.log(fetchUrl);
    axios
      .get(fetchUrl)
      .then((res) => {
        setData(() => res.data.content);
        setTotalData(res.data.details);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    page,
    productsPerPage,
    showSuccess,
    searchQuery,
    priceFilter,
    sortProperty,
    sortOrder,
    categoryFilterSelected,
  ]);

  console.log(data);

  const sendDataFilter = (name, price, sortBy, sequence, category) => {
    setSearchQuery(name);
    setPriceFilter(price);
    setSortProperty(sortBy);
    setSortOrder(sequence);
    setCategoryFilterSelected(category);
    setPage(1);
    console.log("name: ", searchQuery);
    console.log("price: ", priceFilter);
    console.log("sortBy: ", sortProperty);
    console.log("sequence: ", sortOrder);
    console.log("category: ", categoryFilterSelected);
  };

  let maxPage;

  if (totalData < productsPerPage) {
    maxPage = 1;
  } else if (totalData % productsPerPage > 0) {
    maxPage = Math.ceil(totalData / productsPerPage);
  } else {
    maxPage = totalData / productsPerPage;
  }

  console.log(page, maxPage);

  return (
    <Box>
      <Flex flexDir={{ base: "column", md: "row" }}>
        <Box
          w={{ base: "100vw", md: "40vw", lg: "20vw" }}
          h="100%"
          backgroundColor="gray.100"
          padding="1rem"
          borderRadius="0 0 20px 0"
          boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
        >
          <FilterDrawer sendDataFilter={sendDataFilter}></FilterDrawer>
        </Box>

        <Box w={{ base: "100vw", md: "60vw", lg: "80vw" }} pt={10}>
          <VStack spacing={2} textAlign="center">
            <Heading as="h1" fontSize="4xl">
              Order Medicine Only From Pharmastore
            </Heading>
            <Text fontSize="lg" color={"gray.500"}>
              Genuine medicines and essentials delivered in a jiffy!
            </Text>
          </VStack>

          <Container maxW="6xl" centerContent>
            <Wrap
              spacing="20px"
              padding="50px 0"
              alignItems="center"
              justifyContent="center"
              justify="center"
            >
              {data.map((product, index) => {
                return (
                  <WrapItem key={index}>
                    <UserProductCard productData={product}></UserProductCard>
                  </WrapItem>
                );
              })}
            </Wrap>
          </Container>
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
                  <MdNavigateBefore
                    style={{ fontSize: "1.5em" }}
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  />
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
                No products found! Please check your query!
              </Alert>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
