import {
  Box,
  Button,
  CloseButton,
  Container,
  Heading,
  Icon,
  Square,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import api from "../../services/api";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io.connect("http://localhost:2000");

export default function UserNotifications() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    let url = `/user/history/notifications`;

    api
      .get(url)
      .then((res) => {
        setData(() => res.data.content);
        setTotalData(res.data.details);
        console.log(data);
      })
      .catch((err) => {
        // console.log("error");
        console.log(err);
      });
  }, [socket]);

  console.log(data);

  return (
    <Container maxW={"7xl"} margin="auto" py={12} px={10}>
      <Heading textAlign="center">Notifications</Heading>

      <TableContainer pt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Message</Th>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length &&
              data.map((item) => (
                <Tr>
                  <Td>{item.message}</Td>
                  <Td textAlign="center">{item.date}</Td>
                  <Td textAlign="center">
                    <Link to={`/purchases/${item.invoice_header_code}`}>
                      <Button>See details</Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
