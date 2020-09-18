import React from "react";

import { Flex, Box, Image, Text, Skeleton } from "@chakra-ui/core";

export const DashboardSkelton = () => (
  <Flex mt="20px" flexWrap="wrap" justifyContent="center">
    <Skeleton rounded="20px" mx="10px" my="10px">
      <Box textAlign="center" mb="20px" className="trending-items">
        <Image
          size="200px"
          objectFit="cover"
          rounded="20px"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Box className="footer" w="200px">
          <Text
            fontSize="sm"
            mt="10px"
            fontWeight="700"
            className="title-podcast"
          ></Text>
          <Text fontSize="xs"></Text>
        </Box>
      </Box>
    </Skeleton>
    <Skeleton rounded="20px" mx="10px" my="10px">
      <Box textAlign="center" mb="20px" className="trending-items">
        <Image
          size="200px"
          objectFit="cover"
          rounded="20px"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Box className="footer" w="200px">
          <Text
            fontSize="sm"
            mt="10px"
            fontWeight="700"
            className="title-podcast"
          ></Text>
          <Text fontSize="xs"></Text>
        </Box>
      </Box>
    </Skeleton>
    <Skeleton rounded="20px" mx="10px" my="10px">
      <Box textAlign="center" mb="20px" className="trending-items">
        <Image
          size="200px"
          objectFit="cover"
          rounded="20px"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Box className="footer" w="200px">
          <Text
            fontSize="sm"
            mt="10px"
            fontWeight="700"
            className="title-podcast"
          ></Text>
          <Text fontSize="xs"></Text>
        </Box>
      </Box>
    </Skeleton>
  </Flex>
);
