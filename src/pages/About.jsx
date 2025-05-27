import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box color="white" p="2rem">
      <VStack spacing="2rem" align="start">
        <Text fontSize="2xl" fontWeight="bold">
          About
        </Text>
        <Text>Learn more about Jarrad Wrigley...</Text>
        {/* Add your about content here */}
      </VStack>
    </Box>
  );
};

export default About;
