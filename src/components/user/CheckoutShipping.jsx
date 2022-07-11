import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  FormHelperText,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  CircularProgress,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { URL_API } from "../../helpers";
import api from "../../services/api";
import UserAddressEdit from "./UserAddressEdit";

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

export default function CheckoutShipping({ onShippingInfo }) {
  const [showForm, setShowForm] = useState("inputAddress");
  const [addresses, setAddresses] = useState([]);
  const [label, setLabel] = useState({ value: "", clicked: false });
  const [phone, setPhone] = useState({ value: "", clicked: false });
  const [address, setAddress] = useState({ value: "", clicked: false });
  const [zip, setZip] = useState({ value: "", clicked: false });
  const [city, setCity] = useState({ value: "", clicked: false });
  const [province, setProvince] = useState({ value: "", clicked: false });
  const [name, setName] = useState({ value: "", clicked: false });
  const [addressLabel, setAddressLabel] = useState({
    value: "",
    clicked: false,
  });
  const [shipmentMethod, setShipmentMethod] = useState({
    value: "",
    clicked: false,
  });

  const [shipmentAddress, setShipmentAddress] = useState({});

  const [isOpen, setIsOpen] = useState({
    open: false,
    status: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, username, id: userId } = useSelector((state) => state.user);

  const changeToInput = () => {
    setShowForm("inputAddress");
  };

  const changeToChoose = () => {
    setShowForm("chooseAddress");
  };

  const changeToConfirmation = () => {
    setShowForm("confirmationAddress");
  };

  const handleLabelChange = (e) =>
    setLabel({ ...label, value: e.target.value });
  const handlePhoneChange = (e) =>
    setPhone({ ...phone, value: e.target.value });
  const handleAddressChange = (e) =>
    setAddress({ ...address, value: e.target.value });
  const handleZipChange = (e) => setZip({ ...zip, value: e.target.value });
  const handleCityChange = (e) => setCity({ ...city, value: e.target.value });
  const handleProvinceChange = (e) =>
    setProvince({ ...province, value: e.target.value });
  const handleNameChange = (e) => setName({ ...name, value: e.target.value });
  const handleAddressLabelChange = (e) =>
    setAddressLabel({ ...addressLabel, value: e.target.value });
  const handleShipmentMethodChange = (e) =>
    setShipmentMethod({ ...addressLabel, value: e.target.value });

  const isLabelError = label.value === "" && label.clicked == true;
  const isPhoneError = phone.value === "" && phone.clicked == true;
  const isAddressError = address.value === "" && address.clicked == true;
  const isZipError = zip.value === "" && zip.clicked == true;
  const isCityError = city.value === "" && city.clicked == true;
  const isProvinceError = province.value === "" && province.clicked == true;
  const isNameError = name.value === "" && name.clicked == true;
  const isAddressLabelError =
    addressLabel.value === "" && addressLabel.clicked == true;
  const isShipmentMethodError =
    shipmentMethod.value === "" && shipmentMethod.clicked == true;

  const submitHandler = (event) => {
    event.preventDefault();

    let addressData = {
      newLabel: label.value,
      newPhone: phone.value,
      newAddress: address.value,
      newZip: zip.value,
      newCity: city.value,
      newProvince: province.value,
    };

    setLoading(true);

    let url = `/user/checkout/add-address`;
    api
      .post(url, addressData)
      .then((res) => {
        console.log(res);
        setIsOpen({
          ...isOpen,
          open: true,
          status: "success",
          subject: res.data.subject,
          message: res.data.message,
        });
        setLoading(false);
        changeToChoose();
        setLabel({ value: "", clicked: false });
        setPhone({ value: "", clicked: false });
        setAddress({ value: "", clicked: false });
        setZip({ value: "", clicked: false });
        setCity({ value: "", clicked: false });
        setProvince({ value: "", clicked: false });
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

  useEffect(() => {
    let url = `/user/checkout/addresses`;

    api
      .get(url)
      .then((res) => {
        setAddresses(() => res.data.content);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const submitAddress = () => {
    let url = `/user/checkout/addresses/${addressLabel.value}`;
    api
      .get(url)
      .then((res) => {
        setShipmentAddress(res.data.content[0]);
        onShippingInfo({
          ...res.data.content[0],
          shipmentMethod: shipmentMethod.value,
        });
        setLoading(false);
        changeToConfirmation();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const inputAddress = () => {
    return (
      <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8} w="lg">
        <Stack spacing={4}>
          <FormControl id="label" isRequired isInvalid={isLabelError}>
            <FormLabel htmlFor="label">Address Label</FormLabel>
            <Input
              type="text"
              onChange={handleLabelChange}
              value={label.value}
              onBlur={() => setLabel({ ...label, clicked: true })}
            />
            {!isLabelError ? (
              <FormHelperText>
                Enter the address label (ex: Home, Office, etc).
              </FormHelperText>
            ) : (
              <FormErrorMessage>Label is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="phone" isRequired isInvalid={isPhoneError}>
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <Input
              type="number"
              onChange={handlePhoneChange}
              value={phone.value}
              onBlur={() => setPhone({ ...phone, clicked: true })}
            />
            {!isPhoneError ? (
              <FormHelperText>Enter your contact number.</FormHelperText>
            ) : (
              <FormErrorMessage>Phone number is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="address" isRequired isInvalid={isAddressError}>
            <FormLabel htmlFor="address">Street Address</FormLabel>
            <Input
              type="text"
              onChange={handleAddressChange}
              value={address.value}
              onBlur={() => setAddress({ ...address, clicked: true })}
            />
            {!isAddressError ? (
              <FormHelperText>
                Enter the address street (ex: Harimau Street no 123, etc).
              </FormHelperText>
            ) : (
              <FormErrorMessage>Address detail is required.</FormErrorMessage>
            )}
          </FormControl>
          <HStack>
            <Box>
              <FormControl id="zip" isRequired isInvalid={isZipError}>
                <FormLabel htmlFor="zip">Zip Code</FormLabel>
                <Input
                  type="number"
                  onChange={handleZipChange}
                  value={zip.value}
                  onBlur={() => setZip({ ...zip, clicked: true })}
                />
                {!isZipError ? (
                  <FormHelperText>Enter the address zip number.</FormHelperText>
                ) : (
                  <FormErrorMessage>Zip number is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl id="city" isRequired isInvalid={isCityError}>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  type="text"
                  onChange={handleCityChange}
                  value={city.value}
                  onBlur={() => setCity({ ...city, clicked: true })}
                />
                {!isCityError ? (
                  <FormHelperText>Enter the address city.</FormHelperText>
                ) : (
                  <FormErrorMessage>City is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="province" isRequired isInvalid={isProvinceError}>
            <FormLabel htmlFor="province">Province</FormLabel>
            <Select
              onChange={handleProvinceChange}
              value={province.value}
              onBlur={() => setProvince({ ...province, clicked: true })}
              placeholder="Select option"
            >
              <option value="Aceh">Aceh</option>
              <option value="Bali">Bali</option>
              <option value="Bangka Belitung Islands">
                Bangka Belitung Islands
              </option>
              <option value="Banten">Banten</option>
              <option value="Bengkulu">Bengkulu</option>
              <option value="	Central Java"> Central Java</option>
              <option value="Central Kalimantan">Central Kalimantan</option>
              <option value="Central Papua">Central Papua</option>
              <option value="	Central Sulawesi"> Central Sulawesi</option>
              <option value="East Java">East Java</option>
              <option value="East Kalimantan">East Kalimantan</option>
              <option value="East Nusa Tenggara">East Nusa Tenggara</option>
              <option value="Gorontalo">Gorontalo</option>
              <option value="Highland Papua">Highland Papua</option>
              <option value="Special Capital Region of Jakarta">
                Special Capital Region of Jakarta
              </option>
              <option value="Jambi">Jambi</option>
              <option value="Lampung">Lampung</option>
              <option value="Maluku">Maluku</option>
              <option value="North Kalimantan">North Kalimantan</option>
              <option value="North Maluku">North Maluku</option>
              <option value="North Sulawesi">North Sulawesi</option>
              <option value="North Sumatra">North Sumatra</option>
              <option value="Papua">Papua</option>
              <option value="	Riau"> Riau</option>
              <option value="Riau Islands">Riau Islands</option>
              <option value="Southeast Sulawesi">Southeast Sulawesi</option>
              <option value="South Kalimantan">South Kalimantan</option>
              <option value="South Papua">South Papua</option>
              <option value="South Sulawesi">South Sulawesi</option>
              <option value="	South Sumatra"> South Sumatra</option>
              <option value="Special Region of Yogyakarta">
                Special Region of Yogyakarta
              </option>
              <option value="West Java">West Java</option>
              <option value="West Kalimantan">West Kalimantan</option>
              <option value="West Nusa Tenggara">West Nusa Tenggara</option>
              <option value="	West Papua">West Papua</option>
              <option value="West Sulawesi">West Sulawesi</option>
              <option value="West Sumatra">West Sumatra</option>
            </Select>
            {!isProvinceError ? (
              <FormHelperText>Select the address province.</FormHelperText>
            ) : (
              <FormErrorMessage>Province is required.</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
        <Stack spacing={10} pt={2}>
          {label.value !== "" &&
          phone.value !== "" &&
          address.value !== "" &&
          zip.value !== "" &&
          city.value !== "" &&
          province.value !== "" ? (
            <Button
              loadingText="Submitting"
              size="lg"
              mt={4}
              color={"red.400"}
              _hover={{
                bg: "red.500",
                color: "white",
              }}
              variant="outline"
              onClick={submitHandler}
            >
              Add New Address
            </Button>
          ) : (
            <Button
              loadingText="Submitting"
              size="lg"
              mt={4}
              color={"red.400"}
              _hover={{
                bg: "red.500",
                color: "white",
              }}
              variant="outline"
              disabled={true}
              onClick={null}
            >
              Add New Address
            </Button>
          )}
        </Stack>

        <Stack pt={4} textAlign="center">
          <Text>
            or{" "}
            <Text
              as={Link}
              onClick={changeToChoose}
              fontWeight="500"
              color={"red.400"}
            >
              use existing address
            </Text>
          </Text>
        </Stack>
      </Box>
    );
  };

  const chooseAddress = () => {
    return (
      <Box w="lg" rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
        <Stack spacing={4}>
          <FormControl id="name" isRequired isInvalid={isNameError}>
            <FormLabel htmlFor="name">Recipient Name</FormLabel>
            <Input
              type="text"
              onChange={handleNameChange}
              value={name.value}
              onBlur={() => setName({ ...name, clicked: true })}
              placeholder="Input recipient name"
            />
            {!isNameError ? (
              <FormHelperText>Enter recipient name.</FormHelperText>
            ) : (
              <FormErrorMessage>Recipient name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="address" isRequired isInvalid={isAddressLabelError}>
            <FormLabel htmlFor="address">Choose Address</FormLabel>
            {/* <Select
              placeholder="Select address"
              onChange={handleSelectAddressChange}
            > */}

            <Select
              onChange={handleAddressLabelChange}
              value={addressLabel.value}
              onBlur={() => setAddressLabel({ ...addressLabel, clicked: true })}
              placeholder="Select address"
            >
              {addresses &&
                addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.label}
                  </option>
                ))}
            </Select>
            {!isAddressLabelError ? (
              <FormHelperText>Select the address label.</FormHelperText>
            ) : (
              <FormErrorMessage>Address is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="shipment"
            isRequired
            isInvalid={isShipmentMethodError}
          >
            <FormLabel htmlFor="shipment">Shipment Method</FormLabel>

            <Select
              onChange={handleShipmentMethodChange}
              value={shipmentMethod.value}
              onBlur={() =>
                setShipmentMethod({ ...shipmentMethod, clicked: true })
              }
              placeholder="Select shipment method"
            >
              <option value="JNE">JNE</option>
              <option value="TIKI">TIKI</option>
              <option value="SiCepat">SiCepat</option>
              <option value="Pos Indonesia">Pos Indonesia</option>
              <option value="AnterAja">AnterAja</option>
            </Select>
            {!isShipmentMethodError ? (
              <FormHelperText>Select the shipment method.</FormHelperText>
            ) : (
              <FormErrorMessage>Shipment method is required.</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
        <Stack spacing={10} pt={2}>
          {name.value && addressLabel.value && shipmentMethod.value ? (
            <Button
              loadingText="Submitting"
              size="lg"
              mt={4}
              color={"red.400"}
              _hover={{
                bg: "red.500",
                color: "white",
              }}
              variant="outline"
              onClick={submitAddress}
            >
              Use Address
            </Button>
          ) : (
            <Button
              loadingText="Submitting"
              size="lg"
              mt={4}
              color={"red.400"}
              _hover={{
                bg: "red.500",
                color: "white",
              }}
              variant="outline"
              disabled={true}
            >
              Use Address
            </Button>
          )}
        </Stack>

        <Stack pt={4} textAlign="center">
          <Text>
            or{" "}
            <Text
              as={Link}
              onClick={changeToInput}
              fontWeight="500"
              color={"red.400"}
            >
              add new address
            </Text>
          </Text>
        </Stack>
      </Box>
    );
  };

  const confirmationAddress = () => {
    return (
      <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8} w="lg">
        <Stack spacing={4}>
          <FormLabel htmlFor="label">Recipient Name</FormLabel>
          <Input as={Box} pt="1.5">
            {name.value}
          </Input>

          <FormLabel htmlFor="label">Address Label</FormLabel>
          <Input as={Box} pt="1.5">
            {shipmentAddress.label}
          </Input>

          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <Input as={Box} pt="1.5">
            {shipmentAddress.phone}
          </Input>

          <FormLabel htmlFor="address">Street Address</FormLabel>
          <Input as={Box} pt="1.5">
            {shipmentAddress.address}
          </Input>

          <HStack>
            <Box w={"50%"}>
              <FormLabel htmlFor="zip">Zip Code</FormLabel>
              <Input as={Box} pt="1.5">
                {shipmentAddress.postal_code}
              </Input>
            </Box>
            <Box w={"50%"}>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input as={Box} pt="1.5">
                {shipmentAddress.city}
              </Input>
            </Box>
          </HStack>

          <FormLabel htmlFor="province">Province</FormLabel>
          <Input as={Box} pt="1.5">
            {shipmentAddress.province}
          </Input>
          <FormLabel htmlFor="shipment">Shipment Method</FormLabel>
          <Input as={Box} pt="1.5">
            {shipmentMethod.value}
          </Input>
        </Stack>

        <Stack pt={4} textAlign="center">
          <Text>
            or{" "}
            <Text
              as={Link}
              onClick={changeToChoose}
              fontWeight="500"
              color={"red.400"}
            >
              change address
            </Text>
          </Text>
        </Stack>
      </Box>
    );
  };

  console.log(shipmentAddress);
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      borderRadius="20px"
    >
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
        }}
        status={isOpen.status}
        subject={isOpen.subject}
        message={isOpen.message}
      ></ModalMessage>
      <Stack spacing={4} mx={"auto"} maxW={"xl"} py={12} px={6}>
        <Text
          textTransform={"uppercase"}
          color={"red.400"}
          fontWeight={600}
          fontSize={"lg"}
          bg={useColorModeValue("red.50", "red.900")}
          p={2}
          alignSelf={"flex-start"}
          rounded={"md"}
        >
          Shipping Information
        </Text>
        {showForm == "inputAddress"
          ? inputAddress()
          : showForm == "chooseAddress"
          ? chooseAddress()
          : confirmationAddress()}
      </Stack>
    </Flex>
  );
}
