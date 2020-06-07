import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import { SignIn } from "../components/signIn/signIn-component";
import { SignUp } from "../components/signUp/signUp-component";

export const SignInSignUp = () => (
  <React.Fragment>
    <Tabs
      display="flex"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      mt="180px"
      flexDirection="column"
    >
      <TabList>
        <Tab fontWeight="700" textTransform="uppercase">
          sign in
        </Tab>
        <Tab fontWeight="700" textTransform="uppercase">
          sign up
        </Tab>
      </TabList>

      <TabPanels mt="10px" mb="10px" defaultIndex={1}>
        <TabPanel>
          <SignIn />
        </TabPanel>
        <TabPanel>
          <SignUp />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </React.Fragment>
);
