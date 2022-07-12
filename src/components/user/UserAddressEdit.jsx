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

export default function UserAddressEdit() {
  /* Here's a custom control */
  function EditableControls() {
    const [isEditing, setIsEditing] = useState(false);

    const editHandler = () => {
      setIsEditing(true);
    };

    const submitHandler = () => {
      console.log("OK");
    };

    const cancelHandler = () => {
      console.log("OK");
    };

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} onClick={submitHandler} />
        <IconButton icon={<CloseIcon />} onClick={cancelHandler} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} onClick={editHandler} />
      </Flex>
    );
  }

  return (
    <>
      <Editable
        textAlign="center"
        defaultValue="Rasengan ⚡️"
        fontSize="2xl"
        isPreviewFocusable={false}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>

      <Editable defaultValue="Take some chakra">
        <EditablePreview />
        <Input as={EditableInput} />
      </Editable>
    </>
  );
}
