import { Box, Button, HStack, Text } from "@chakra-ui/react";

export default function DebugArea() {
  return (
    <Box p={10}>
      <Text>Debug Area</Text>
      <HStack>
        <Button>Test Button</Button>
        <Button>Test Button</Button>
        <Button>Test Button</Button>
        <Button>Test Button</Button>
      </HStack>
    </Box>
  );
}
