import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Moment from "moment";
import Cookie from "js-cookie";
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
  ButtonGroup,
} from "@chakra-ui/core";

import { PodcastDetailSkelton } from "../components/skelton/podcastDetailSkelton";

import "./podcastDetail-style.css";

export const PodcastDetail = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const [submit, setSubmit] = React.useState(false);
  const [submitFollow, setSubmitFollow] = React.useState(false);

  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };

  const { podcastId } = useParams();

  const fetchPodcastById = useStoreActions(
    (actions) => actions.podcast.fetchPodcastById
  );

  const setFollow = useStoreActions(
    (actions) => actions.podcast.setFollowPodcast
  );

  const setUnFollow = useStoreActions(
    (actions) => actions.podcast.setUnFollowPodcast
  );

  const setLike = useStoreActions((actions) => actions.podcast.setLikePodcast);
  const setUnLike = useStoreActions(
    (actions) => actions.podcast.setUnLikePodcast
  );

  useEffect(() => {
    fetchPodcastById(podcastId);
    // eslint-disable-next-line
  }, []);

  const dataPodcast = useStoreState((state) => state.podcast.currentPodcast);
  const isLoading = useStoreState((state) => state.podcast.isLoading);

  const onLike = async (id) => {
    setSubmit(true);
    try {
      const response = await fetch(
        "https://cryptic-thicket-69508.herokuapp.com/api/likes",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "auth-token": Cookie.get("token"),
          },
          body: JSON.stringify({
            kontenId: id,
          }),
        }
      );
      if (response.status) {
        setLike();
        setSubmit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFollow = async (id) => {
    setSubmitFollow(true);
    try {
      const response = await fetch(
        "https://cryptic-thicket-69508.herokuapp.com/api/follow",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "auth-token": Cookie.get("token"),
          },
          body: JSON.stringify({
            followedId: id,
          }),
        }
      );
      if (response.status) {
        setFollow();
        setSubmitFollow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onUnFollow = async (id) => {
    setSubmitFollow(true);
    try {
      const response = await fetch(
        `https://cryptic-thicket-69508.herokuapp.com/api/follow/${id}`,
        {
          method: "put",
          headers: {
            "auth-token": Cookie.get("token"),
          },
        }
      );
      if (response.status) {
        setUnFollow();
        setSubmitFollow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onUnlike = async (id) => {
    setSubmit(true);
    try {
      const response = await fetch(
        `https://cryptic-thicket-69508.herokuapp.com/api/likes/${id}`,
        {
          method: "put",
          headers: {
            "auth-token": Cookie.get("token"),
          },
        }
      );

      if (response.status) {
        setUnLike();
        setSubmit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const shareLink = () => {
    if(navigator.share){
      navigator.share({
        title : 'tes',
        text: 'test text',
        url : 'tester url'
      }).then(() => {
        console.log('share success');
      }).catch((e) => {
        console.log('error sharing', e);
      })
    }else{
      console.log("your browsser doesnt support");
    }
  }

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
                src={dataPodcast.coverImage}
                size="300px"
                objectFit="cover"
                rounded="20px"
                fallbackSrc="https://via.placeholder.com/150"
                mb="20px"
              />
              <Flex align="center" justifyContent="space-around" mb="20px">
                <ButtonGroup spacing={4}>
                  {dataPodcast.hasFollow ? (
                    !submitFollow ? (
                      <Button
                        leftIcon="check"
                        className="menu-items"
                        bg="transparent"
                        border="1px"
                        textTransform="uppercase"
                        boxShadow="md"
                        fontWeight="bold"
                        onClick={() => {
                          onUnFollow(dataPodcast.createdBy._id);
                        }}
                      >
                        Followed
                      </Button>
                    ) : (
                      <Button
                        isLoading
                        leftIcon="check"
                        className="menu-items"
                        bg="transparent"
                        border="1px"
                        textTransform="uppercase"
                        boxShadow="md"
                        fontWeight="bold"
                        onClick={() => {
                          onUnFollow(dataPodcast.createdBy._id);
                        }}
                      >
                        Followed
                      </Button>
                    )
                  ) : !submitFollow ? (
                    <Button
                      leftIcon="add"
                      className="menu-items"
                      bg="transparent"
                      border="1px"
                      textTransform="uppercase"
                      boxShadow="md"
                      fontWeight="bold"
                      onClick={() => {
                        onFollow(dataPodcast.createdBy._id);
                      }}
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button
                      isLoading
                      leftIcon="add"
                      className="menu-items"
                      bg="transparent"
                      border="1px"
                      textTransform="uppercase"
                      boxShadow="md"
                      fontWeight="bold"
                      onClick={() => {
                        onFollow(dataPodcast.createdBy._id);
                      }}
                    >
                      Follow
                    </Button>
                  )}

                  <Button
                      
                      leftIcon="external-link"
                      className="menu-items"
                      bg="transparent"
                      border="1px"
                      textTransform="uppercase"
                      boxShadow="md"
                      fontWeight="bold"
                      onClick={shareLink}
                    >
                      Share
                    </Button>

                  {dataPodcast.hasLike ? (
                    !submit ? (
                      <Button
                        onClick={() => {
                          onUnlike(dataPodcast._id);
                        }}
                        leftIcon="close"
                        variantColor="red"
                        variant="solid"
                      >
                        Unlike
                      </Button>
                    ) : (
                      <Button
                        isLoading
                        leftIcon="close"
                        variantColor="red"
                        variant="solid"
                      >
                        Unlike
                      </Button>
                    )
                  ) : !submit ? (
                    <Button
                      onClick={() => {
                        onLike(dataPodcast._id);
                      }}
                      leftIcon="star"
                      variantColor="blue"
                      variant="solid"
                    >
                      Like
                    </Button>
                  ) : (
                    <Button
                      isLoading
                      leftIcon="star"
                      variantColor="blue"
                      variant="solid"
                    >
                      Like
                    </Button>
                  )}
                </ButtonGroup>
              </Flex>
              <Flex align="center" justifyContent="center" mb="20px">
                <audio
                  controlsList="nodownload"
                  src={dataPodcast.audio}
                  controls
                  color={color[colorMode]}
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
