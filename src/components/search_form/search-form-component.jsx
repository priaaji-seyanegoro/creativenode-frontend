import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  Input,
  InputRightElement,
  Stack,
  Flex,
  Text,
  Button,
  InputGroup,
  useColorMode,
  FormErrorMessage,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useStoreActions } from "easy-peasy";
import "./search-form-style.css";

export const SearchFrom = () => {
  const { colorMode } = useColorMode();
  const { register, errors, handleSubmit } = useForm();
  const [submit, setSubmit] = useState(false);

  const setPodcast = useStoreActions((actions) => actions.podcast.setPodcast);

  const onSearch = async (data, e) => {
    const { searchInput } = data;
    setPodcast([]);
    setSubmit(true);
    try {
      const search = await fetch(
        `http://localhost:5000/api/podcast/search?q=${searchInput}`,
        {
          method: "get",
        }
      );

      const result = await search.json();

      if (result) {
        console.log(result.podcast);
        setPodcast(result.podcast);
        setSubmit(false);
      }
    } catch {
      console.log("fail");
    }
  };

  const borderColor = { light: "black", dark: "white" };
  return (
    <>
      <Flex
        direction="row"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        textTransform="uppercase"
        mb="20px"
        mt="100px"
      >
        <Flex direction="row" className="search-section">
          <form onSubmit={handleSubmit(onSearch)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.searchInput}>
                <InputGroup>
                  <Input
                    id="pass-signin"
                    type="text"
                    placeholder="Search for podcasts"
                    border="1px"
                    borderColor={borderColor[colorMode]}
                    w={["250px", "sm", "md", "lg", "xl"]}
                    mb="20px"
                    autoComplete="off"
                    name="searchInput"
                    ref={register({
                      required: true,
                    })}
                  />
                  <InputRightElement>
                    {!submit ? (
                      <IconButton
                        type="submit"
                        icon="search"
                        variant="ghost"
                        size="sm"
                      />
                    ) : (
                      <IconButton
                        isLoading
                        type="submit"
                        icon="search"
                        variant="ghost"
                        size="sm"
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage alignItems="center">
                  {errors.searchInput?.type === "required" &&
                    "Search Input Cannot be null"}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </form>
          <Text
            fontSize={["sm", "md", "lg", "xl"]}
            ml="20px"
            mb="20px"
            className="or-text"
          >
            or
          </Text>
          <Button variantColor="purple" ml="20px" className="button-upload">
            Upload your own
          </Button>
        </Flex>
      </Flex>

      <Text
        mt="20px"
        fontSize={["xs", "sm", "md", "lg", "xl"]}
        pl="20px"
        pr="20px"
      >
        Hear what’s trending for free in the Creative Node community
      </Text>
    </>
  );
};
