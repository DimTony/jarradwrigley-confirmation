import React, { useState } from "react";
import { Box, Spinner, VStack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ContractForm from "../components/ContractForm";
import SuccessfulPage from "../components/SuccessfulPage";
import PaymentForm from "../components/PaymentForm";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentBottom, setCurrentBottom] = useState("form");
  const [pdfData, setPdfData] = useState(null);
  const [pictureData, setPictureData] = useState(null);
  const [step, setStep] = useState(1);
  const [isPaymentFormLoading, setIsPaymentFormLoading] = useState(false);
  const toast = useToast();

  const handlePdfUpload = (data) => {
    setPdfData(data); // Store the uploaded PDF data
  };

  const handleSubmit = async () => {
    if (!pdfData || !pictureData) return; // Ensure both files are available

    const pdfBlob = await fetch(pdfData).then((res) => res.blob());

    const formData = new FormData();
    formData.append("pdf", pdfBlob, "contract.pdf");
    formData.append("picture", pictureData); // Directly append the file object

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/jarrad-wrigley/confirmation/save`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending files
          },
        }
      );

      if (response.status === 201) {
        toast({
          title: "Contract & Receipt Submitted Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setStep(3);
      } else {
        toast({
          title: "Error submitting form",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error submitting form", error);

      // Set a timeout for 3 seconds before showing the error toast
      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast({
        title: "Error submitting form",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setCurrentBottom("done");
    }, 3000);
  };

  let content;

  switch (currentBottom) {
    case "form":
      content = (
        <ContractForm
          setCurrentBottom={setCurrentBottom}
          onFileUpload={handlePdfUpload}
          pdfData={pdfData}
        />
      );
      break;

    case "payment":
      content = (
        <PaymentForm
          handleSubmit={handleSubmit}
          handleDone={handleDone}
          setCurrentBottom={setCurrentBottom}
          pictureData={pictureData}
          setPictureData={setPictureData}
          step={step}
          setStep={setStep}
          isPaymentFormLoading={isPaymentFormLoading}
          setIsPaymentFormLoading={setIsPaymentFormLoading}
        />
      );
      break;

    case "done":
      content = <SuccessfulPage />;
      break;

    default:
      content = (
        <ContractForm
          setCurrentBottom={setCurrentBottom}
          onFileUpload={handlePdfUpload}
          pdfData={pdfData}
        />
      );
      break;
  }

  return (
    <Box p="0.5rem" w="100vw" h="100vh">
      <VStack alignItems="flex-start" w="100%" h="100%" overflow="hidden">
        <Navbar />
        {content}
      </VStack>
      {isLoading && (
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
    </Box>
  );
};

export default Landing;
