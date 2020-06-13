import React from "react";
import { Text, Box, Image } from "@chakra-ui/core";
import "./trending-items-style.css";

export const TrendingItem = ({ imageSrc, podcastName, title }) => (
  <>
    <Box textAlign="center" mb="20px" ml="10px" className="trending-items">
      <Image
        src={imageSrc}
        size="200px"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/150"
      />
      <Box className="footer" w="200px">
        <Text fontSize="sm" mt="10px" fontWeight="700">
          {podcastName}
        </Text>
        <Text fontSize="xs">{title}</Text>
      </Box>
    </Box>
  </>
);
