import React, { useEffect } from "react";
import { Flex, Text, useColorMode, IconButton } from "@chakra-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";

import { DrawerUpload } from "../components/drawer-form-upload/drawer-component";

import { TablePodcast } from "../components/table-episode/table-component";

export const Episodes = () => {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };

  const fetchPodcast = useStoreActions(
    (actions) => actions.podcast.fetchPodcast
  );

  const dataPodcast = useStoreState((state) => state.podcast.podcast);

  useEffect(() => {
    fetchPodcast();
    // eslint-disable-next-line
  }, []);

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
                  aria-label="Delete-Podcast"
                  icon="edit"
                />
              );
            },
          },
        ],
      },
    ],
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

        <TablePodcast columns={columns} data={dataPodcast} />
      </Flex>
    </>
  );
};
