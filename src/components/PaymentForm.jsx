import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zoomInOut } from "./CustomCSS";
import PayPalLogo from "../assets/PayPal.png";
import { IoMdPerson } from "react-icons/io";
import { BsPersonBoundingBox } from "react-icons/bs";
import { QuestionIcon } from "@chakra-ui/icons";
import MobileQuestionTooltip from "./MobileTooltip";

const PaymentForm = ({
  handleSubmit,
  handleDone,
  setCurrentBottom,
  pictureData,
  setPictureData,
  step,
  setStep,
  isPaymentFormLoading,
  setIsPaymentFormLoading,
}) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [selectedReceiptFile, setSelectedReceiptFile] = useState(null);
  const receiptPhotoFileInputRef = useRef(null);
  const toast = useToast();

  const handleReceiptPhotoFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setSelectedReceiptFile(null);
      setPictureData(null);

      return;
    }

    // Check file size (limit to 5MB for this example)
    const maxSize = 2000 * 1024 * 1024; // 2GB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select an image file smaller than 5MB.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setSelectedReceiptFile(null);
      setPictureData(null);

      return;
    }

    // File is valid, update state and formData
    setSelectedReceiptFile(file);
    setPictureData(file);

    toast({
      title: "File selected",
      description: `${file.name} has been selected.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleReceiptPhotoButtonClick = () => {
    receiptPhotoFileInputRef.current.click();
  };

  useEffect(() => {
    setIsGenerating(true);

    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPictureData(reader.result); // Store the picture data
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePaid = (e) => {
    e.preventDefault();

    setIsPaymentFormLoading(true);

    setTimeout(() => {
      setStep(2);
      setIsPaymentFormLoading(false);
    }, 5000);
  };

  if (isGenerating) {
    return (
      <VStack mb="2rem" justifyContent="center" pt="5rem" w="100%">
        <Text
          animation={`${zoomInOut} 3s ease-in-out infinite`}
          fontSize={{ xl: "2rem", base: "1rem" }}
          color="#306ac0"
          fontWeight="700"
          mb="3rem"
        >
          Generating Payment Plan
        </Text>
        <Spinner boxSize="5rem" color="#306ac0" borderWidth="0.5rem" />
      </VStack>
    );
  }

  return (
    <VStack spacing={4} w="100%">
      <VStack pt="1rem">
        <Text
          fontSize={{ xl: "2rem", base: "1rem" }}
          color="#306ac0"
          fontWeight="600"
        >
          It's almost time to enjoy the Jarrad Wrigley experience!
        </Text>

        {!isGenerating && step === 1 && (
          <VStack w="20rem">
            <Box
              w="100%"
              h="100%"
              bg="white"
              borderRadius="1rem"
              py="1rem"
              border="0.5px solid rgba(48, 106, 192, 0.3)"
            >
              <VStack w="100%">
                <VStack spacing={0}>
                  <Image src={PayPalLogo} alt="pp" w="5rem" h="auto" />
                  <Text fontSize="1.5rem">Payment review</Text>
                </VStack>
                <VStack
                  alignItems="flex-start"
                  px="1.5rem"
                  justifyContent="center"
                  spacing={0}
                  w="100%"
                >
                  <Text fontSize="0.8rem" fontWeight="700">
                    From
                  </Text>
                  <HStack alignItems="flex-start" h="2.5rem">
                    <HStack
                      h="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={IoMdPerson}
                        w={8}
                        h={8}
                        bg="#e0e0e0"
                        boxShadow="20px 20px 60px #bebebe,-20px -20px 60px #ffffff"
                        borderRadius="full"
                        p={1}
                        color="#273465"
                      />
                    </HStack>
                    <VStack w="90%" alignItems="flex-start" spacing={0}>
                      <Text fontSize="0.8rem">John Doe</Text>
                      <Text fontSize="0.8rem">Egbe, New South Wales</Text>
                    </VStack>
                  </HStack>
                </VStack>
                <VStack
                  alignItems="flex-start"
                  px="1.5rem"
                  justifyContent="center"
                  spacing={0}
                  w="100%"
                >
                  <HStack alignItems="center">
                    <Text fontSize="0.8rem" fontWeight="700">
                      To
                    </Text>
                    <Tooltip
                      label={
                        <Box>
                          <Text fontWeight="bold">
                            Please transfer using PayPal's 'Friends and Family'
                            option:
                          </Text>
                          <Text>1. Log in to your PayPal account.</Text>
                          <Text>
                            2. Make sure you have the amount to be paid
                            available in your PayPal balance.
                          </Text>
                          <Text>3. Select 'Send & Request.'</Text>
                          <Text>4. Choose 'Send to a friend.'</Text>
                          <Text>5. Enter the provided email and amount.</Text>
                          {/* <Text>
                      5. Ensure that each transfer does not exceed $1,000.
                    </Text>
                    <Text>
                      6. Complete the transfer. Repeat the process if the total
                      amount exceeds $1,000.
                    </Text> */}
                          <Text>6. Complete the transfer.</Text>
                        </Box>
                      }
                      aria-label="PayPal Transfer Instructions"
                      placement="right"
                    >
                      <QuestionIcon
                        ml={1}
                        color="blue.500"
                        display={{ xl: "flex", base: "none" }}
                      />
                    </Tooltip>
                    <Box display={{ xl: "none", base: "flex" }}>
                      <MobileQuestionTooltip />
                    </Box>
                  </HStack>

                  <HStack alignItems="flex-start" h="2.5rem">
                    <HStack
                      h="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={BsPersonBoundingBox}
                        w={8}
                        h={8}
                        bg="#e0e0e0"
                        boxShadow="20px 20px 60px #bebebe,-20px -20px 60px #ffffff"
                        borderRadius="full"
                        p={1}
                        color="#278fc2"
                      />
                    </HStack>
                    <VStack w="90%" alignItems="flex-start" spacing={0}>
                      <Text fontSize="0.8rem">
                        Ashantae Jalissa Witherspoon
                      </Text>
                      <Text fontSize="0.8rem" color="#306ac0">
                        kickhart7@gmail.com
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
                {/* <Box w="100%" px="1.5rem">
            <HStack
              bg="rgba(39, 143, 194, 0.1)"
              p="0.5rem"
              h="100%"
              borderRadius="1rem"
            >
              <HStack
                fontWeight="600"
                fontSize="0.8rem"
                w="100%"
                justifyContent="space-between"
              >
                <Text>Payment Option</Text>
                <Text>Batch payment in $1,000.00 denominations</Text>
              </HStack>
            </HStack>
          </Box> */}

                <Box w="100%" px="1.5rem">
                  <HStack
                    bg="rgba(39, 143, 194, 0.1)"
                    p="0.5rem"
                    h="100%"
                    borderRadius="1rem"
                  >
                    <HStack
                      fontWeight="600"
                      fontSize="0.8rem"
                      w="100%"
                      justifyContent="space-between"
                    >
                      <Text>Payment Type</Text>
                      <Text>Friends & Family</Text>
                    </HStack>
                  </HStack>
                </Box>

                {/* <Box w="100%" px="1.5rem">
            <VStack
              bg="rgba(39, 143, 194, 0.1)"
              p="0.5rem"
              h="100%"
              borderRadius="1rem"
            >
              <HStack fontSize="0.8rem" w="100%" justifyContent="space-between">
                <Text>Transfer Amount</Text>
                <Text>$4,500.00</Text>
              </HStack>
              <HStack
                fontSize="0.8rem"
                color="red.500"
                w="100%"
                justifyContent="space-between"
              >
                <Text>Outstanding Amount</Text>
                <Text>-$5,000.00</Text>
              </HStack>
              <HStack fontSize="0.8rem" w="100%" justifyContent="space-between">
                <Text>Total Amount</Text>
                <Text>$10,000.00</Text>
              </HStack>
            </VStack>
          </Box> */}
                <Box w="100%" px="1.5rem">
                  <VStack
                    bg="rgba(39, 143, 194, 0.1)"
                    p="0.5rem"
                    h="100%"
                    borderRadius="1rem"
                  >
                    <HStack
                      fontSize="0.8rem"
                      w="100%"
                      justifyContent="space-between"
                    >
                      <Text>Transfer Amount</Text>
                      <Text>A$500.00</Text>
                    </HStack>
                    <HStack
                      fontSize="0.8rem"
                      color="red.500"
                      w="100%"
                      justifyContent="space-between"
                    >
                      <Text>Outstanding Amount</Text>
                      <Text>-A$500.00</Text>
                    </HStack>
                    <HStack
                      fontSize="0.8rem"
                      w="100%"
                      justifyContent="space-between"
                    >
                      <Text>Total Amount</Text>
                      <Text>A$1000.00</Text>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </VStack>
        )}

        {isPaymentFormLoading && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(255, 255, 255, 0.8)"
            zIndex="10"
          >
            <Spinner size="xl" />
          </Box>
        )}

        {!isGenerating && step === 2 && (
          <VStack w="20rem">
            <Box
              w="fit-content"
              h="100%"
              bg="white"
              borderRadius="1rem"
              py="1rem"
              border="0.5px solid rgba(48, 106, 192, 0.3)"
            >
              <VStack w="fit-content">
                <VStack spacing={0}>
                  <Image src={PayPalLogo} alt="pp" w="5rem" h="auto" />
                  <Text fontSize="1.5rem">Upload Receipt</Text>
                </VStack>
                <FormControl isRequired>
                  <FormLabel fontSize="0.75rem" textAlign="center">
                    Upload a clear photo of the payment receipt (screenshots are
                    allowed)
                  </FormLabel>
                  <HStack justifyContent="center" px="0.5rem">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptPhotoFileChange}
                      ref={receiptPhotoFileInputRef}
                      display="none"
                    />
                    <Button
                      onClick={handleReceiptPhotoButtonClick}
                      colorScheme="blue"
                      px="1rem"
                      w="10rem"
                    >
                      <Text fontSize="0.75rem"> Choose Photo</Text>
                    </Button>
                    <Box mt={2}>
                      {selectedReceiptFile ? (
                        <Text>
                          Selected file: {selectedReceiptFile.name} (
                          {(selectedReceiptFile.size / (1024 * 1024)).toFixed(
                            2
                          )}{" "}
                          MB)
                        </Text>
                      ) : (
                        <Text>No file selected</Text>
                      )}
                    </Box>
                  </HStack>
                </FormControl>
              </VStack>
            </Box>
          </VStack>
        )}

        {!isGenerating && step === 3 && (
          <VStack w="20rem">
            <Box
              w="100%"
              h="100%"
              bg="white"
              borderRadius="1rem"
              py="1rem"
              border="0.5px solid rgba(48, 106, 192, 0.3)"
            >
              <VStack w="100%">
                <VStack spacing={0}>
                  <Image src={PayPalLogo} alt="pp" w="5rem" h="auto" />
                  <Text fontSize="1.5rem" color="green" fontWeight="600">
                    Success!
                  </Text>
                  <Text>Receipt and Contract Uploaded</Text>
                </VStack>
              </VStack>
            </Box>
          </VStack>
        )}
      </VStack>

      {/* <Input type="file" accept="image/*" onChange={onFileChange} /> */}
      <HStack>
        {step !== 3 && (
          <Button onClick={() => setCurrentBottom("form")}>Previous</Button>
        )}
        {!isGenerating && step === 1 && (
          <Button onClick={handlePaid} colorScheme="blue">
            Paid
          </Button>
        )}
        {!isGenerating && step === 2 && (
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            isDisabled={!selectedReceiptFile}
          >
            Submit
          </Button>
        )}

        {!isGenerating && step === 3 && (
          <Button onClick={handleDone} colorScheme="green">
            Done
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default PaymentForm;
