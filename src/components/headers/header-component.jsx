import React from "react";
import { ThemeToggle } from "../theme_toggle/index";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/core";

export const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const { colorMode } = useColorMode();
  const bgColor = { light: "white.500", dark: "gray.800" };
  const color = { light: "black", dark: "white" };
  const borderColor = { light: "black", dark: "white" };

  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      borderColor={borderColor[colorMode]}
      boxShadow="lg"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"2px"}
          fontSize={["xs", "sm", "md", "lg", "xl"]}
        >
          CREATIVE NODES
        </Heading>
      </Flex>

      <Box display={{ xs: "block", md: "none" }}>
        <Box display="flex">
          <ThemeToggle />

          <svg
            fill={color[colorMode]}
            width="20px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleToggle}
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>
      </Box>

      <Box
        display={{ xs: show ? "block" : "none", md: "flex" }}
        width={{ xs: "full", md: "auto" }}
        alignItems="center"
        textTransform="uppercase"
        fontWeight="bold"
      >
        <MenuItems>Discovery</MenuItems>
        <MenuItems>Contact Us</MenuItems>
        <Button
          bg="transparent"
          border="1px"
          mt={{ base: 4, md: 0 }}
          mr={6}
          display="block"
          textTransform="uppercase"
          boxShadow="md"
          fontWeight="bold"
          fontSize={["xs", "sm", "md", "lg", "xl"]}
        >
          Create Podcast
        </Button>
        <Box display={{ xs: "none", md: "block" }}>
          <ThemeToggle />
        </Box>
      </Box>
    </Flex>
  );
};

const MenuItems = ({ children }) => (
  <Text
    mt={{ base: 4, md: 0 }}
    mr={6}
    display="block"
    fontSize={["xs", "sm", "md", "lg", "xl"]}
  >
    {children}
  </Text>
);
