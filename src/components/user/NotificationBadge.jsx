import { Box, IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { FaBell } from "react-icons/fa";

export default function NotificationBadge({ count }) {
  return (
    <IconButton
      as={Box}
      css={css`
        position: relative !important;
      `}
      py={"2"}
      colorScheme={"red"}
      aria-label={"Notifications"}
      size={"lg"}
      icon={
        <>
          <FaBell color={"gray.750"} />
          <Box
            as={"span"}
            color={"red"}
            position={"absolute"}
            top={"2px"}
            right={"4px"}
            fontSize={"0.8rem"}
            bgColor={"white"}
            borderRadius={"lg"}
            zIndex={9999}
            p={"0 5px"}
          >
            {count}
          </Box>
        </>
      }
    />
  );
}
