import {
  Alert,
  AlertIcon,
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const socket = io.connect("http://localhost:2000");

export default function UserNotifications() {
  let dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const navigate = useNavigate();

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

  const readNotification = (notificationId, code) => {
    let url = `/user/history/open-notification`;
    console.log("read");
    api
      .patch(url, { notificationId })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "UPDATE_BADGE",
          payload: { totalNotificationBadge: totalData },
        });
      })
      .then(() => navigate(`/purchases/${code}`))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxW={"7xl"} margin="auto" py={12} px={10}>
      <Heading textAlign="center">Notifications</Heading>

      {data.length ? (
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
                    {item.opened == "false" ? (
                      <Td fontWeight="bold">{item.message}</Td>
                    ) : (
                      <Td>{item.message}</Td>
                    )}

                    {item.opened == "false" ? (
                      <Td textAlign="center" fontWeight="bold">
                        {item.date}
                      </Td>
                    ) : (
                      <Td textAlign="center">{item.date}</Td>
                    )}

                    {item.opened == "false" ? (
                      <Td textAlign="center">
                        <Button
                          colorScheme="red"
                          onClick={() =>
                            readNotification(item.id, item.invoice_header_code)
                          }
                        >
                          See details
                        </Button>
                      </Td>
                    ) : (
                      <Td textAlign="center">
                        <Link to={`/purchases/${item.invoice_header_code}`}>
                          <Button>See details</Button>
                        </Link>
                      </Td>
                    )}
                  </Tr>
                ))}
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
          mt={10}
        >
          <Alert
            status="warning"
            maxW="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AlertIcon />
            You don't have any notifications!
          </Alert>
        </Box>
      )}
    </Container>
  );
}
