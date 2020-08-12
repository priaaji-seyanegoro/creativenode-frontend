import React, { Fragment } from "react";
import { Flex } from "@chakra-ui/core";
import { DashboardItems } from "../components/dashboard-items/dashboardItems-component";

export const Dashboard = () => (
  <Fragment>
    <Flex
      direction="row"
      justifyContent="center"
      textAlign="center"
      alignItems="center"
      textTransform="uppercase"
      mb="20px"
      mt="100px"
    >
      <DashboardItems />
    </Flex>
  </Fragment>
);
