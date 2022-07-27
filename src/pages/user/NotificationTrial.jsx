import {
  Input,
  Button,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import NotificationBadge from "../../components/user/NotificationBadge";

const BASE_URL = process.env.REACT_APP_URL_API;

const socket = io.connect(BASE_URL, {
  transports: ["websocket", "polling", "flashsocket"],
});

function NotificationTrial() {
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinChannel = () => {
    if (channel !== "") {
      socket.emit("join_channel", channel);
    }
  };

  // Mengirim
  const sendMessage = () => {
    console.log("tekan");
    socket.emit("send_notification", { message, channel });
  };

  // Menerima
  useEffect(() => {
    socket.on("receive_notification", (data) => {
      console.log("terima");
      setMessageReceived(data.message);
    });
  }, [socket]);

  console.log(messageReceived);

  return (
    <Box p={10} maxW="500px">
      <Input
        onChange={(event) => {
          setChannel(event.target.value);
        }}
      ></Input>
      <Button onClick={joinChannel}>Join Channel</Button>

      <Input
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></Input>

      <Box>
        <Menu>
          <MenuButton>
            {" "}
            <NotificationBadge
              count={messageReceived != "" && 1}
            ></NotificationBadge>
          </MenuButton>
          <MenuList
            zIndex="999999999"
            position="absolute"
            top="-10px"
            right="-40px"
          >
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>{" "}
          </MenuList>
        </Menu>
      </Box>
      <Button onClick={sendMessage}>Send message</Button>
      <Text>{messageReceived}</Text>
    </Box>
  );
}

export default NotificationTrial;
