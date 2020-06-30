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
  useToast,
} from "@chakra-ui/core";
import "./signUp-style.css";

export const SignUp = () => {
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
    const { namaPodcast, email, password } = e.target.elements;

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/auth/register",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            namePodcast: namaPodcast.value,
            email: email.value,
            password: password.value,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setSubmit(false);
      toast({
        title: "Register successfuly",
        description: `${data.error}`,
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });

      e.target.reset();
    } catch (err) {
      console.log(err);
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
            sign up to creative node
          </Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired pb="1em">
                <InputGroup>
                  <InputLeftElement>
                    <Icon name="info" />
                  </InputLeftElement>
                  <Input
                    id="name-podcast"
                    placeholder="Nama Podcast Anda"
                    border="1px"
                    name="namaPodcast"
                    borderColor={borderColor[colorMode]}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired pb="1em">
                <InputGroup>
                  <InputLeftElement>
                    <Icon name="email" />
                  </InputLeftElement>
                  <Input
                    id="email"
                    placeholder="Email Anda"
                    border="1px"
                    borderColor={borderColor[colorMode]}
                    name="email"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement>
                    <Icon name="lock" />
                  </InputLeftElement>
                  <Input
                    id="pass"
                    type={showPass ? "text" : "password"}
                    placeholder="Password Anda"
                    border="1px"
                    borderColor={borderColor[colorMode]}
                    name="password"
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
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement>
                    <Icon name="lock" />
                  </InputLeftElement>
                  <Input
                    id="pass-confirm"
                    type={showPass ? "text" : "password"}
                    placeholder="Konfirmasi Password Anda"
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
                  Register
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
