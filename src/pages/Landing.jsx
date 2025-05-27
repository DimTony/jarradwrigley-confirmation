import React, { useState } from "react";
import { Box, Spinner, VStack, Text, useToast, HStack, Image } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ContractForm from "../components/ContractForm";
import SuccessfulPage from "../components/SuccessfulPage";
import PaymentForm from "../components/PaymentForm";
import pdf from "../assets/MUSIC_PERFORMANCE_AGREEMENT-samarcher12122024.pdf";
import VideoMaskedLogo from "../components/MaskedLogo";
import VideoMaskedText from "../components/VideoMaskedText";
import { Link } from "react-router-dom";


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

  const labelStyle = {
    color: "#888",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    textAlign: "center",
  };

  const sectionStyle = {
    textAlign: "center",
  };

  return (
    // <Box p="0.5rem" w="100vw" h="100vh">

    //   <VStack alignItems="flex-start" w="100%" h="100%" overflow="hidden">
    //     <Navbar />
    //     <a style={{ display: "none" }} href={pdf}>
    //       downlod
    //     </a>
    //     {content}
    //   </VStack>
    //   {isLoading && (
    //     <Box
    //       position="absolute"
    //       top="0"
    //       left="0"
    //       right="0"
    //       bottom="0"
    //       display="flex"
    //       alignItems="center"
    //       justifyContent="center"
    //       bg="rgba(255, 255, 255, 0.8)"
    //       zIndex="10"
    //     >
    //       <Spinner size="xl" />
    //     </Box>
    //   )}
    // </Box>
    <>
      {/* <Box
        display="flex"
        flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
        minHeight="100vh"
        bg="black"
        p={8}
        gap={6}
      >
        <HStack justifyContent="space-between" width="100%">
          <VideoMaskedText
            text="JARRAD"
            fontFamily="Oswald, Arial, sans-serif"
            fontWeight="bold"
            height="100%"
          />

          <Box
            width="400px"
            height="200px"
            // border="1px solid"
            // borderColor="blue.400"
            // borderRadius="lg"
          >
            <VideoMaskedLogo />
          </Box>

          <VideoMaskedText
            text="JARRAD"
            fontFamily="Oswald, Arial, sans-serif"
            fontWeight="bold"
            height="100%"
          />
        </HStack>
      </Box> */}

      <Box height="100vh" overflowY="auto" backgroundColor="black">
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100%"
          padding="2rem"
          gap="1.5rem"
        >
          {/* Header - now using relative positioning so all elements scroll together */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            gap="2rem"
            id="header"
            position="relative" // Changed from having fixed positioning on logo
          >
            {/* Left: JARRAD */}
            <Box flex="1" height="120px" zIndex={1}>
              <Box height="150px">
                <VideoMaskedText text="JARRAD" height="100%" />
              </Box>
            </Box>

            {/* Center: Logo - now uses absolute positioning within the relative header */}
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              width="400px"
              height="200px"
              zIndex={2}
            >
              <VideoMaskedLogo />
            </Box>

            {/* Right: WRIGLEY */}
            <Box flex="1" height="120px" zIndex={1}>
              <Box height="150px">
                <VideoMaskedText text="WRIGLEY" height="100%" />
              </Box>
            </Box>
          </Box>

          {/* Demo section showing different sizes */}
          <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            marginTop="2rem"
          >
            {/* <Box as="h2" color="white" fontSize="1.5rem">
              Different Container Sizes:
            </Box> */}

            <HStack
              alignItems="center"
              justifyContent="space-between"
              px="6rem"
            >
              <HStack
                color="white"
                fontFamily="nimbus"
                fontSize="17px"
                // lineHeight='28px'
                gap="2rem"
                alignItems="center"
                justifyContent="space-between"
              >
                <Link>
                  <Text>HOME</Text>
                </Link>

                <Link>
                  <Text>TOUR DATES</Text>
                </Link>

                <Link>
                  <Text>ABOUT</Text>
                </Link>

                <Link>
                  <Text>EPK</Text>
                </Link>

                <Link>
                  <Text>CONTACT</Text>
                </Link>

                <Link>
                  <Text>SHOP</Text>
                </Link>

                <Link>
                  <Text>BLOG</Text>
                </Link>
              </HStack>
              <HStack>
                <Image
                  src="/assets/icons/spotify.svg"
                  alt="spotify"
                  h="3rem"
                  w="auto"
                />
              </HStack>
              <HStack></HStack>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
