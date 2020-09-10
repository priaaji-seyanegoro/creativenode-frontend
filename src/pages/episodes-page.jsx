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
} from "@chakra-ui/core";

import Cookie from "js-cookie";

export const Episodes = () => {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };

  const [isOpen, setIsOpen] = React.useState();
  const [id, setId] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const fetchPodcast = useStoreActions(
    (actions) => actions.podcast.fetchPodcast
  );

  const removePodcast = useStoreActions(
    (actions) => actions.podcast.removePodcast
  );

  const dataPodcast = useStoreState((state) => state.podcast.podcast);

  useEffect(() => {
    fetchPodcast();
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
                    setIsOpen(true);
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
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
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
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variantColor="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <TablePodcast columns={columns} data={dataPodcast} />
      </Flex>
    </>
  );
};
