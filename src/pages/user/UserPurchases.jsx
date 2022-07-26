import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Select,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const UserPurchases = () => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);

  // const { email, username, id: userId } = useSelector((state) => state.user);
  // console.log(userId);

  const [purchaseState, setPurchaseState] = useState("all");

  const changeView = (event) => {
    setPurchaseState(event.target.value);
  };

  useEffect(() => {
    let url = `/user/history/${purchaseState}`;

    api
      .get(url)
      .then((res) => {
        setData(() => res.data.content);
        setTotalData(res.data.details);
        // console.log(res);
      })
      .catch((err) => {
        // console.log("error");
        console.log(err);
      });
  }, [purchaseState]);

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
        spacing={{
          base: "8",
          md: "10",
        }}
        flex="2"
      >
        <Heading fontSize="2xl" fontWeight="extrabold">
          My Purchase ({totalData} purchase(s))
        </Heading>
      </Stack>
      <Flex alignItems="center" mt={6}>
        <Text fontSize="xl" mr={4}>
          View purchase:{" "}
        </Text>
        <Select defaultValue="all" onChange={changeView} w="fit-content">
          <option value="all">All Purchases</option>
          <option value="ongoing">Ongoing Purchases</option>
          <option value="finished">Finished Purchases</option>
        </Select>
      </Flex>
      <Stack mt={10}>
        {totalData ? (
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Invoice Code</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Amount</Th>
                  <Th isNumeric>Shipping Cost</Th>
                  <Th isNumeric>Total Payment</Th>
                  <Th>Payment Method</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <Link
                          style={{ color: "blue", textDecoration: "underline" }}
                          to={`/purchases/${item.code}`}
                        >
                          {item.code}
                        </Link>
                      </Td>
                      <Td>{item.date}</Td>
                      <Td isNumeric>
                        Rp{" "}
                        {parseInt(item.shopping_amount).toLocaleString("id-ID")}
                      </Td>
                      <Td isNumeric>
                        Rp{" "}
                        {parseInt(item.shipping_cost).toLocaleString("id-ID")}
                      </Td>
                      <Td isNumeric>
                        Rp{" "}
                        {parseInt(item.total_payment).toLocaleString("id-ID")}
                      </Td>

                      <Td>{item.payment_method}</Td>
                      <Td>{item.status}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
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
              You don't have any purchase yet.
            </Alert>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default UserPurchases;
