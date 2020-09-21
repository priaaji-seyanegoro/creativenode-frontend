import React from "react";
import { Text, Box, Image } from "@chakra-ui/core";
import { useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import "./Item-style.css";

export const Item = ({ imageSrc, podcastName, title, id, keyId }) => {
  const isLoading = useStoreActions((actions) => actions.podcast.setIsLoading);

  return (
    <>
      <Link
        to={`/podcast/show/${id}`}
        key={keyId}
        onClick={() => {
          isLoading(true);
        }}
      >
        <Box textAlign="center" mb="20px" className="trending-items">
          <Image
            src={`https://cryptic-thicket-69508.herokuapp.com/${imageSrc}`}
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
            >
              {podcastName}
            </Text>
            <Text fontSize="xs">{title}</Text>
          </Box>
        </Box>
      </Link>
    </>
  );
};
