import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const Contact = () => {
  return (
    <Box color="white" p="2rem">
      <VStack spacing="2rem" align="start">
        <Text fontSize="2xl" fontWeight="bold">
          Contact
        </Text>
        <Text>Get in touch...</Text>
        {/* Add your contact form/info here */}
      </VStack>
    </Box>
  );
};

export default Contact;
