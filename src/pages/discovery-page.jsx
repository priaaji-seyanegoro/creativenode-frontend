import React from "react";
import { Flex } from "@chakra-ui/core";
import { SearchFrom } from "../components/search_form/search-form-component";
import { PreviewTrendingItems } from "../components/preview-trending-items/preview-trending-component";

export const Discovery = () => {
  return (
    <React.Fragment>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        textTransform="uppercase"
        mt="30px"
      >
        <SearchFrom />
        <PreviewTrendingItems className="preview-trending-items" />
      </Flex>
    </React.Fragment>
  );
};
