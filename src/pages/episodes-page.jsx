import React, { useEffect } from "react";
import { Flex, Text, useColorMode, IconButton } from "@chakra-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";

import { DrawerUpload } from "../components/drawer-form-upload/drawer-component";

import { TablePodcast } from "../components/table-episode/table-component";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Skeleton,
} from "@chakra-ui/core";

import Cookie from "js-cookie";
import { useForm } from "react-hook-form";

export const Episodes = () => {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };

  const [id, setId] = React.useState();
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const [isOpened, setIsOpened] = React.useState();
  const onClosed = () => setIsOpened(false);
  const cancelRef = React.useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { register, errors, handleSubmit } = useForm();

  const fetchYourPodcast = useStoreActions(
    (actions) => actions.podcast.fetchYourPodcast
  );

  const removePodcast = useStoreActions(
    (actions) => actions.podcast.removePodcast
  );

  const dataPodcast = useStoreState((state) => state.podcast.podcast);
  const isLoading = useStoreState((state) => state.podcast.isLoading);

  useEffect(() => {
    fetchYourPodcast();
    // eslint-disable-next-line
  }, []);

  const onDelete = async () => {
    const response = await fetch(`http://localhost:5000/api/podcast/${id}`, {
      method: "delete",
      headers: {
        "auth-token": Cookie.get("token"),
      },
    });
    const result = await response.json();

    if (result.status) {
      removePodcast(id);
      onClosed();
    }
  };

  const getPodcastById = async (id) => {
    const response = await fetch(`http://localhost:5000/api/podcast/${id}`, {
      method: "get",
      headers: {
        "auth-token": Cookie.get("token"),
      },
    });
    const result = await response.json();

    setId(result._id);
    setTitle(result.title);
    setDesc(result.description);
    onOpen();
  };

  const onUpdatePodcast = async (data) => {
    const { titleInput, descInput, podcastId } = data;
    const updated = await fetch(
      `http://localhost:5000/api/podcast/${podcastId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": Cookie.get("token"),
        },
        body: JSON.stringify({
          title: titleInput,
          description: descInput,
        }),
      }
    );
    const result = await updated.json();
    if (result.status) {
      fetchYourPodcast();
      onClose();
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "title",
        accessor: "title",
      },
      {
        Header: "Actions",
        columns: [
          {
            Header: "Delete",
            Cell: (props) => {
              return (
                <IconButton
                  className="menu-items"
                  variant="outline"
                  aria-label="Delete-Podcast"
                  icon="delete"
                  onClick={() => {
                    setIsOpened(true);
                    setId(props.row.original._id);
                  }}
                />
              );
            },
          },
          {
            Header: "Edit",
            Cell: (props) => {
              return (
                <IconButton
                  className="menu-items"
                  variant="outline"
                  aria-label="Update-Podcast"
                  icon="edit"
                  onClick={() => {
                    getPodcastById(props.row.original._id);
                  }}
                />
              );
            },
          },
        ],
      },
    ],
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        textTransform="uppercase"
        mt="100px"
        color={color[colorMode]}
      >
        <Flex align="center" justifyContent="space-around" mt="20px" mb="30px">
          <Text fontWeight="bold" fontSize={["xs", "sm", "md", "lg", "xl"]}>
            Your Podcast
          </Text>
          <DrawerUpload />
        </Flex>

        <AlertDialog
          isOpen={isOpened}
          leastDestructiveRef={cancelRef}
          onClose={onClosed}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Podcast
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClosed}>
                Cancel
              </Button>
              <Button variantColor="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <form onSubmit={handleSubmit(onUpdatePodcast)}>
            <ModalContent>
              <ModalHeader>Update your podcast</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    ref={register}
                    name="podcastId"
                    type="hidden"
                    defaultValue={id}
                  />
                </FormControl>

                <FormControl isInvalid={errors.titleInput}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="titleInput"
                    placeholder="Please enter title podcast"
                    ref={register({
                      required: true,
                      minLength: 6,
                    })}
                    autoComplete="off"
                    defaultValue={title}
                  />
                  <FormErrorMessage>
                    {errors.titleInput?.type === "required" &&
                      "Title Podcast required"}
                    {errors.titleInput?.type === "minLength" &&
                      "Title Podcast min 6 character"}
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
                    defaultValue={desc}
                  />
                  <FormErrorMessage>
                    {errors.descInput?.type === "required" &&
                      "Description Podcast required"}
                    {errors.descInput?.type === "minLength" &&
                      "Description Podcast min 6 charachter"}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button variantColor="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>

        {isLoading ? (
          <div>
            <Skeleton height="20px" my="10px" mx="30px" />
            <Skeleton height="20px" my="10px" mx="30px" />
            <Skeleton height="20px" my="10px" mx="30px" />
            <Skeleton height="20px" my="10px" mx="30px" />
            <Skeleton height="20px" my="10px" mx="30px" />
            <Skeleton height="20px" my="10px" mx="30px" />
            <Skeleton height="20px" my="10px" mx="30px" />
            <Skeleton height="20px" my="10px" mx="30px" />
            <Skeleton height="20px" my="10px" mx="30px" />
          </div>
        ) : (
          <TablePodcast
            columns={columns}
            data={dataPodcast}
            noDataText={"Loading..."}
            loading={isLoading}
          />
        )}
      </Flex>
    </>
  );
};
