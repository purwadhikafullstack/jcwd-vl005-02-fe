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
  Icon,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
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
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import { AiFillMedicineBox } from "react-icons/ai";
import { useDispatch } from "react-redux";

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

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

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

  const dispatch = useDispatch();

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
    let url = `/user/history/unopened-notifications`;
    api
      .get(url)
      .then((res) => {
        dispatch({
          type: "UPDATE_BADGE",
          payload: { totalNotificationBadge: res.data.details },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  function getPDF() {
    return axios.get(
      `${URL_API}/user/history/generate-invoice/${invoiceCode}`,
      {
        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf",
          "Auth-Token": localStorage.getItem("token"),
        },
      }
    );
  }

  const savePDF = () => {
    return getPDF() // API call
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Invoice-${invoiceCode}.pdf`;
        link.click();
      })
      .catch((err) => console.log(err));
  };

  console.log(data);

  return (
    <>
      <Box
        maxW={"7xl"}
        borderRadius={"lg"}
        bg={useColorModeValue("gray.50", "gray.800")}
        mx="auto"
        my={10}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={10}
          borderRadius={"lg"}
          bg={useColorModeValue("gray.300", "gray.800")}
          py={12}
        >
          <Flex direction="column" px={10}>
            <Flex alignItems="center">
              {" "}
              <Heading
                color={"blue.700"}
                fontWeight={900}
                fontSize={"3xl"}
                p={2}
                pt={3}
                alignSelf={"flex-start"}
              >
                <AiFillMedicineBox />
              </Heading>
              <Heading
                color={"blue.700"}
                fontWeight={900}
                fontSize={"3xl"}
                p={2}
                alignSelf={"flex-start"}
              >
                Pharmastore
              </Heading>
            </Flex>

            <Text fontWeight={600} px={14}>
              JL Tebet Barat Dalam Raya No. 153-A{" "}
            </Text>
            <Text fontWeight={600} px={14}>
              Jakarta, 12810
            </Text>
            <Text fontWeight={600} px={14}>
              021-827607672
            </Text>
          </Flex>
          <Stack>
            <Flex
              rounded={"md"}
              px={10}
              justifyContent={{ base: "flex-start", lg: "flex-end" }}
            >
              <Text
                textTransform={"uppercase"}
                color={"blue.700"}
                fontWeight={600}
                fontSize={"3xl"}
                p={2}
                alignSelf={"flex-start"}
              >
                Invoice Code:
              </Text>
              <Text
                textTransform={"uppercase"}
                color={"blue.600"}
                fontWeight={600}
                fontSize={"3xl"}
                bg={useColorModeValue("blue.50", "blue.900")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                {data.length && data[0].code}
              </Text>
            </Flex>
            <Flex
              rounded={"md"}
              px={10}
              justifyContent={{ base: "flex-start", lg: "flex-end" }}
            >
              <Text
                textTransform={"uppercase"}
                color={"blue.700"}
                fontWeight={600}
                px={2}
                pr={{ base: 8, lg: 0 }}
                alignSelf={"flex-start"}
              >
                Issue Date
              </Text>
              <Text
                textTransform={"uppercase"}
                color={"blue.400"}
                fontWeight={600}
                px={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                : {data.length && data[0].date}{" "}
              </Text>
            </Flex>
            <Flex
              rounded={"md"}
              px={10}
              justifyContent={{ base: "flex-start", lg: "flex-end" }}
            >
              <Text
                textTransform={"uppercase"}
                color={"blue.700"}
                fontWeight={600}
                px={2}
                alignSelf={"flex-start"}
                pr={{ base: 3, lg: 0 }}
              >
                Expired Date
              </Text>
              <Text
                textTransform={"uppercase"}
                color={"blue.400"}
                fontWeight={600}
                px={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                : {data.length && data[0].expired_date}{" "}
              </Text>
            </Flex>
          </Stack>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} pt={10}>
          <Stack px={10}>
            <Text
              textTransform={"uppercase"}
              color={"gray.500"}
              fontWeight={600}
              fontSize={"md"}
              bg={useColorModeValue("gray.50", "gray.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              SHIP TO
            </Text>
            <Text color={"gray.500"} fontSize={"md"}>
              {data.length && data[0].address}
            </Text>
            <Text color={"gray.500"} fontSize={"md"}>
              {data.length && data[0].city}, {data.length && data[0].province}
            </Text>
            <Text color={"gray.500"} fontSize={"md"}>
              {data.length && data[0].postal_code}
            </Text>
          </Stack>
          <Stack px={10}>
            <Text
              textTransform={"uppercase"}
              color={"gray.500"}
              fontWeight={600}
              fontSize={"md"}
              bg={useColorModeValue("gray.50", "gray.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              BUYER INFORMATION
            </Text>
            <Flex>
              <Text
                color={"gray.500"}
                fontSize={"md"}
                fontWeight="600"
                w="100px"
              >
                Name
              </Text>
              <Text color={"gray.500"} fontSize={"md"} fontWeight="400">
                : {data.length && data[0].first_name}{" "}
                {data.length && data[0].last_name}
              </Text>
            </Flex>
            <Flex>
              <Text
                color={"gray.500"}
                fontSize={"md"}
                fontWeight="600"
                w="100px"
              >
                Phone
              </Text>
              <Text color={"gray.500"} fontSize={"md"} fontWeight="400">
                : {data.length && data[0].phone}
              </Text>
            </Flex>
          </Stack>
          <Flex justifyContent="space-between" flexDirection="column" px={10}>
            <Text
              textTransform={"uppercase"}
              color={"gray.500"}
              fontWeight={600}
              fontSize={"md"}
              bg={useColorModeValue("gray.50", "gray.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              PAYMENT INFORMATION
            </Text>
            <Flex>
              <Text
                color={"gray.500"}
                fontSize={"md"}
                fontWeight="600"
                w="150px"
              >
                Payment amount
              </Text>
              <Text color={"gray.500"} fontSize={"md"} fontWeight="400">
                : Rp{" "}
                {data.length &&
                  parseInt(data[0].total_payment).toLocaleString("id-ID")}
              </Text>
            </Flex>
            <Flex>
              <Text
                color={"gray.500"}
                fontSize={"md"}
                fontWeight="600"
                w="150px"
              >
                Payment method
              </Text>
              <Text color={"gray.500"} fontSize={"md"} fontWeight="400">
                : {data.length && data[0].payment_method}
              </Text>
            </Flex>
            <Flex>
              <Text
                color={"gray.500"}
                fontSize={"md"}
                fontWeight="600"
                w="150px"
              >
                Date of payment
              </Text>
              <Text color={"gray.500"} fontSize={"md"} fontWeight="400">
                :{" "}
                {data.length && data[0].payment_date
                  ? data[0].payment_date
                  : "Waiting for payment"}
              </Text>
            </Flex>
          </Flex>
        </SimpleGrid>
        <Divider py={5}></Divider>
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
        <Heading textAlign="center" fontSize="2xl" pt={5} color="gray.500">
          Purchase Details
        </Heading>

        {data.length && <InvoiceItems data={data}></InvoiceItems>}

        <Heading
          textAlign="center"
          fontSize="2xl"
          pt={5}
          color="gray.500"
          pb={10}
        >
          Invoice Status:{" "}
          <Badge
            variant="solid"
            colorScheme={
              data.length && data[0].status == "Waiting for payment"
                ? "yellow"
                : data.length && data[0].status == "Waiting for verification"
                ? "blue"
                : data.length && data[0].status == "Approved"
                ? "green"
                : "red"
            }
            fontSize="2xl"
          >
            {data.length && data[0].status}
          </Badge>
        </Heading>

        {/* Jika payment method adalah Bank Transfer dan status masih waiting for payment maka tampilan Button upload untuk bukti bayar */}
        {data.length &&
        data[0].payment_method == "Bank Transfer" &&
        data[0].status == "Waiting for payment" ? (
          <>
            <Alert
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="350px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Waiting for payment.
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                This invoice has not been paid. If you have already done the
                payment via bank transfer, please upload your proof of payment
                below.
              </AlertDescription>

              <Stack pt={5} pl={10}>
                <Input
                  type="file"
                  onChange={onBtnAddFile}
                  p="4px"
                  w="250px"
                ></Input>
              </Stack>
              {addFile ? (
                <Button
                  rounded={"lg"}
                  w={"50%"}
                  mt={8}
                  size={"md"}
                  py={"7"}
                  bg={"yellow.500"}
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
                <Button
                  rounded={"lg"}
                  w={"50%"}
                  mt={8}
                  size={"md"}
                  py={"7"}
                  bg={"yellow.500"}
                  color={"white"}
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  disabled={true}
                >
                  Upload Proof of Payment
                </Button>
              )}
            </Alert>
          </>
        ) : /* Jika payment method adalah CC dan status masih waiting for payment maka tampilan Drop in untuk pembayaran */
        paymentData.clientToken && data[0].status == "Waiting for payment" ? (
          <>
            <Alert
              status="yellow"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="600px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Waiting for payment.
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                This invoice has not been paid. Please make the payment below.
              </AlertDescription>
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
              <Button
                rounded={"lg"}
                w={"50%"}
                mt={8}
                size={"md"}
                py={"7"}
                bg={"yellow.500"}
                color={"white"}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                mb="20px"
                onClick={paymentHandler}
              >
                Pay
              </Button>
            </Alert>
          </>
        ) : paymentData.clientToken && data[0].status == "Approved" ? (
          <>
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="250px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Your payment has been verified.
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Thank you for purchasing our products. Please wait for the
                shipment process.
              </AlertDescription>
            </Alert>
          </>
        ) : paymentData.clientToken &&
          data[0].status == "Waiting for verification" ? (
          <>
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="250px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Your payment is in verification process.
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Thank you for purchasing our products. Please wait for the
                verification process.
              </AlertDescription>
            </Alert>
          </>
        ) : (
          <>
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="250px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Your payment is rejected.
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Your payment has been rejected, either due to expired invoice or
                lack of payment amount. Please contact admin for further
                information.
              </AlertDescription>
            </Alert>
          </>
        )}
      </Box>
      <Button
        onClick={savePDF}
        variant="solid"
        colorScheme="blue"
        margin="auto"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        display="flex"
        mb={10}
        cursor="pointer"
      >
        Download Invoice
      </Button>
    </>
  );
}
