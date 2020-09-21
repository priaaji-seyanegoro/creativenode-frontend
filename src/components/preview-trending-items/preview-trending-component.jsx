import React, { useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/core";
import { Item } from "../items/Item-component";
import { useStoreActions, useStoreState } from "easy-peasy";
import { DashboardSkelton } from "../skelton/dashboardSkelton";

export const PreviewTrendingItems = () => {
  const fetchTrendingPodcast = useStoreActions(
    (actions) => actions.podcast.fetchTrendingPodcast
  );

  const dataPodcasts = useStoreState((state) => state.podcast.podcast);
  const isLoading = useStoreState((state) => state.podcast.isLoading);

  useEffect(() => {
    fetchTrendingPodcast();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <DashboardSkelton />;
  } else {
    if (dataPodcasts.length <= 0) {
      return (
        <Flex mt="20px" flexWrap="wrap" justifyContent="center">
          <Box textAlign="center" mb="20px" className="trending-items">
            <Box className="footer" w="200px">
              <Text
                fontSize="sm"
                mt="10px"
                fontWeight="700"
                className="title-podcast"
              >
                SORRY NO MATCH DATA ...
              </Text>
            </Box>
          </Box>
        </Flex>
      );
    } else {
      return (
        <>
          <Flex mt="20px" flexWrap="wrap" justifyContent="center">
            {dataPodcasts.map((podcast, i) => {
              return (
                <Box
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
    }
  }
};
