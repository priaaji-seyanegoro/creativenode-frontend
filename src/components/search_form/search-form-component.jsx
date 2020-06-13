import React from "react";
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
} from "@chakra-ui/core";
import { PreviewTrendingItems } from "../preview-trending-items/preview-trending-component";
import "./search-form-style.css";

export const SearchFrom = () => {
  const { colorMode } = useColorMode();

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
          <form>
            <Stack spacing={4}>
              <FormControl isRequired>
                <InputGroup>
                  <Input
                    id="pass-signin"
                    type="text"
                    placeholder="Search for podcasts"
                    border="1px"
                    borderColor={borderColor[colorMode]}
                    w={["250px", "sm", "md", "lg", "xl"]}
                    mb="20px"
                  />
                  <InputRightElement>
                    <IconButton icon="search" variant="ghost" size="sm" />
                  </InputRightElement>
                </InputGroup>
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

      <PreviewTrendingItems className="preview-trending-items" />
    </>
  );
};
