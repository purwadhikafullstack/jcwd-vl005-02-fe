import { ReactNode } from "react";
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

function FilterDrawer() {
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
          <FormLabel htmlFor="username"> Name</FormLabel>
          <Input id="username" placeholder="Please enter user name" />
        </Box>

        <Box padding="0 20px">
          <FormLabel htmlFor="owner"> Category</FormLabel>
          <Select id="owner" defaultValue="segun">
            <option value="segun">Segun Adebayo</option>
            <option value="kola">Kola Tioluwani</option>
          </Select>
        </Box>

        <Box padding="0 20px">
          <FormLabel htmlFor="desc">Sort by</FormLabel>
          <Select id="owner" defaultValue="segun" mb={3}>
            <option value="segun">Segun Adebayo</option>
            <option value="kola">Kola Tioluwani</option>
          </Select>
          <RadioGroup defaultValue="2">
            <Stack spacing={5} direction="row">
              <Radio colorScheme="green" value="2">
                Descending
              </Radio>
              <Radio colorScheme="red" value="1">
                Ascending
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Stack>
      <Box padding="20px 20px">
        <Button colorScheme="blue">Submit</Button>
      </Box>
    </Box>
  );
}

export default FilterDrawer;
