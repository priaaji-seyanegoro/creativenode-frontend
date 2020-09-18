import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Moment from "moment";
import {
  Flex,
  Button,
  Text,
  Image,
  useColorMode,
  Divider,
  Tooltip,
  Collapse,
  Badge,
} from "@chakra-ui/core";

import { PodcastDetailSkelton } from "../components/skelton/podcastDetailSkelton";

import "./podcastDetail-style.css";

export const PodcastDetail = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };

  const { podcastId } = useParams();

  const fetchPodcastById = useStoreActions(
    (actions) => actions.podcast.fetchPodcastById
  );

  useEffect(() => {
    fetchPodcastById(podcastId);
    // eslint-disable-next-line
  }, []);

  const dataPodcast = useStoreState((state) => state.podcast.currentPodcast);
  const isLoading = useStoreState((state) => state.podcast.isLoading);

  if (isLoading) {
    return <PodcastDetailSkelton />;
  } else {
    return (
      <>
        {dataPodcast.length < 0 ? (
          <p>Loading ..</p>
        ) : (
          <Flex justifyContent="center" mt="11%" className="wrap">
            <Flex className="section-1" flexDirection="column">
              <Image
                src={`http://localhost:5000/${dataPodcast.coverImage}`}
                size="300px"
                objectFit="cover"
                rounded="20px"
                fallbackSrc="https://via.placeholder.com/150"
                mb="20px"
              />
              <Flex align="center" justifyContent="center" mb="20px">
                <audio
                  controlsList="nodownload"
                  src={`http://localhost:5000/${dataPodcast.audio}`}
                  controls
                >
                  <p>
                    If your browser doesn't support the 'audio' element, it will
                    display the content here between the opening and closing
                    tags.
                  </p>
                </audio>
              </Flex>
              <Flex align="center" justifyContent="center" mb="20px">
                <Badge fontSize="xl">{`${dataPodcast.likes} Likes`}</Badge>
                <Tooltip hasArrow label="Di Upload" placement="top">
                  <Badge ml="5" fontSize="xl">
                    {Moment(dataPodcast.createdAt).format("DD MMMM YYYY")}
                  </Badge>
                </Tooltip>
              </Flex>
              <Flex align="center" justifyContent="space-around" mb="20px">
                <Button
                  className="menu-items"
                  id="play-button"
                  bg="transparent"
                  border="1px"
                  width="200px"
                  textTransform="uppercase"
                  boxShadow="md"
                  fontWeight="bold"
                  fontSize={["xs", "sm", "md", "lg", "xl"]}
                >
                  Liked Podcast
                </Button>
              </Flex>
            </Flex>
            <Flex flexDirection="column" ml="3%" className="section-2">
              <Text
                fontSize={["xl", "2xl", "3xl", "4xl", "5xl"]}
                fontWeight="700"
              >
                {dataPodcast.createdBy && dataPodcast.createdBy.namePodcast}
              </Text>

              <Text fontSize={["sm", "md", "lg", "xl", "2xl"]}>
                {dataPodcast.title}
              </Text>

              <Divider borderColor={color[colorMode]} />

              <Collapse
                className="collapse"
                textAlign="justify"
                width="700px"
                fontSize={["xs", "sm", "md", "lg", "xl"]}
                startingHeight={100}
                isOpen={show}
              >
                {dataPodcast.description}
              </Collapse>
              <Button
                className="menu-items"
                bg="transparent"
                border="1px"
                textTransform="uppercase"
                boxShadow="md"
                fontWeight="bold"
                onClick={handleToggle}
                mt="1rem"
                mb="1rem"
              >
                Show {show ? "Less" : "More"}
              </Button>
            </Flex>
          </Flex>
        )}
      </>
    );
  }
};
