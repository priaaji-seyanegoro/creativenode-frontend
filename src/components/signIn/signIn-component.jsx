import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorMode,
} from "@chakra-ui/core";
import "./signIn-style.css";

export const SignIn = () => {
  const [showPass, setShowPass] = useState(false);

  const { colorMode } = useColorMode();

  const color = { light: "black", dark: "white" };
  const borderColor = { light: "black", dark: "white" };

  function handleToggle(e) {
    e.preventDefault();
    setShowPass(!showPass);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    console.log("Submitted!");
  }

  return (
    <Flex>
      <Box
        className="box-signin"
        w="sm"
        borderBottomColor={borderColor[colorMode]}
        color={color[colorMode]}
        borderRadius="md"
        p={5}
      >
        <Stack spacing={4}>
          <Heading
            as="h1"
            textAlign="center"
            textTransform="uppercase"
            letterSpacing={2}
            pb="1em"
          >
            sign in to creative node
          </Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired pb="1em">
                <InputGroup>
                  <InputLeftElement>
                    <Icon name="email" />
                  </InputLeftElement>
                  <Input
                    id="email-signin"
                    placeholder="Ketik Email Anda"
                    border="1px"
                    borderColor={borderColor[colorMode]}
                    autoComplete="off"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement>
                    <Icon name="lock" />
                  </InputLeftElement>
                  <Input
                    id="pass-signin"
                    type={showPass ? "text" : "password"}
                    placeholder="Ketik Password Anda"
                    border="1px"
                    borderColor={borderColor[colorMode]}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPass ? "view-off" : "view"}
                      variant="ghost"
                      size="sm"
                      onClick={handleToggle}
                      title={`${showPass ? "Hide" : "Show"} Password`}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Divider border="1px" borderColor={borderColor[colorMode]} />
              <Button
                variantColor="teal"
                variant="solid"
                type="submit"
                shadow="md"
                fontWeight="700"
                letterSpacing={"2px"}
                rounded="400px"
                textTransform="uppercase"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
};
