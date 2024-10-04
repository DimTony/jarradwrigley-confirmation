import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessfulPage = () => {
  return (
    <>
      <VStack w="100%" pt="3rem">
        <FaCheckCircle size="10rem" color="green" />
        <Text color="#888" fontSize={{ md: "4vw", base: "10vw" }}>
          Submisson successful!
        </Text>
        <Text
          color="#888"
          fontSize={{ md: "1.2vw", base: "6vw" }}
          textAlign="center"
        >
          We are currently verifying your signed contract and receipt. We will
          get back to you via email and text shortly!
        </Text>
      </VStack>
    </>
  );
};

export default SuccessfulPage;
