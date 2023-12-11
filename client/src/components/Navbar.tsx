import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { ThemeSelector } from "../theme";

export default function Navbar() {
  return (
    <Flex
      p={5}
      bg={"bg.surface"}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottomWidth="1px"
      boxShadow={"md"}
      height={"90px"}
    >
      <Stack>
        <Heading size={"sm"}>Chinese Investment Projects</Heading>
        <Text>COSC-257</Text>
      </Stack>
      <ThemeSelector />
    </Flex>
  );
}
