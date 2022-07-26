import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  // Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressBook } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UserNotifications from "./UserNotifications";
import UserProfile from "./UserProfile";
import UserPurchases from "./UserPurchases";
import UserAddress from "./UserAddress";
import UserCart from "./UserCart";
import ResendEmailVerification from "./UserResendVerification";

const LinkItems = [
  { name: "Profile", icon: CgProfile, url: "" },
  {
    name: "Notifications",
    icon: IoMdNotificationsOutline,
    url: "notifications",
  },
  { name: "Cart", icon: BsCart4, url: "cart" },
  { name: "Purchases", icon: MdPayment, url: "purchases" },
  { name: "Address", icon: FaRegAddressBook, url: "address" },
];

export default function UserDashboard({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { is_verified } = useSelector((state) => state.user);
  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        height="90%"
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
          <SidebarContent onClose={onClose} height="100%" />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Routes>
          <Route path="" element={<UserProfile />} />
          <Route path="/notifications" element={<UserNotifications />} />

          {localStorage.getItem("token") && is_verified === "unferified" ? (
            <Route exact path="/cart" element={<ResendEmailVerification />} />
          ) : (
            <Route path="/cart" element={<UserCart />} />
          )}
          {localStorage.getItem("token") && is_verified === "unferified" ? (
            <Route
              exact
              path="/purchases"
              element={<ResendEmailVerification />}
            />
          ) : (
            <Route path="/purchases" element={<UserPurchases />} />
          )}

          <Route path="/notifications" element={<UserNotifications />} />

          <Route path="/address/*" element={<UserAddress />} />
        </Routes>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, height, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="absolute"
      // top="0"
      h={height}
      {...rest}
      // zIndex="-1"
      overflow="hidden"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Dashboard
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, url, ...rest }) => {
  return (
    <Link to={url}>
      <Box
        href="#"
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
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("gray.100", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Dashboard
      </Text>
    </Flex>
  );
};
