import React from "react";
import { Box, Text, Image, useColorMode, Flex } from "@chakra-ui/core";

export const SectionItems = ({
  pathImage,
  headTitle,
  descTitle,
  positionImage,
}) => {
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };
  return (
    <>
      <Flex
        className="container-two"
        direction={positionImage === "left" ? "row" : "row-reverse"}
        textAlign={positionImage === "left" ? "left" : "right"}
        align="center"
        justify="space-between"
        color={color[colorMode]}
        pl="12%"
        pr="12%"
        mt="80px"
        mb="80px"
        textTransform="uppercase"
      >
        <Box className="section_two_left" w="100%">
          <Image
            className="image_section_two_right"
            size={["300px", "300px", "300px", "400px", "400px"]}
            objectFit="cover"
            src={pathImage}
            alt="podcast logo"
            m="auto"
          />
        </Box>
        <Box className="section_two_right" w="100%">
          <Text
            fontSize={["sm", "md", "lg", "xl", "2xl"]}
            fontWeight="700"
            mb="4%"
          >
            {headTitle}
          </Text>
          <Text fontSize={["xs", "sm", "md", "lg", "xl"]} fontWeight="500">
            {descTitle}
          </Text>
        </Box>
      </Flex>
    </>
  );
};
