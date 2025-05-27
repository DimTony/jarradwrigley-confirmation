import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const EPK = () => {
  return (
    <Box color="white" p="2rem">
      <VStack spacing="2rem" align="start">
        <Text fontSize="2xl" fontWeight="bold">
          Electronic Press Kit
        </Text>
        <Text>EPK content goes here...</Text>
        {/* Add your EPK content here */}
      </VStack>
    </Box>
  );
};

export default EPK;
