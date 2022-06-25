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
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { URL_API } from "../../helpers/index";
import { Link } from "react-router-dom";

export default function UserProductCard({ productData }) {
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
          <Text fontSize="xl" fontWeight="600" pb={2}>
            Rp {productData.price}
          </Text>
          {productData.stock ? (
            <Badge colorScheme="green" textTransform="unset">
              In stock: {productData.stock} unit(s)
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
          <Button w="45%" colorScheme="red">
            <BsCartPlus />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
