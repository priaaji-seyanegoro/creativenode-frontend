import React, { useState } from "react";

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
  FormLabel,
  Input,
  useColorMode,
  Textarea,
  DrawerCloseButton,
  FormErrorMessage,
  FormControl,
  useToast,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useStoreActions } from "easy-peasy";

export function DrawerUpload() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const btnRef = React.useRef();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const borderColor = { light: "black", dark: "white" };

  const [submit, setSubmit] = useState(false);
  const { register, errors, handleSubmit } = useForm();

  const addData = useStoreActions((actions) => actions.podcast.addPodcast);

  const validCover = (data) => {
    if (
      data.cover[0].type !== "image/jpeg" &&
      data.cover[0].type !== "image/png"
    ) {
      toast({
        title: "Warning file type",
        description: "Cover Podcast only support jpeg or png",
        status: "warning",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      return false;
    } else if (data.cover[0].size > 1000000) {
      toast({
        title: "Warning file size",
        description:
          "Cover Podcast is too large 'MAX 1MB', please pick a smaller file",
        status: "warning",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const validAudio = (data) => {
    if (data.audio[0].type !== "audio/mpeg") {
      toast({
        title: "Warning file type",
        description: "Audio Podcast only support MP3",
        status: "warning",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      return false;
    } else if (data.audio[0].size > 60000000) {
      toast({
        title: "Warning file size",
        description:
          "Audio Podcast is too large 'MAX 50MB', please pick a smaller file",
        status: "warning",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  //UPLOAD ACTIONS
  const onUpload = async (data, e) => {
    setSubmit(true);

    if (!validCover(data) || !validAudio(data)) {
      setSubmit(false);
    } else {
      //APPEND ALL INPUT DATA  TO FORMDATA
      const formData = new FormData();
      formData.append("title", data.titleInput);
      formData.append("audio", data.audio[0]);
      formData.append("coverImage", data.cover[0]);
      formData.append("description", data.descInput);

      const response = await fetch(
        "https://cryptic-thicket-69508.herokuapp.com/api/podcast/",
        {
          method: "post",
          headers: {
            "auth-token": Cookie.get("token"),
          },
          body: formData,
        }
      );
      const result = await response.json();

      if (result.status) {
        setSubmit(false);
        addData(result.podcast);
        toast({
          title: "Uploading successfuly",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        e.target.reset();
        onClose();
      } else {
        setSubmit(false);
        toast({
          title: "Uploading Fail",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

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

          <form onSubmit={handleSubmit(onUpload)}>
            <DrawerBody>
              <Stack spacing="24px">
                <FormControl isInvalid={errors.titleInput}>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    name="titleInput"
                    placeholder="Please enter title podcast"
                    ref={register({
                      required: true,
                      minLength: 6,
                    })}
                    autoComplete="off"
                    borderColor={borderColor[colorMode]}
                  />
                  <FormErrorMessage>
                    {errors.titleInput?.type === "required" &&
                      "Title Podcast required"}
                    {errors.titleInput?.type === "minLength" &&
                      "Title Podcast min 6 character"}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.cover}>
                  <FormLabel htmlFor="cover">Cover Podcast</FormLabel>
                  <Input
                    type="file"
                    ref={register({
                      required: true,
                    })}
                    name="cover"
                    pt="4px"
                    borderColor={borderColor[colorMode]}
                  />
                  <FormErrorMessage>
                    {errors.cover?.type === "required" &&
                      "Cover Podcast required"}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.audio}>
                  <FormLabel htmlFor="podcastFile">File Podcast</FormLabel>
                  <Input
                    type="file"
                    name="audio"
                    ref={register({
                      required: true,
                    })}
                    pt="4px"
                    borderColor={borderColor[colorMode]}
                  />
                  <FormErrorMessage>
                    {errors.audio?.type === "required" &&
                      "Audio Podcast required"}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.descInput}>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea
                    name="descInput"
                    ref={register({
                      required: true,
                      minLength: 6,
                    })}
                    autoComplete="off"
                    borderColor={borderColor[colorMode]}
                  />
                  <FormErrorMessage>
                    {errors.descInput?.type === "required" &&
                      "Description Podcast required"}
                    {errors.descInput?.type === "minLength" &&
                      "Description Podcast min 6 charachter"}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              {!submit ? (
                <Button variantColor="blue" type="submit">
                  Submit
                </Button>
              ) : (
                <Button
                  variantColor="blue"
                  isLoading
                  loadingText="Uploading"
                  type="submit"
                >
                  Submit
                </Button>
              )}
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
