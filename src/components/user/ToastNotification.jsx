// import { Button, useToast, Wrap, WrapItem } from "@chakra-ui/react";
// import React from "react";
// import { useState } from "react";

// function ToastNotification() {
//   const toast = useToast();
//   const [open, setOpen] = useState(false);

//   return (
//     <Wrap>
//       <WrapItem>
//         <Button
//           onClick={() =>
//             toast({
//               title: `bottom-right toast`,
//               position: "bottom-right",
//               isClosable: true,
//             })
//           }
//         >
//           Show toast
//         </Button>
//       </WrapItem>
//     </Wrap>
//   );
// }

// export default ToastNotification;

import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function useToastHook() {
  const [state, setState] = useState(undefined);
  const toast = useToast();

  useEffect(() => {
    if (state) {
      const { title, message, status } = state;

      toast({
        title: title,
        description: message,
        status: status,
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  }, [state, toast]);

  return [state, setState];
}
