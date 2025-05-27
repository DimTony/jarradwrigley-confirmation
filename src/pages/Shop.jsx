import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const Shop = () => {
  return (
    <Box color="white" p="2rem">
      <VStack spacing="2rem" align="start">
        <Text fontSize="2xl" fontWeight="bold">
          Shop
        </Text>
        <Text>Merchandise and music available here...</Text>
        {/* Add your shop content here */}
      </VStack>
    </Box>
  );
};

export default Shop;
