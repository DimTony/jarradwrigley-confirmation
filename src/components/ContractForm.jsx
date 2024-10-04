import React, { useState } from "react";
import { Box, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";

const ContractForm = ({ setCurrentBottom, onFileUpload, pdfData }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      onFileUpload(e.target.result); // Use the callback to update parent state
    };

    reader.readAsDataURL(file);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    noClick: true, // Disable automatic opening of the file dialog
    noKeyboard: true, // Disable keyboard interaction (helpful for mobile)
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileUpload(e.target.result); // Use the callback to update parent state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <VStack w="100%" h="85dvh">
      <VStack pt={{ base: "1rem" }}>
        <Text textAlign="center" fontSize="2rem" fontWeight="600">
          Upload Your Signed Contract
        </Text>
        <Text textAlign="center">
          Upload a signed copy of the performance contract in{" "}
          <span style={{ color: "red", fontWeight: "600" }}>
            PDF format only
          </span>
          !
        </Text>
      </VStack>
      <HStack w="100%" px={4}>
        <Box
          {...getRootProps()}
          borderWidth={2}
          borderStyle="dashed"
          borderColor={isDragActive ? "blue.500" : "gray.300"}
          p={6}
          w="50%"
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="rgba(255, 255, 255, 0.8)"
          _hover={{ bg: "gray.100" }}
        >
          <input
            {...getInputProps()}
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the file input
          />
          {isDragActive ? (
            <Text mb="1rem">Drop the PDF file here...</Text>
          ) : (
            <Text mb="1rem">Drag and drop a PDF file here to upload</Text>
          )}
          <Text>or</Text>
          <Button
            mt={4}
            mb={2}
            onClick={() => document.querySelector('input[type="file"]').click()}
            colorScheme="blue"
          >
            Select File
          </Button>
          <Text>Maximum upload size is 5 MB</Text>
        </Box>

        <Box border="1px solid #eee" w="50%" h="100%">
          <Box
            maxH="60dvh"
            overflowY="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {pdfData && (
              <VStack spacing={0}>
                <Document
                  file={pdfData}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
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
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    width={300}
                    height={undefined}
                  />
                </Document>
                <Text>
                  Page {pageNumber} of {numPages}
                </Text>
              </VStack>
            )}
          </Box>
        </Box>
      </HStack>
      <Button
        isDisabled={!pdfData}
        mt={4}
        colorScheme="blue"
        w="30vw"
        onClick={() => setCurrentBottom("payment")}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default ContractForm;
