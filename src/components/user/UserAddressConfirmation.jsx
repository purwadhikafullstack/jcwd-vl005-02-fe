import {
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableInput,
  Input,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function UserAddressConfirmation() {
  return (
    <>
      <Editable defaultValue="Take some chakra">
        <EditablePreview />
        <Input as={EditableInput} />
      </Editable>
    </>
  );
}
