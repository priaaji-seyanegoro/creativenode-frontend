import React from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeToggle } from "../theme_toggle/index";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/core";
import "./header-style.css";

import { useHistory } from "react-router-dom";

import { useStoreActions, useStoreState } from "easy-peasy";

import Cookie from "js-cookie";

export const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "black", dark: "white" };
  const borderColor = { light: "black", dark: "white" };

  const currentUser = useStoreState((state) => state.user.currentUser);
  const isAuth = useStoreActions((actions) => actions.user.setCurrenUser);

  const history = useHistory();

  const handleToggle = () => setShow(!show);

  const handleLogout = () => {
    const user = null;
    isAuth(user);
    Cookie.remove("token");
    setShow(!show);
    history.push("/");
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      borderBottom="1px"
      borderBottomColor={borderColor[colorMode]}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      width="100%"
      position="fixed"
      top="0"
      zIndex="docked"
      {...props}
    >
      <Flex align="center" mr={5}>
        {currentUser ? (
          <Link to="/dashboard">
            <Heading
              className="menu-items"
              cursor="pointer"
              as="h1"
              size="lg"
              letterSpacing={"2px"}
              fontSize={["xs", "sm", "md", "lg", "xl"]}
            >
              CREATIVE NODES
            </Heading>
          </Link>
        ) : (
          <Link to="/">
            <Heading
              className="menu-items"
              cursor="pointer"
              as="h1"
              size="lg"
              letterSpacing={"2px"}
              fontSize={["xs", "sm", "md", "lg", "xl"]}
            >
              CREATIVE NODES
            </Heading>
          </Link>
        )}
      </Flex>

      <Box
        display={{ xs: "block", md: "none" }}
        transition="display 1s ease-out"
      >
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
        cursor="pointer"
      >
        {currentUser ? (
          <NavLink to="/episodes" activeClassName="active">
            <MenuItems action={handleToggle}>Episodes</MenuItems>
          </NavLink>
        ) : null}
        <NavLink to="/discovery" activeClassName="active">
          <MenuItems action={handleToggle}>Discovery</MenuItems>
        </NavLink>
        <NavLink to="/contactus" activeClassName="active">
          <MenuItems action={handleToggle}>Contact Us</MenuItems>
        </NavLink>
        {currentUser ? (
          <Link to="signin">
            <Button
              className="menu-items"
              bg="transparent"
              border="1px"
              mt={{ base: 4, md: 0 }}
              mr={6}
              display="block"
              textTransform="uppercase"
              boxShadow="md"
              fontWeight="bold"
              fontSize={["xs", "sm", "md", "lg", "xl"]}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </Link>
        ) : (
          <Link to="signin">
            <Button
              className="menu-items"
              bg="transparent"
              border="1px"
              mt={{ base: 4, md: 0 }}
              mr={6}
              display="block"
              textTransform="uppercase"
              boxShadow="md"
              fontWeight="bold"
              fontSize={["xs", "sm", "md", "lg", "xl"]}
              onClick={handleToggle}
            >
              Sign In
            </Button>
          </Link>
        )}
        <Box display={{ xs: "none", md: "block" }}>
          <ThemeToggle />
        </Box>
      </Box>
    </Flex>
  );
};

const MenuItems = ({ children, action }) => (
  <Text
    className="menu-items"
    mt={{ base: 4, md: 0 }}
    mr={6}
    display="block"
    fontSize={["xs", "sm", "md", "lg", "xl"]}
    onClick={action}
  >
    {children}
  </Text>
);
