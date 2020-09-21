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
  FormErrorMessage,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import "./signUp-style.css";

export const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [submit, setSubmit] = useState(false);

  const { colorMode } = useColorMode();
  const toast = useToast();

  const color = { light: "black", dark: "white" };
  const borderColor = { light: "black", dark: "white" };

  const { register, errors, handleSubmit } = useForm();

  function handleToggle(e) {
    e.preventDefault();
    setShowPass(!showPass);
  }

  const onSignUp = async (data, e) => {
    setSubmit(true);
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password tidak sama",
        description: "Pastikan password dan confirm password sama",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      setSubmit(false);
    } else {
      const response = await fetch(
        "https://cryptic-thicket-69508.herokuapp.com/api/user/auth/register",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            namePodcast: data.namaPodcast,
            email: data.email,
            password: data.password,
          }),
        }
      );
      const result = await response.json();
      if (result.status) {
        setSubmit(false);

        toast({
          title: "Sign Up successfuly, let's sign in",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        e.target.reset();
      } else {
        setSubmit(false);
        toast({
          title: "Fail successfuly",
          description: `${result.error}`,
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
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

          <form onSubmit={handleSubmit(onSignUp)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.namaPodcast}>
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
                    ref={register({
                      required: true,
                      maxLength: 32,
                    })}
                    autoComplete="off"
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.namaPodcast?.type === "required" &&
                    "Nama Podcast required"}
                  {errors.namaPodcast?.type === "maxLength" &&
                    "Max Input 120 Character"}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email}>
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
                    ref={register({
                      required: true,
                      pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    autoComplete="off"
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email?.type === "required" && "Email required"}
                  {errors.email?.type === "pattern" &&
                    "Your input must be an email"}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
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
                    ref={register({
                      required: true,
                      minLength: 6,
                    })}
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
                <FormErrorMessage>
                  {errors.password?.type === "required" && "Password Required"}
                  {errors.password?.type === "minLength" &&
                    "Password minimal 6 charachter"}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confirmPassword}>
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
                    name="confirmPassword"
                    ref={register({
                      required: true,
                      minLength: 6,
                    })}
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
                <FormErrorMessage>
                  {errors.confirmPassword?.type === "required" &&
                    "Password Required"}
                  {errors.confirmPassword?.type === "minLength" &&
                    "Password minimal 6 charachter"}
                </FormErrorMessage>
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
