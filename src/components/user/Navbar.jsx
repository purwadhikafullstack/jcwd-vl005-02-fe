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
  const onButtonRegister = () => {
    navigate("/register");
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
            <Flex alignItems={"center"} justify={"flex-end"}>
              <Menu>
              <Stack
                // flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                alignItems={'center'}
                // spacing={6}
              >
                <Text fontWeight="600" fontSize='lg' color={'white'}>Hi,{username}</Text>
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
              
              </Stack>
                
                <MenuList>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>My Purchase</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={onButtonLogout}>Logout</MenuItem>
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
                alignItems={'center'}
                spacing={3}
              >
                <Button
                  onClick={onButtonLogin}
                  // as={"a"}
                  fontSize={'md'}
                  fontWeight={600}
                  variant={"link"}
                  color={'white'}
                  cursor='pointer'
                  _hover={{
                  
                    color:'gray.300',
                  }}
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
                  color={'black'}
                  bg={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,red.400)",
                    boxShadow: "xl",
                    color:'white'
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
