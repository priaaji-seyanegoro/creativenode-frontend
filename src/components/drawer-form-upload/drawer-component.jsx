import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  useColorMode,
  Textarea,
  DrawerCloseButton,
} from "@chakra-ui/core";

export function DrawerUpload() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const btnRef = React.useRef();
  const { colorMode } = useColorMode();
  const borderColor = { light: "black", dark: "white" };

  return (
    <>
      <Button
        className="menu-items"
        ref={btnRef}
        leftIcon="add"
        bg="transparent"
        border="1px"
        textTransform="uppercase"
        boxShadow="md"
        fontWeight="bold"
        fontSize={["xs", "sm", "md", "lg", "xl"]}
        onClick={onOpen}
      >
        Upload New Podcast
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        initialFocusRef={firstField}
        finalFocusRef={btnRef}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new podcast
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  ref={firstField}
                  id="title"
                  placeholder="Please enter title podcast"
                  borderColor={borderColor[colorMode]}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="file-podcast">Cover Podcast</FormLabel>
                <Input
                  type="file"
                  id="cover"
                  pt="4px"
                  borderColor={borderColor[colorMode]}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="file-podcast">File Podcast</FormLabel>
                <Input
                  type="file"
                  id="file-podcast"
                  pt="4px"
                  borderColor={borderColor[colorMode]}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea id="desc" borderColor={borderColor[colorMode]} />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="blue">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
