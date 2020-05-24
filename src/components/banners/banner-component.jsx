import React from "react";
import { Grid, Box, useColorMode, Text } from "@chakra-ui/core";
import "./banner-style.css";

export const Banner = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "#ffff", dark: "purple.500" };
  const color = { light: "black", dark: "#ffff" };
  return (
    <React.Fragment>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={3}
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        height={500}
        className="section-1"
      >
        <Box m="auto" fontWeight="bold" lineHeight="tight" isTruncated>
          <Text fontSize="4xl">The easiest way to make a podcast.</Text>
          <Text fontSize="4xl">The easiest way to make a podcast.</Text>
          <Text fontSize="4xl">The easiest way to make a podcast.</Text>
        </Box>
        <Box w="100%" />
      </Grid>
    </React.Fragment>
  );
};
