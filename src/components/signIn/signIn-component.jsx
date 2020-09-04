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
  FormErrorMessage,
  Stack,
  useToast,
  useColorMode,
} from "@chakra-ui/core";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Cookie from "js-cookie";
import "./signIn-style.css";

export const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const [submit, setSubmit] = useState(false);

  const { colorMode } = useColorMode();
  const toast = useToast();
  const history = useHistory();
  const color = { light: "black", dark: "white" };
  const borderColor = { light: "black", dark: "white" };

  const { register, errors, handleSubmit } = useForm();

  const dispatch = useDispatch();

  //SHOW VALUE INPUT PASSWORD
  function handleToggle(e) {
    e.preventDefault();
    setShowPass(!showPass);
  }

  //SIGN IN ACTION
  const onSignIn = async (data, e) => {
    setSubmit(true);
    const { emailInput, passwordInput } = data;

    const response = await fetch("http://localhost:5000/api/user/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    });
    const result = await response.json();

    if (result.status) {
      setSubmit(false);
      dispatch(setCurrentUser(true));
      Cookie.set("token", result.token);

      toast({
        title: "Sign In successfuly",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      e.target.reset();
      history.push("/dashboard");
    } else {
      setSubmit(false);
      toast({
        title: "Sign In Fail",
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

          <form onSubmit={handleSubmit(onSignIn)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.emailInput}>
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
                    ref={register({
                      required: true,
                      pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    autoComplete="off"
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.emailInput?.type === "required" && "Email required"}
                  {errors.emailInput?.type === "pattern" &&
                    "Your input must be an email"}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.passwordInput}>
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
                    ref={register({
                      required: true,
                    })}
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
                <FormErrorMessage>
                  {errors.passwordInput?.type === "required" &&
                    "Password Required"}
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
