import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Tfoot,
} from "@chakra-ui/react";

const InvoiceItems = ({ data }) => {
  return (
    <TableContainer py={4} px={{ base: "4", md: "10" }}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>DESCRIPTION</Th>
            <Th>QTY</Th>
            <Th textAlign="right">UNIT PRICE</Th>
            <Th textAlign="right">TOTAL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.amount}</Td>
                <Td textAlign="right">
                  Rp {parseInt(item.price).toLocaleString("id-ID")}
                </Td>
                <Td textAlign="right">
                  Rp{" "}
                  {parseInt(item.price * item.amount).toLocaleString("id-ID")}
                </Td>
              </Tr>
            ))}
          <Tr key="shipping">
            <Td>Shipping Cost</Td>
            <Td>1</Td>
            <Td textAlign="right">
              Rp {parseInt(data[0].shipping_cost).toLocaleString("id-ID")}
            </Td>
            <Td textAlign="right">
              Rp {parseInt(data[0].shipping_cost).toLocaleString("id-ID")}
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={3} fontSize="md">
              GRAND TOTAL
            </Th>
            <Th fontSize="md" textAlign="right">
              Rp {parseInt(data[0].total_payment).toLocaleString("id-ID")}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default InvoiceItems;
