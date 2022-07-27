import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AiFillMedicineBox } from "react-icons/ai";
import { Link as RRLink } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import NotificationBadge from "./NotificationBadge";
import { io } from "socket.io-client";
import api from "../../services/api";
import { useToastHook } from "./ToastNotification";

const BASE_URL = process.env.REACT_APP_URL_API;

const socket = io.connect(BASE_URL, {
  transports: ["websocket", "polling", "flashsocket"],
});

const Links = [
  { menu: "Home", url: "/" },
  { menu: "Shop", url: "/shop" },
];
const NavLink = ({ menu, url }) => (
  <Link
    px={3}
    py={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("red.800", "red.900"),
    }}
    href={url}
  >
    {menu}
  </Link>
);

export default function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notification, setNotification] = useState([]);
  const [totalNotification, setTotalNotification] = useState(0);

  const [state, newToast] = useToastHook();
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // global state
  const { email, username, id } = useSelector((state) => state.user);
  const { totalNotificationBadge } = useSelector(
    (state) => state.notificationReducer
  );
  // useSelector((state) => console.log(state));

  const dispatch = useDispatch();
  const onButtonNavigate = () => {
    const location = props.pathname === "/login" ? "/" : "/login";
    navigate(location);
  };

  const onButtonLogin = () => {
    navigate("/login");
  };
  const onButtonRegister = () => {
    navigate("/register");
  };

  const onButtonLogout = () => {
    setConfirm(true);
  };
  const onBtnCancelConfirm = () => {
    setConfirm(false);
  };
  // console.log(confirm);
  const onConfirmButtonLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isChecked");
    Cookies.remove("loginstatus");
    dispatch({ type: "LOGOUT" });
    setConfirm(false);
    navigate("/login");
  };

  useEffect(() => {
    let url = `/user/history/unopened-notifications`;
    api
      .get(url)
      .then((res) => {
        setNotification(() => res.data.content);

        dispatch({
          type: "UPDATE_BADGE",
          payload: { totalNotificationBadge: res.data.details },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Menerima
  useEffect(() => {
    socket.emit("join_channel", String(id));

    socket.on("receive_notification", (data) => {
      console.log("terima");
      let url = `/user/history/unopened-notifications`;
      newToast({
        title: "Purchase notification",
        message: data.message,
        status: "info",
      });
      api
        .get(url)
        .then((res) => {
          console.log(res);
          setNotification(() => res.data.content);
          dispatch({
            type: "UPDATE_BADGE",
            payload: { totalNotificationBadge: res.data.details },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [socket, id]);

  return (
    <>
      {token ? (
        <Box bg="red.500" px={4}>
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding="20px 20px"
          >
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                fontSize="1.2rem"
                color="white"
              >
                <AiFillMedicineBox />
                <Box ml={2} fontWeight="600">
                  {" "}
                  Pharmastore
                </Box>
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
                color="white"
                fontWeight="600"
              >
                {Links.map((link, index) => (
                  <NavLink
                    key={index}
                    url={link.url}
                    menu={link.menu}
                  ></NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"} justify={"flex-end"}>
              <Menu>
                <Stack
                  // flex={{ base: 1, md: 0 }}
                  justify={"flex-end"}
                  direction={"row"}
                  alignItems={"center"}
                  // spacing={6}
                >
                  <Text fontWeight="600" fontSize="lg" color={"white"}>
                    Hi, {username}
                  </Text>

                  <Menu>
                    <MenuButton>
                      {" "}
                      <NotificationBadge
                        count={
                          totalNotificationBadge != 0 && totalNotificationBadge
                        }
                      ></NotificationBadge>
                    </MenuButton>
                    {notification.length ? (
                      <MenuList
                        zIndex="999999999"
                        position="absolute"
                        top="-10px"
                        right="-40px"
                      >
                        {notification.map((item) => (
                          <MenuItem
                            key={item.id}
                            // onClick={() => setNotification("")}
                          >
                            {item.message}
                          </MenuItem>
                        ))}

                        <MenuDivider />
                        <RRLink
                          to="/dashboard/notifications"
                          onClick={() => setNotification("")}
                        >
                          <MenuItem as={Link} textAlign="center" margin="auto">
                            See all notifications
                          </MenuItem>
                        </RRLink>
                      </MenuList>
                    ) : (
                      <MenuList
                        zIndex="999999999"
                        position="absolute"
                        top="-10px"
                        right="-40px"
                      >
                        <MenuItem>No new notification</MenuItem>
                        <MenuDivider />
                        <RRLink
                          to="/dashboard/notifications"
                          onClick={() => setNotification("")}
                        >
                          <MenuItem as={Link} textAlign="center" margin="auto">
                            See all notifications
                          </MenuItem>
                        </RRLink>
                      </MenuList>
                    )}
                  </Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} name={username} />
                  </MenuButton>
                </Stack>

                <MenuList zIndex="999999999">
                  <RRLink to="/dashboard">
                    <MenuItem>My Dashboard</MenuItem>
                  </RRLink>

                  <RRLink to="/dashboard/cart">
                    <MenuItem>My Cart</MenuItem>
                  </RRLink>
                  <RRLink to="/dashboard/purchases">
                    <MenuItem>My Purchase</MenuItem>
                  </RRLink>

                  {/* <MenuItem>My Purchase</MenuItem> */}
                  <MenuDivider />
                  <MenuItem onClick={onButtonLogout}>Logout</MenuItem>

                  <AlertDialog isOpen={confirm}>
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Confirm Logout
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure you want to Logout?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button onClick={onBtnCancelConfirm}>Cancel</Button>
                          <Button
                            onClick={onConfirmButtonLogout}
                            w={"100px"}
                            bg={"red.500"}
                            color={"white"}
                            _hover={{ bg: "red.600" }}
                            ml={3}
                          >
                            Yes
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }} color="white">
              <Stack as={"nav"} spacing={4}>
                {Links.map((link, index) => (
                  <NavLink key={index} url={link.url} menu={link.menu} />
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      ) : (
        <Box bg="red.500" px={4}>
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding="20px 20px"
          >
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                fontSize="1.2rem"
                color="white"
              >
                <AiFillMedicineBox />
                <Box ml={2} fontWeight="600">
                  {" "}
                  Pharmastore
                </Box>
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
                color="white"
                fontWeight="600"
              >
                {Links.map((link, index) => (
                  <NavLink
                    key={index}
                    url={link.url}
                    menu={link.menu}
                  ></NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <Menu>
                {/* <Button onClick={onButtonLogin} size={'md'} leftIcon={<BiLogIn/>}>Login</Button> */}
                <Stack
                  // flex={{ base: 1, md: 0 }}
                  justify={"flex-end"}
                  direction={"row"}
                  alignItems={"center"}
                  spacing={3}
                >
                  <Button
                    onClick={onButtonLogin}
                    as={"a"}
                    fontSize={"md"}
                    fontWeight={600}
                    variant={"link"}
                    color={"white"}
                    cursor="pointer"
                    paddingRight={4}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={onButtonRegister}
                    // display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    // bgGradient="linear(to-r, white,white)"
                    colorScheme={"red"}
                    color={"black"}
                    bg={"white"}
                    _hover={{
                      bgGradient: "linear(to-r, red.400,red.400)",
                      boxShadow: "xl",
                      color: "white",
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }} color="white">
              <Stack as={"nav"} spacing={4}>
                {Links.map((link, index) => (
                  <NavLink key={index} url={link.url} menu={link.menu} />
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
}
