import React from "react";
import { Flex, Button, Text, Image, Collapse, Skeleton } from "@chakra-ui/core";

export const PodcastDetailSkelton = () => (
  <Flex justifyContent="center" mt="11%" className="wrap">
    <Flex className="section-1" flexDirection="column">
      <Skeleton rounded="20px" my="10px">
        <Image
          size="300px"
          objectFit="cover"
          rounded="20px"
          fallbackSrc="https://via.placeholder.com/150"
          mb="20px"
        />
      </Skeleton>

      <Flex align="center" justifyContent="center" mb="20px">
        <Skeleton rounded="20px" my="10px">
          <audio controlsList="nodownload" controls>
            <p></p>
          </audio>
        </Skeleton>
      </Flex>

      <Flex align="center" justifyContent="space-around" mb="20px">
        <Skeleton rounded="20px" my="10px">
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
        </Skeleton>
      </Flex>
    </Flex>
    <Flex flexDirection="column" ml="3%" className="section-2">
      <Skeleton rounded="20px" my="10px">
        <Text
          fontSize={["xl", "2xl", "3xl", "4xl", "5xl"]}
          fontWeight="700"
        ></Text>
      </Skeleton>

      <Skeleton rounded="20px" my="10px">
        <Collapse
          className="collapse"
          textAlign="justify"
          width="700px"
          fontSize={["xs", "sm", "md", "lg", "xl"]}
          startingHeight={100}
        ></Collapse>
      </Skeleton>
      <Skeleton rounded="20px" my="10px">
        <Button
          className="menu-items"
          bg="transparent"
          border="1px"
          textTransform="uppercase"
          boxShadow="md"
          fontWeight="bold"
          mt="1rem"
          mb="1rem"
        ></Button>
      </Skeleton>
      <Skeleton rounded="20px" my="10px">
        <Button
          className="menu-items"
          bg="transparent"
          border="1px"
          textTransform="uppercase"
          boxShadow="md"
          fontWeight="bold"
          mt="1rem"
          mb="1rem"
        ></Button>
      </Skeleton>
      <Skeleton rounded="20px" my="10px">
        <Button
          className="menu-items"
          bg="transparent"
          border="1px"
          textTransform="uppercase"
          boxShadow="md"
          fontWeight="bold"
          mt="1rem"
          mb="1rem"
        ></Button>
      </Skeleton>
    </Flex>
  </Flex>
);
