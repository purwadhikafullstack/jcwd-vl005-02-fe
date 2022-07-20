import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button as Tombol,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { AiFillMedicineBox } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Button } from "antd";

const LinkItems = [
  { name: "Dashboard", icon: MdDashboard, url: "/admin" },
  { name: "Products", icon: GiMedicines, url: "/admin/products" },
  { name: "Categories", icon: AiFillMedicineBox, url: "/admin/categories" },
  { name: "Users", icon: FaUserAlt, url: "/admin/users" },
  { name: "Transactions", icon: FaDollarSign, url: "/admin/transactions" },
  { name: "Reports", icon: TbReportAnalytics, url: "/admin/reports" },
  {
    name: "Add New Admin",
    icon: AiOutlineUserAdd,
    url: "/admin/add-new-admin",
  },
  { name: "Favourites", icon: FiStar, url: "/admin" },
  { name: "Settings", icon: FiSettings, url: "/admin" },
];

const color = useColorModeValue;

export default function NavbarDrawer({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const adminToken = localStorage.getItem("adminToken");
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      {adminToken ? (
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      ) : (
        <Box ml={{ base: 0, md: 0 }} p="4">
          {children}
        </Box>
      )}
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const adminToken = localStorage.getItem("adminToken");
  return (
    <>
      {adminToken ? (
        <Box
          transition="3s ease"
          bg={color("white", "gray.900")}
          borderRight="1px"
          borderRightColor={color("gray.200", "gray.700")}
          w={{ base: "full", md: 60 }}
          pos="fixed"
          h="full"
          {...rest}
        >
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <Text
              fontSize="xl"
              fontFamily="monospace"
              fontWeight="bold"
              display="flex"
              flexDir="row"
              alignItems="center"
            >
              <AiFillMedicineBox
                style={{
                  marginRight: "10px",
                }}
              />
              Pharmastore
            </Text>
            <CloseButton
              display={{ base: "flex", md: "none" }}
              onClick={onClose}
            />
          </Flex>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} url={link.url}>
              {link.name}
            </NavItem>
          ))}
        </Box>
      ) : null}
    </>
  );
};

const NavItem = ({ icon, children, url, ...rest }) => {
  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const adminToken = localStorage.getItem("adminToken");
  const [test, setTest] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // global state
  const { email, username, id } = useSelector((state) => state.adminReducer);

  const onButtonLogout = () => {
    localStorage.removeItem("adminToken");
    setTest("Hi");
    // console.log(test);

    dispatch({ type: "ADMINLOGOUT" });
    navigate("/admin/login");
  };

  const onButtonLogin = () => {
    navigate("/admin/login");
  };
  return (
    <>
      {adminToken ? (
        <Flex
          ml={{ base: 0, md: 60 }}
          px={{ base: 4, md: 4 }}
          height="20"
          alignItems="center"
          bg={color("white", "gray.900")}
          borderBottomWidth="1px"
          borderBottomColor={color("gray.200", "gray.700")}
          justifyContent={{ base: "space-between", md: "flex-end" }}
          {...rest}
        >
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />

          <Text
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            flexDir="row"
            alignItems="center"
          >
            <AiFillMedicineBox
              style={{
                marginRight: "10px",
              }}
            />
            Pharmastore
          </Text>

          <HStack spacing={{ base: "0", md: "6" }}>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
            <Flex alignItems={"center"}>
              <Menu>
                {/* <Button> Login</Button>
            <Button> register</Button> */}
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar size={"sm"} name={email} />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{email}</Text>
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={color("white", "gray.900")}
                  borderColor={color("gray.200", "gray.700")}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={onButtonLogout}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>
      ) : (
        <Flex
          ml={{ base: 0, md: 0 }}
          px={{ base: 4, md: 4 }}
          height="20"
          alignItems="center"
          bg={color("white", "gray.900")}
          borderBottomWidth="1px"
          borderBottomColor={color("gray.200", "gray.700")}
          justifyContent={{ base: "space-between", md: "space-between" }}
          {...rest}
        >
          <Text
            fontSize="xl"
            fontFamily="monospace"
            fontWeight="bold"
            display="flex"
            flexDir="row"
            alignItems="center"
          >
            <AiFillMedicineBox
              style={{
                marginRight: "10px",
              }}
            />
            Pharmastore
          </Text>

          <HStack spacing={{ base: "0", md: "6" }}>
            <Menu>
              {/* <Button> Login</Button> */}
              <Tombol
                onClick={onButtonLogin}
                // display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                // bgGradient="linear(to-r, white,white)"
                colorScheme={"blue"}
                color={"white"}
                bg={"blue.400"}
                _hover={{
                  bgGradient: "linear(to-r, blue.400,blue.400)",
                  boxShadow: "xl",
                  color: "white",
                }}
              >
                Sign In
              </Tombol>
            </Menu>
          </HStack>
        </Flex>
      )}
    </>
  );
};
