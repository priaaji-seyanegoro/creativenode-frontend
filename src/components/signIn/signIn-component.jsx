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
  useToast,
  useColorMode,
} from "@chakra-ui/core";
import "./signIn-style.css";

export const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const [submit, setSubmit] = useState(false);

  const { colorMode } = useColorMode();
  const toast = useToast();

  const color = { light: "black", dark: "white" };
  const borderColor = { light: "black", dark: "white" };

  function handleToggle(e) {
    e.preventDefault();
    setShowPass(!showPass);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    const { emailInput, passwordInput } = e.target.elements;
    setSubmit(true);

    const response = await fetch("http://localhost:5000/api/user/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    const data = await response.json();

    if (data.status) {
      console.log(data.user);
      setSubmit(false);
      toast({
        title: "Login successfuly",

        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });

      e.target.reset();
    } else {
      setSubmit(false);
      toast({
        title: "Login fail",
        description: `${data.error}`,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
                    name="emailInput"
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
                    name="passwordInput"
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

              {!submit ? (
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
              ) : (
                <Button
                  isLoading
                  loadingText="Submitting"
                  variantColor="teal"
                  variant="solid"
                  shadow="md"
                  fontWeight="700"
                  letterSpacing={"2px"}
                  rounded="400px"
                  textTransform="uppercase"
                >
                  Submit
                </Button>
              )}
            </Stack>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
};
