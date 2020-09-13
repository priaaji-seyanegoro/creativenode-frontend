import React, { useEffect } from "react";

import { Flex, Box } from "@chakra-ui/core";
import { Item } from "../items/Item-component";
import "./dashboardItems-style.css";
import { useStoreActions, useStoreState } from "easy-peasy";

export const DashboardItems = () => {
  const fetchPodcast = useStoreActions(
    (actions) => actions.podcast.fetchPodcast
  );

  const dataPodcasts = useStoreState((state) => state.podcast.podcast);

  useEffect(() => {
    fetchPodcast();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Flex mt="20px" flexWrap="wrap" justifyContent="center">
        {dataPodcasts.map((podcast, i) => {
          return (
            <Box
              className="dashboard-box"
              maxW="sm"
              overflow="hidden"
              mb="10px"
              mr="20px"
              key={podcast._id}
            >
              <Item
                id={podcast._id}
                imageSrc={podcast.coverImage}
                podcastName={podcast.createdBy.namePodcast}
                title={podcast.title}
              />
            </Box>
          );
        })}
      </Flex>
    </>
  );
};
