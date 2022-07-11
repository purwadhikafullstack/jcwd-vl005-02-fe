import {
  Box,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Flex,
  Image,
  Badge,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { URL_API } from "../../helpers/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "../../services/api";

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

export default function UserProductCard({ productData }) {
  const { email, username, id: userId } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState({
    open: false,
    status: "",
    subject: "",
    message: "",
  });

  const addToCart = (productData) => {
    console.log(productData);
    let productId = productData.id;

    let url = `/user/cart/add/${productId}`;
    api
      .post(url, productData)
      .then((res) => {
        console.log(res);
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
      });
  };

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      // borderColor={useColorModeValue("gray.200", "gray.500")}
      // borderRadius={"xl"}
      w="20rem"
      rounded="lg"
      h="100%"
      bg={useColorModeValue("gray.50", "gray.700")}
      position="relative"
    >
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
        }}
        status={isOpen.status}
        subject={isOpen.subject}
        message={isOpen.message}
      ></ModalMessage>

      {productData.stock != 0 ? (
        ""
      ) : (
        <Box
          position="absolute"
          top="-16px"
          left="50%"
          style={{ transform: "translate(-50%)" }}
          zIndex={200}
        >
          <Text
            textTransform="uppercase"
            bg="red.300"
            px={3}
            py={1}
            color="gray.900"
            fontSize="sm"
            fontWeight="600"
            rounded="xl"
          >
            Out of stock
          </Text>
        </Box>
      )}
      <Box
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        justifyContent="center"
        alignItems="center"
        display="flex"
        bg="white"
      >
        <Image
          src={`${URL_API}/${productData.picture}`}
          alt={`Picture of ${productData.name}`}
          roundedTop="lg"
          w="15rem"
          h="15rem"
          objectFit="cover"
        />
      </Box>

      <Box
        bg={useColorModeValue("gray.50", "gray.700")}
        p={4}
        borderBottomRadius={"xl"}
      >
        <Flex
          py={4}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="xl" fontWeight="600">
            {productData.name}
          </Text>

          <Box>
            <Tag>{productData.category}</Tag>
          </Box>
        </Flex>
        <Box minH="70px">
          <Text
            fontSize="1rem"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {productData.description}
          </Text>
        </Box>
        <Flex
          pt={4}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* <Text fontSize="xl" fontWeight="600" pb={2}>
            Rp {parseInt(productData.price).toLocaleString("id-ID")}
          </Text> */}
          <Text fontSize="xl" fontWeight="600" pb={2}>
            Rp {parseInt(productData.price).toLocaleString("id-ID")}/
            {productData.unit}
          </Text>
          {productData.stock ? (
            // <Badge colorScheme="green" textTransform="unset">
            //   In stock: {productData.stock} unit(s)
            // </Badge>
            <Badge colorScheme="green" textTransform="unset">
              In stock: {productData.stock_in_unit} {productData.unit}
            </Badge>
          ) : (
            <Badge colorScheme="gray" textTransform="unset">
              Please ask admin for product availability!
            </Badge>
          )}
        </Flex>

        <Flex
          w="80%"
          pt={7}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          margin="auto"
          bottom="20px"
        >
          <Link
            to={`/products/${productData.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button px={8} colorScheme="gray">
              View
            </Button>
          </Link>

          {productData.stock == 0 || !userId ? (
            <Button w="45%" colorScheme="red" disabled>
              <BsCartPlus />
            </Button>
          ) : (
            <Button
              w="45%"
              colorScheme="red"
              onClick={() => addToCart(productData)}
            >
              <BsCartPlus />
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
