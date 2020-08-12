import React from "react";
import {
  Flex,
  IconButton,
  Button,
  Text,
  Image,
  useColorMode,
  Divider,
  Tooltip,
  Collapse,
  Badge,
} from "@chakra-ui/core";
import { useParams } from "react-router-dom";

export const PodcastDetail = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };
  const { podcastId } = useParams();
  return (
    <>
      <Flex justifyContent="center" mt="11%">
        <Flex flexDirection="column">
          <Image
            src="https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode400/812386/812386-1588677350101-c4d4427d5d40f.jpg"
            size="300px"
            objectFit="cover"
            rounded="20px"
            fallbackSrc="https://via.placeholder.com/150"
            mb="20px"
          />
          <Flex align="center" justifyContent="space-around" mb="20px">
            <Button
              className="menu-items"
              bg="transparent"
              border="1px"
              width="200px"
              textTransform="uppercase"
              boxShadow="md"
              fontWeight="bold"
              fontSize={["xs", "sm", "md", "lg", "xl"]}
            >
              Play Podcast
            </Button>
            <Tooltip hasArrow label="Like Podcast" placement="top">
              <IconButton
                className="menu-items"
                bg="transparent"
                border="1px"
                textTransform="uppercase"
                boxShadow="md"
                fontWeight="bold"
                fontSize={["xs", "sm", "md", "lg", "xl"]}
                mr="10px"
                aria-label="like podcast"
                // color="#8940fa"
                icon="star"
              />
            </Tooltip>
          </Flex>
          <Flex align="center" justifyContent="center" mb="20px">
            <Badge fontSize="xl">100 Likes</Badge>
            <Tooltip hasArrow label="Created At" placement="top">
              <Badge ml="5" fontSize="xl">
                08/03/2020
              </Badge>
            </Tooltip>
          </Flex>
        </Flex>
        <Flex flexDirection="column" ml="3%">
          <Text fontSize={["xl", "2xl", "3xl", "4xl", "5xl"]} fontWeight="700">
            Thirty Days Of Lunch Podcast
          </Text>

          <Text fontSize={["sm", "md", "lg", "xl", "2xl"]}>
            Lunch #12 : Managing Energy : The Secret To Productivity
          </Text>

          <Divider borderColor={color[colorMode]} />

          <Collapse
            textAlign="justify"
            width="700px"
            fontSize={["xs", "sm", "md", "lg", "xl"]}
            startingHeight={100}
            isOpen={show}
          >
            Gimana caranya bisa ngerjain banyak hal tapi tetep maksimal? Gimana
            caranya fokus? Gimana work from home sambil ngurusin anak? -- Kita
            juga sama penasarannya sama lo. Meet Ricky Setiawan, Chief Revenue
            Officer di Happy5. Managing a family with two kids, running a team,
            plus having a side hustle and second business. He's the right person
            to learn from. Ternyata produktif itu bukan hanya soal ngatur waktu.
            Ternyata produktif itu bukan hanya soal ngatur distraction. Ternyata
            rahasianya ada di managing energy. Ricky ngulik 4 pilar penting yang
            perlu kita perhatikan. Take a listen. Hopefully kita semua bisa
            gunakan ini to be the best version of ourselves. Cheers,
            @fellexandro @sheggario
          </Collapse>
          <Button
            className="menu-items"
            bg="transparent"
            border="1px"
            textTransform="uppercase"
            boxShadow="md"
            fontWeight="bold"
            onClick={handleToggle}
            mt="1rem"
            mb="1rem"
          >
            Show {show ? "Less" : "More"}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
