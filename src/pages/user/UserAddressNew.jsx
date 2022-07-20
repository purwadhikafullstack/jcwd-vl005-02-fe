import {
  Flex,
  Stack,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  useColorModeValue,
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
import { useEffect, useState } from "react";
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

export default function UserAddressNew({ onShippingInfo }) {
  const [label, setLabel] = useState({ value: "", clicked: false });
  const [phone, setPhone] = useState({ value: "", clicked: false });
  const [address, setAddress] = useState({ value: "", clicked: false });
  const [zip, setZip] = useState({ value: "", clicked: false });
  const [city, setCity] = useState({ value: "", clicked: false });
  const [province, setProvince] = useState({ value: "", clicked: false });

  const [isOpen, setIsOpen] = useState({
    open: false,
    status: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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

  const isLabelError = label.value === "" && label.clicked == true;
  const isPhoneError = phone.value === "" && phone.clicked == true;
  const isAddressError = address.value === "" && address.clicked == true;
  const isZipError = zip.value === "" && zip.clicked == true;
  const isCityError = city.value === "" && city.clicked == true;
  const isProvinceError = province.value === "" && province.clicked == true;

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
        setIsOpen({
          ...isOpen,
          open: true,
          status: "success",
          subject: res.data.subject,
          message: res.data.message,
        });
        setLoading(false);
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
      </Box>
    );
  };

  return (
    <Flex align={"center"} justify={"center"} borderRadius="20px">
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
          Add New Address
        </Text>
        {inputAddress()}
      </Stack>
    </Flex>
  );
}
