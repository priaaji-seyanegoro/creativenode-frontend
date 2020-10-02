import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Button, Text, Image } from "@chakra-ui/core";
import { Item } from "../items/Item-component";
import "./dashboardItems-style.css";
import { useStoreActions, useStoreState } from "easy-peasy";

import { DashboardSkelton } from "../skelton/dashboardSkelton";

export const DashboardItems = () => {
  const fetchPodcast = useStoreActions(
    (actions) => actions.podcast.fetchPodcast
  );

  const dataPodcasts = useStoreState((state) => state.podcast.podcast);
  const isLoading = useStoreState((state) => state.podcast.isLoading);

  useEffect(() => {
    fetchPodcast();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <DashboardSkelton />;
  } else {
    if (dataPodcasts.length <= 0) {
      return (
        <Flex
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          fontWeight="700"
          textTransform="uppercase"
        >
          <Image
            src="https://res.cloudinary.com/creative-node/image/upload/v1601639379/static_image_cn/find_podcast_s1gaqg.png"
            alt="Find Podcast"
          />
          <Text mb="20px" fontSize={["lg", "lg", "xl", "2xl", "3xl"]}>
            Ooops No Data Let's Find and Follow Your Favorite Caster On
            Discovery
          </Text>
          <Link to="discovery">
            <Button
              className="menu-items"
              bg="transparent"
              border="1px"
              mt={{ base: 4, md: 0 }}
              mr={6}
              display="block"
              textTransform="uppercase"
              boxShadow="md"
              fontWeight="bold"
              fontSize={["xs", "sm", "md", "lg", "xl"]}
            >
              Go To Discovery
            </Button>
          </Link>
        </Flex>
      );
    } else {
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
    }
  }
};
