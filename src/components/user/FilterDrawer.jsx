import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Button,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { URL_API } from "../../helpers";
import axios from "axios";
import api from "../../services/api";

function FilterDrawer({ sendDataFilter }) {
  const [productCategories, setProductCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");
  const [sortBy, setSortBy] = useState("");
  const [sequence, setSequence] = useState("asc");
  const [category, setCategory] = useState("");

  useEffect(() => {
    let url = `/admin/categories`;

    api
      .get(url)
      .then((res) => {
        setProductCategories(() => res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleName = (event) => {
    setName(event.target.value);
    // console.log(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
    // console.log(event.target.value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
    // console.log(event.target.value);
  };

  const handleSequence = (event) => {
    setSequence(event);
    // console.log(event);
  };

  const handlePrice = (event) => {
    setPrice(event);
    // console.log(event);
  };

  return (
    <Box>
      <Text
        padding="20px 20px"
        fontSize="1.3rem"
        fontWeight="700"
        textAlign="center"
      >
        Product Filter
      </Text>
      <Stack spacing="24px">
        <Box padding="0 20px">
          <FormLabel htmlFor="name"> Name</FormLabel>
          <Input
            id="name"
            placeholder="Please enter product name"
            onChange={handleName}
            value={name}
          />
        </Box>

        <Box padding="0 20px">
          <FormLabel htmlFor="category"> Category</FormLabel>
          <Select
            id="category"
            placeholder="Select category"
            onChange={handleCategory}
            value={category}
          >
            {productCategories.map((c, index) => {
              return (
                <option value={c.name} key={index}>
                  {c.name}
                </option>
              );
            })}
          </Select>
        </Box>

        <Box padding="0 20px">
          <FormLabel htmlFor="sortby">Sort by</FormLabel>
          <Select
            id="sortby"
            placeholder="Select option"
            mb={3}
            onChange={handleSort}
            value={sortBy}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="sold">Units Sold</option>
            <option value="sold_times">Times Sold</option>
            <option value="stock_in_unit">Stock</option>
          </Select>
          <RadioGroup
            onChange={handleSequence}
            value={sequence}
            defaultValue="asc"
          >
            <Stack spacing={4} direction={{ base: "column", xl: "row" }}>
              <Radio colorScheme="red" value="asc">
                Ascending
              </Radio>
              <Radio colorScheme="red" value="desc">
                Descending
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box padding="0 20px">
          <FormLabel htmlFor="price">Price</FormLabel>
          <RadioGroup
            onChange={handlePrice}
            colorScheme="red"
            defaultValue="1"
            value={price}
          >
            <Stack direction="column">
              <Radio value="0-unlimited">All price</Radio>
              <Radio value="0-249">Rp 0 - 249</Radio>
              <Radio value="250-499">Rp 250 - Rp 499</Radio>
              <Radio value="500-999">Rp 500 - Rp 999</Radio>
              <Radio value="1000-2000">Rp 1.000 - Rp 2.000</Radio>
              <Radio value="2000-unlimited">Above Rp 2.000</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Stack>
      <Box
        padding="20px 20px"
        display="flex"
        justifyContent="space-around"
        flexDirection={{ base: "column", xl: "row" }}
      >
        <Button
          color="black"
          backgroundColor="gray.400"
          onClick={() => {
            setName("");
            setPrice("1");
            setSortBy("");
            setSequence("asc");
            setCategory("");
          }}
          _hover={{ backgroundColor: "gray.500" }}
          mb={2}
        >
          Reset
        </Button>
        <Button
          colorScheme="red"
          onClick={() =>
            sendDataFilter(name, price, sortBy, sequence, category)
          }
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default FilterDrawer;
