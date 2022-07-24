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
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import AlertConfirmation from "../../components/user/AlertConfirmation";
import UserAddressEdit from "./UserAddressEdit";

const UserAddressList = () => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isInformationOpen, setIsInformationOpen] = useState(false);

  const [idToDelete, setIdToDelete] = useState(0);
  const [updateAddress, setUpdateAddress] = useState(false);

  // const { email, username, id: userId } = useSelector((state) => state.user);
  // console.log(userId);

  console.log(updateAddress);

  useEffect(() => {
    let url = `/user/address`;

    api
      .get(url)
      .then((res) => {
        setData(() => res.data.content);
        setTotalData(res.data.details);
        // console.log(res);
        setUpdateAddress(false);
      })
      .catch((err) => {
        // console.log("error");
        console.log(err);
        setUpdateAddress(false);
      });
  }, [isConfirmationOpen, isInformationOpen, updateAddress]);

  console.log(data);

  const deleteHandler = (id) => {
    setIsConfirmationOpen(true);
    setIdToDelete(id);
  };

  const onClose = () => {
    setIsConfirmationOpen(false);
    setIsInformationOpen(false);
  };

  const onConfirm = () => {
    console.log("delete", idToDelete);
    let url = `/user/address/${idToDelete}`;

    api
      .delete(url)
      .then((res) => {
        console.log(res);
        onClose();
        setIsInformationOpen(true);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        onClose();
        setIsInformationOpen(true);
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
      <AlertConfirmation
        isNeedConfirmation={true}
        isOpen={isConfirmationOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Delete Confirmation"
        message="Are you sure to delete this address?"
      />{" "}
      <AlertConfirmation
        isNeedConfirmation={false}
        isOpen={isInformationOpen}
        onClose={onClose}
        title="Delete Successful"
        message="Address deleted successfully"
      />
      <Stack
        spacing={{
          base: "8",
          md: "10",
        }}
        flex="2"
      >
        <Heading fontSize="2xl" fontWeight="extrabold">
          My Address ({totalData} address(es))
        </Heading>
      </Stack>
      <Link to="new">
        <Button mt={4} colorScheme="red">
          Add New Address
        </Button>
      </Link>
      <Stack mt={10}>
        {totalData ? (
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Label</Th>
                  <Th>Address</Th>
                  <Th textAlign="center">Postal Code</Th>
                  <Th textAlign="center">City</Th>
                  <Th>Province</Th>
                  <Th textAlign="center">Phone</Th>
                  <Th colSpan={2} textAlign="center">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{item.label}</Td>
                      <Td>{item.address}</Td>
                      <Td textAlign="center">{item.postal_code}</Td>
                      <Td>{item.city}</Td>
                      <Td>{item.province}</Td>
                      <Td isNumeric>{item.phone}</Td>
                      <Td>
                        {/* <Link to={`edit/${item.id}`}>  
                          <Button colorScheme="blue">Edit</Button>
                        </Link>*/}
                        <UserAddressEdit
                          data={item}
                          onEdit={setUpdateAddress}
                        ></UserAddressEdit>
                      </Td>
                      <Td>
                        <Button
                          colorScheme={"red"}
                          onClick={() => {
                            deleteHandler(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
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
              You don't have any address registered yet.
            </Alert>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default UserAddressList;
