import React from "react";
import { Flex } from "@chakra-ui/core";
import { SearchFrom } from "../components/search_form/search-form-component";

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
      </Flex>
    </React.Fragment>
  );
};
