import React from "react";
import Typist from "react-typist";
import { Image, Flex, Box, Text, Badge, Link, Icon } from "@chakra-ui/core";

export const CardContact = () => (
  <>
    <Flex
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      fontWeight="700"
      textTransform="uppercase"
    >
      <Image
        rounded="full"
        size="150px"
        src="https://pbs.twimg.com/media/D09ccmlVsAE5qOY?format=jpg&name=small"
        alt="priajisn"
        mb="20px"
      />
      <Box ml="3">
        <Typist cursor={{ show: false }}>
          <Text mb="20px" fontSize={["lg", "xl", "2xl", "3xl", "4xl"]}>
            hi my name is priaajisn (aji)
            <span role="img" aria-label="blink">
              ✨
            </span>
          </Text>
          <Typist.Delay ms={1250} />
          <Badge
            fontSize={["sm", "md", "lg", "xl", "2xl"]}
            variantColor="green"
            mb="20px"
          >
            student of upi yai
          </Badge>
          <Typist.Delay ms={1250} />
          <Text mb="20px" fontSize={["md", "lg", "xl", "2xl", "3xl"]}>
            live in jkt, indonesia <span />
            <span role="img" aria-label="city">
              🏡
            </span>
          </Text>
          <Typist.Delay ms={1250} />
          <Text mb="20px" fontSize={["sm", "md", "lg", "xl", "2xl"]}>
            keep in touch with me <span />
            <span role="img" aria-label="chat">
              🗯
            </span>
          </Text>

          <Typist.Delay ms={1250} />
          <Flex
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            fontSize={["xs", "sm", "md", "lg", "xl"]}
          >
            <Typist.Delay ms={1250} />
            <Link
              href="https://github.com/priaaji-seyanegoro"
              isExternal
              mr="10px"
              _hover={{ color: "#8940fa" }}
            >
              github <Icon name="external-link" mx="2px" />.
            </Link>

            <Link
              href="https://twitter.com/priaajisn"
              isExternal
              mr="10px"
              _hover={{ color: "#8940fa" }}
            >
              twitter <Icon name="external-link" mx="2px" />.
            </Link>

            <Link
              href="mailto:priaaji.setyanegoro@gmail.com"
              isExternal
              mr="10px"
              _hover={{ color: "#8940fa" }}
            >
              email <Icon name="external-link" mx="2px" />.
            </Link>
          </Flex>
        </Typist>
      </Box>
    </Flex>
  </>
);
