import React from "react";
import { SectionItems } from "../sectionItems/sectionItem-component";
import { Box, Text, Image, useColorMode, Button, Flex } from "@chakra-ui/core";
import "./banner-style.css";

export const Banner = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "purple.700" };
  const color = { light: "black", dark: "white" };
  return (
    <>
      <Flex
        className="container-one"
        textAlign="center"
        align="center"
        justify="space-between"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        fontWeight="700"
        pl="7%"
        pr="7%"
        mt="80px"
      >
        <Box className="section_one_left" w="100%">
          <Text fontSize={["xl", "2xl", "3xl", "4xl", "6xl"]} mb="4%">
            The easiest way to stream a podcast.
          </Text>
          <Text fontSize={["xs", "sm", "md", "lg", "xl"]} mb="4%">
            Everything you need, 100% free.
          </Text>
          <Button
            className="section_one_left_btn"
            variantColor="teal"
            variant="solid"
            width={["170px", "270px", "370px", "370px"]}
            fontWeight="700"
            rounded="400px"
            fontSize={["xs", "sm", "md", "lg", "xl"]}
            shadow="md"
          >
            Make your podcast
          </Button>
        </Box>
        <Box className="section_one_right" w="100%">
          <Image
            className="image_section_one_right"
            size={["100px", "200px", "300px", "400px", "500px"]}
            objectFit="cover"
            src="/podcast-img.png"
            alt="podcast logo"
            m="auto"
          />
        </Box>
      </Flex>

      <Box
        mt="8%"
        textAlign="center"
        align="center"
        width="100%"
        fontWeight="700"
        pl="12%"
        pr="12%"
        color={color[colorMode]}
      >
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]}>
          Creative Node is an platform where you can upload and streaming your
          podcast from any device, for free.
        </Text>
      </Box>
      <SectionItems
        pathImage="/info-img-1.png"
        headTitle="Easy-to-upload your podcast"
        descTitle="You can post your record podcast on this platfrom and your fans can access this platfrom"
        positionImage="left"
      />

      <SectionItems
        pathImage="/info-img-2.png"
        headTitle="Streaming your podcast everywhere & anytime"
        descTitle="Creative Nodes platfrom based (PWA) Progressive Web Application, you can streaming podcast without installing but apps feels like native apps just add to homescreen"
        positionImage="right"
      />
    </>
  );
};
