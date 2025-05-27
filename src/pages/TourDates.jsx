import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const TourDates = () => {
  return (
    <Box color="white" p="2rem">
      <VStack spacing="2rem" align="start">
        <Text fontSize="2xl" fontWeight="bold">
          Tour Dates
        </Text>
        <Text>Upcoming tour dates will be displayed here...</Text>
        {/* Add your tour dates content here */}
      </VStack>
    </Box>
  );
};

export default TourDates;
