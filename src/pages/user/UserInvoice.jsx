import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  Grid,
  GridItem,
  List,
  ListItem,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  CircularProgress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import InvoiceItems from "../../components/user/InvoiceItems";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { URL_API } from "../../helpers";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBraintreeClientToken,
  processPayment,
} from "../../services/payment";
import DropIn from "braintree-web-drop-in-react";

function ModalMessage({ isOpen, onClose, status, subject, message }) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          backgroundColor="rgba(211, 211, 211, 0.7)"
          opacity="0.4"
        />
        <ModalContent
          p={3}
          backgroundColor={status == "success" ? "green.100" : "red.100"}
        >
          <ModalHeader>{subject}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function Spinner({ isOpen }) {
  return (
    <>
      <Modal isCentered isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay
          backgroundColor="rgba(211, 211, 211, 0.7)"
          opacity="0.4"
        />
        <CircularProgress
          isIndeterminate
          color="red.300"
          position="absolute"
          top="50vh"
          left="50vw"
          transform="translate(-50%, -50%)"
          zIndex="99999"
        />
      </Modal>
    </>
  );
}

export default function UserInvoice() {
  const { email, username, id: userId } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [addFile, setAddFile] = useState(null);
  const [paymentData, setPaymentData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const { invoiceCode } = useParams();

  const [isOpen, setIsOpen] = useState({
    open: false,
    status: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const getToken = () => {
    getBraintreeClientToken().then((dataResponse) => {
      if (dataResponse.status != 200) {
        setPaymentData({
          ...paymentData,
          error: dataResponse.data,
        });
      } else {
        setPaymentData({
          ...paymentData,
          success: true,
          clientToken: dataResponse.data.clientToken,
        });
      }
    });
  };

  useEffect(() => {
    let url = `/user/checkout/get-invoice/${invoiceCode}`;

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
  }, [invoiceCode]);

  useEffect(() => {
    getToken();
  }, []);

  // IMAGE HANDLING //
  const onBtnAddFile = (e) => {
    setAddFile(e.target.files);
  };

  let invoiceId = data.length && data[0].id;

  ////////////////////////
  // SUBMISSION HANDLER //
  ////////////////////////
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    // Buat form data, agar bisa menampung file
    let formData = new FormData();

    // Buat body nya
    let obj = {
      invoiceId: invoiceId,
    };
    // Masukkan body nya
    formData.append("data", JSON.stringify(obj));

    // Masukkan file nya
    for (let i = 0; i < addFile.length; i++) {
      let file = addFile.item(i);
      formData.append("file", file);
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    let url = `/user/checkout/upload/${invoiceId}`;

    //buat requestnya
    api
      .post(url, formData)
      .then((res) => {
        setLoading(false);
        setAddFile(null);
        setIsOpen({
          ...isOpen,
          open: true,
          status: "success",
          subject: res.data.subject,
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsOpen({
          ...isOpen,
          open: true,
          status: "error",
          subject: err.data.subject,
          message: err.data.message,
        });
        setLoading(false);
      });
  };

  ////////////////////////
  // PAYMENT HANDLER //
  ////////////////////////
  const paymentHandler = () => {
    // setLoading(true);
    let nonce;
    let getNonce = paymentData.instance
      .requestPaymentMethod()
      .then((nonceData) => {
        nonce = nonceData.nonce;
        const noncePaymentData = {
          paymentMethodNonce: nonce,
          amount: parseInt(data[0].total_payment),
        };
        processPayment(noncePaymentData)
          .then((res) => {
            setIsOpen({
              ...isOpen,
              open: true,
              status: "success",
              subject: "Payment success.",
              message: "Thank you for your payment.",
            });
          })
          .catch((err) => {
            console.log(err);
            setIsOpen({
              ...isOpen,
              open: true,
              status: "error",
              subject: "Payment failed.",
              message: "Please try another method.",
            });
          });
      })
      .catch((error) => {
        console.log("dropin error", error);
        setPaymentData({ ...paymentData, error: error });
      });
  };

  return (
    <>
      <Container maxW={"7xl"} py={12} px={10}>
        <Spinner isOpen={loading}></Spinner>
        <ModalMessage
          isOpen={isOpen.open}
          onClose={() => {
            setIsOpen({
              ...isOpen,
              open: false,
              status: "",
              subject: "",
              message: "",
            });
            navigate("/", { replace: true });
          }}
          status={isOpen.status}
          subject={isOpen.subject}
          message={isOpen.message}
        ></ModalMessage>
        <Heading textAlign="center">Invoice</Heading>
        <Box borderRadius={"lg"} bg={useColorModeValue("gray.50", "gray.800")}>
          <Grid
            templateAreas={`"empty empty empty header header"
                  "shipto shipto shipto amount amount"`}
            gridTemplateRows={"150px 150px"}
            gridTemplateColumns={"repeat(5, 1fr)"}
            gap="1"
            color="blackAlpha.700"
            fontWeight="bold"
            mt={{ base: 18 }}
          >
            <GridItem
              pl={{ base: "100px", lg: "200px" }}
              area={"header"}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "3xl" }}
              >
                {data.length && data[0].code}
              </Heading>

              <Text fontWeight="400">
                Issue Date: {data.length && data[0].date}{" "}
              </Text>
            </GridItem>
            <GridItem pl={10} area={"shipto"} pt="3">
              <Text>SHIP TO</Text>
              <Text fontWeight="400">{data.length && data[0].address}</Text>
              <Text fontWeight="400">
                {data.length && data[0].city}, {data.length && data[0].province}
              </Text>
              <Text fontWeight="400">{data.length && data[0].postal_code}</Text>
            </GridItem>
            <GridItem
              pl={{ base: "100px", lg: "200px" }}
              pt="3"
              //  bg="green.300"
              area={"amount"}
            >
              <Text>AMOUNT</Text>
              <Text fontWeight="400">
                Rp{" "}
                {data.length &&
                  parseInt(data[0].total_payment).toLocaleString("id-ID")}
              </Text>
              {/* <Text pt={2}>DUE DATE</Text>
              <Text fontWeight="400">19 Januari 2021</Text> */}
            </GridItem>
          </Grid>

          <Stack spacing={{ base: 6, md: 10 }}>
            <Heading lineHeight={1.1} fontWeight={600} fontSize="xl" pl={10}>
              Purchase Details
            </Heading>
          </Stack>
          {data.length && <InvoiceItems data={data}></InvoiceItems>}

          {data.length &&
          data[0].payment_method == "Bank Transfer" &&
          data[0].status == "Waiting for payment" ? (
            <>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize="xl"
                  pl={10}
                >
                  Proof of Payment
                </Heading>
              </Stack>
              <Stack pt={5} pl={10}>
                <Input
                  type="file"
                  onChange={onBtnAddFile}
                  p="4px"
                  w="250px"
                ></Input>
              </Stack>
            </>
          ) : (
            paymentData.clientToken &&
            data[0].status == "Waiting for payment" && (
              <Box
                maxW="500px"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                margin="auto"
              >
                <DropIn
                  options={{
                    authorization: paymentData.clientToken,
                    // paypal: {
                    //   flow: "vault",
                    // },
                  }}
                  onInstance={(instance) => {
                    setPaymentData({ ...paymentData, instance: instance });
                  }}
                ></DropIn>
              </Box>
            )
          )}

          {data.length && data[0].status != "Waiting for payment" && (
            <Stack pb={10}>
              <Heading lineHeight={1.1} fontWeight={600} fontSize="xl" pl={10}>
                Status
              </Heading>
              <Text fontWeight={400} pl={10}>
                {data[0].status}
              </Text>
            </Stack>
          )}
        </Box>

        {data.length &&
        data[0].payment_method == "Bank Transfer" &&
        data[0].status == "Waiting for payment" ? (
          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={"red.500"}
            color={"white"}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={submitHandler}
          >
            Upload Proof of Payment
          </Button>
        ) : (
          data.length &&
          data[0].status == "Waiting for payment" && (
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={"red.500"}
              color={"white"}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={paymentHandler}
            >
              Pay
            </Button>
          )
        )}
      </Container>
    </>
  );
}
