import React, { Fragment } from "react";
import { Flex } from "@chakra-ui/core";

export const NotMatch = () => (
  <Fragment>
    <Flex
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      fontWeight="700"
      textTransform="uppercase"
    >
      <p>Sorry Page Not Found | 404 !</p>
    </Flex>
  </Fragment>
);
