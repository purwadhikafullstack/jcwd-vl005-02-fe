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
import { useNavigate } from "react-router-dom";
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
      console.log(dataResponse);
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

  console.log(paymentData);

  useEffect(() => {
    let url = `/user/checkout/get-invoice`;

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
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  console.log(data);

  // IMAGE HANDLING //
  // let preview = document.getElementById("imgpreview");
  const onBtnAddFile = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    setAddFile(e.target.files);
    // if (e.target.files[0]) {
    //   function createImageItem(i) {
    //     let image = document.createElement("img");
    //     image.src = URL.createObjectURL(e.target.files[i]);
    //     image.classList.add(`${styles["img-preview"]}`);

    //     return image;
    //   }

    //   preview.replaceChildren();
    //   for (var j = 0; j < e.target.files.length; j++) {
    //     preview.appendChild(createImageItem(j));
    //   }
    // }
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

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    let url = `/user/checkout/upload/${invoiceId}`;

    //buat requestnya
    console.log("masuk axios");
    api
      .post(url, formData)
      .then((res) => {
        console.log(res);
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
    console.log("nonce");
    let nonce;
    let getNonce = paymentData.instance
      .requestPaymentMethod()
      .then((nonceData) => {
        nonce = nonceData.nonce;
        const noncePaymentData = {
          paymentMethodNonce: nonce,
          amount: parseInt(data[0].total_payment),
        };
        console.log("Bayar");
        processPayment(noncePaymentData)
          .then((res) => {
            console.log(res);
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

  // console.log(parseInt(data[0].total_payment));
  // console.log(paymentData);

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
              <Text pt={2}>DUE DATE</Text>
              <Text fontWeight="400">19 Januari 2021</Text>
            </GridItem>
          </Grid>

          <Stack spacing={{ base: 6, md: 10 }}>
            <Heading lineHeight={1.1} fontWeight={600} fontSize="xl" pl={10}>
              Purchase Details
            </Heading>
          </Stack>
          {data.length && <InvoiceItems data={data}></InvoiceItems>}

          {data.length && data[0].payment_method == "Bank Transfer" ? (
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
            paymentData.clientToken && (
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
        </Box>

        {data.length && data[0].payment_method == "Bank Transfer" ? (
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
        )}
      </Container>
    </>
  );
}
