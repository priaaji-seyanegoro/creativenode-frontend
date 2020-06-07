import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/core";

export const Discovery = () => (
  <React.Fragment>
    <SimpleGrid
      columns={{ xs: 2, sm: 3, md: 4 }}
      spacing="40px"
      mt="8%"
      p="30px"
    >
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
    </SimpleGrid>
  </React.Fragment>
);
