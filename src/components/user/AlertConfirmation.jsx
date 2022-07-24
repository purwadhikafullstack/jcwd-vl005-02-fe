import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRef } from "react";

export default function AlertConfirmation({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  isNeedConfirmation,
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  // const onOpen = () => {
  //   setIsOpen(true);
  // };

  // const onClose = () => {
  //   setIsOpen(false);
  // };
  return (
    <>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{message}</AlertDialogBody>
          {isNeedConfirmation ? (
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" ml={3} onClick={onConfirm}>
                Yes
              </Button>
            </AlertDialogFooter>
          ) : (
            ""
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
