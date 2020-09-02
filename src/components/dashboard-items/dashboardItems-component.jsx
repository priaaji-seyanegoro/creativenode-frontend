import React from "react";

import { Flex, Box } from "@chakra-ui/core";
import { Item } from "../items/Item-component";
import "./dashboardItems-style.css";

export const DashboardItems = () => {
  // const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Flex mt="20px" flexWrap="wrap" justifyContent="center">
        <Box
          className="dashboard-box"
          maxW="sm"
          overflow="hidden"
          mb="10px"
          mr="20px"
        >
          <Item
            id="5ee962fb2bd83e27c0fb0581"
            imageSrc="https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode400/812386/812386-1588677350101-c4d4427d5d40f.jpg"
            podcastName="test"
            title="Lunch #12 : Managing Energy : The Secret To Productivity"
          />
        </Box>

        <Box
          className="dashboard-box"
          maxW="sm"
          overflow="hidden"
          mb="10px"
          mr="20px"
        >
          <Item
            id="5ee962fb2bd83e27c0fb0581"
            imageSrc="https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded_nologo400/1884846/1884846-1583487057675-f485ef1ea4bfe.jpg"
            podcastName="BKR Brothers podcast"
            title="#51 SARUNG PANJANG SUMBU PENDEK"
          />
        </Box>
      </Flex>
    </>
  );
};
