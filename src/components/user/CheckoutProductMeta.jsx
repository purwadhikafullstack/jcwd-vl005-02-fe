import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

export const CheckoutProductMeta = (props) => {
  const { image, name, description, amount, price, unit } = props;
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box display="flex" alignItems="center">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
          <Text color={mode("gray.600", "gray.400")} fontSize="sm">
            {description}
          </Text>
          <Text fontWeight="medium">
            {amount} {unit} x Rp {price}/{unit}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
