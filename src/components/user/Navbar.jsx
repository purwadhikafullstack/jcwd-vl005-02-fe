import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AiFillMedicineBox } from "react-icons/ai";
// import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

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

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // global state
  const { email, username, id } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const onButtonNavigate = () => {
    const location = props.pathname === "/login" ? "/" : "/login";
    navigate(location);
  };

  const onButtonLogin = () => {
    navigate("/login");
  };
  const onButtonLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  
  const color = useColorModeValue;

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
            <Flex alignItems={"center"}>
              <Menu>
                <Button
                  onClick={onButtonLogout}
                  size={"md"}
                  leftIcon={<BiLogIn />}
                >
                  Logout
                </Button>
                <Text>Hi,{username}</Text>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>{email}</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
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
        <Box bg={color("gray.100", "gray.900")} px={4}>
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
              <Box>Logo</Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
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
                <Button
                  onClick={onButtonLogin}
                  size={"md"}
                  leftIcon={<BiLogIn />}
                >
                  Login
                </Button>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>{email}</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
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
