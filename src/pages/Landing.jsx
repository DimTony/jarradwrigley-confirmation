// import React, { useState } from "react";
// import {
//   Box,
//   Spinner,
//   VStack,
//   Text,
//   useToast,
//   HStack,
//   Image,
// } from "@chakra-ui/react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import ContractForm from "../components/ContractForm";
// import SuccessfulPage from "../components/SuccessfulPage";
// import PaymentForm from "../components/PaymentForm";
// import pdf from "../assets/MUSIC_PERFORMANCE_AGREEMENT-samarcher12122024.pdf";
// import VideoMaskedLogo from "../components/MaskedLogo";
// import VideoMaskedText from "../components/VideoMaskedText";
// import { Link } from "react-router-dom";
// import ShoppingBadge from "../components/ShoppingBadge";

// const Landing = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentBottom, setCurrentBottom] = useState("form");
//   const [pdfData, setPdfData] = useState(null);
//   const [pictureData, setPictureData] = useState(null);
//   const [step, setStep] = useState(1);
//   const [isPaymentFormLoading, setIsPaymentFormLoading] = useState(false);
//   const toast = useToast();

//   const handlePdfUpload = (data) => {
//     setPdfData(data); // Store the uploaded PDF data
//   };

//   const handleSubmit = async () => {
//     if (!pdfData || !pictureData) return; // Ensure both files are available

//     const pdfBlob = await fetch(pdfData).then((res) => res.blob());

//     const formData = new FormData();
//     formData.append("pdf", pdfBlob, "contract.pdf");
//     formData.append("picture", pictureData); // Directly append the file object

//     try {
//       setIsLoading(true);

//       const response = await axios.post(
//         `${import.meta.env.VITE_BaseUrl}/jarrad-wrigley/confirmation/save`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Important for sending files
//           },
//         }
//       );

//       if (response.status === 201) {
//         toast({
//           title: "Contract & Receipt Submitted Successfully",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//           position: "top-right",
//         });
//         setStep(3);
//       } else {
//         toast({
//           title: "Error submitting form",
//           description: "Please try again later.",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//           position: "top-right",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form", error);

//       // Set a timeout for 3 seconds before showing the error toast
//       await new Promise((resolve) => setTimeout(resolve, 3000));

//       toast({
//         title: "Error submitting form",
//         description: "Please try again later.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top-right",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDone = () => {
//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       setCurrentBottom("done");
//     }, 3000);
//   };

//   let content;

//   switch (currentBottom) {
//     case "form":
//       content = (
//         <ContractForm
//           setCurrentBottom={setCurrentBottom}
//           onFileUpload={handlePdfUpload}
//           pdfData={pdfData}
//         />
//       );
//       break;

//     case "payment":
//       content = (
//         <PaymentForm
//           handleSubmit={handleSubmit}
//           handleDone={handleDone}
//           setCurrentBottom={setCurrentBottom}
//           pictureData={pictureData}
//           setPictureData={setPictureData}
//           step={step}
//           setStep={setStep}
//           isPaymentFormLoading={isPaymentFormLoading}
//           setIsPaymentFormLoading={setIsPaymentFormLoading}
//         />
//       );
//       break;

//     case "done":
//       content = <SuccessfulPage />;
//       break;

//     default:
//       content = (
//         <ContractForm
//           setCurrentBottom={setCurrentBottom}
//           onFileUpload={handlePdfUpload}
//           pdfData={pdfData}
//         />
//       );
//       break;
//   }

//   const labelStyle = {
//     color: "#888",
//     fontSize: "0.9rem",
//     marginBottom: "0.5rem",
//     textAlign: "center",
//   };

//   const sectionStyle = {
//     textAlign: "center",
//   };

//   return (
 
//     <>
    

//       <Box height="100vh" overflowY="auto" backgroundColor="black">
//         <Box
//           display="flex"
//           flexDirection="column"
//           minHeight="100%"
//           padding="2rem"
//           gap="1.5rem"
//         >
//           {/* Header */}
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="space-between"
//             width="100%"
//             gap="2rem"
//             id="header"
//             position="relative" // Changed from having fixed positioning on logo
//           >
//             {/* Left: JARRAD */}
//             <Box flex="1" height="120px" zIndex={1}>
//               <Box height="150px">
//                 <VideoMaskedText text="JARRAD" height="100%" />
//               </Box>
//             </Box>

//             {/* Center: Logo - now uses absolute positioning within the relative header */}
//             <Box
//               position="absolute"
//               left="50%"
//               top="50%"
//               transform="translate(-50%, -50%)"
//               width="400px"
//               height="200px"
//               zIndex={2}
//             >
//               <VideoMaskedLogo />
//             </Box>

//             {/* Right: WRIGLEY */}
//             <Box flex="1" height="120px" zIndex={1}>
//               <Box height="150px">
//                 <VideoMaskedText text="WRIGLEY" height="100%" />
//               </Box>
//             </Box>
//           </Box>

          
//           <Box
//             display="flex"
//             flexDirection="column"
//             gap="1rem"
//             marginTop="2rem"
//           >
//             {/* <Box as="h2" color="white" fontSize="1.5rem">
//               Different Container Sizes:
//             </Box> */}

//             <HStack
//               alignItems="center"
//               justifyContent="space-between"
//               px="6rem"
//             >
//               <HStack
//                 color="white"
//                 fontFamily="nimbus"
//                 fontSize="17px"
//                 // lineHeight='28px'
//                 gap="2rem"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Link>
//                   <Text>HOME</Text>
//                 </Link>

//                 <Link>
//                   <Text>TOUR DATES</Text>
//                 </Link>

//                 <Link>
//                   <Text>ABOUT</Text>
//                 </Link>

//                 <Link>
//                   <Text>EPK</Text>
//                 </Link>

//                 <Link>
//                   <Text>CONTACT</Text>
//                 </Link>

//                 <Link>
//                   <Text>SHOP</Text>
//                 </Link>

//                 <Link>
//                   <Text>BLOG</Text>
//                 </Link>
//               </HStack>
//               <HStack gap="18px">
//                 <Link>
//                   <Image
//                     src="/assets/icons/spotify.svg"
//                     alt="spotify"
//                     h="24px"
//                     w="auto"
//                   />
//                 </Link>

//                 <Link>
//                   <Image
//                     src="/assets/icons/apple-music.svg"
//                     alt="apple-music"
//                     h="24px"
//                     w="auto"
//                   />
//                 </Link>

//                 <Link>
//                   <Image
//                     src="/assets/icons/youtube.svg"
//                     alt="youtube"
//                     h="24px"
//                     w="auto"
//                   />
//                 </Link>

//                 <Link>
//                   <Image
//                     src="/assets/icons/tiktok.svg"
//                     alt="tiktok"
//                     h="24px"
//                     w="auto"
//                   />
//                 </Link>

//                 <Link>
//                   <Image
//                     src="/assets/icons/facebook.svg"
//                     alt="facebook"
//                     h="24px"
//                     w="auto"
//                   />
//                 </Link>
//               </HStack>
//               <HStack color="white" alignItems="center" gap="1rem">
//                 <Link to="/login">
//                   <Text>Log In</Text>
//                 </Link>

//                 <Link to='/cart'>
//                   <ShoppingBadge />
//                 </Link>
//               </HStack>
//             </HStack>
//           </Box>

//           {/* Header */}


//           {/* Content Goes Here */}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Landing;


// Landing.jsx - Updated to only contain page-specific content
import React, { useState } from "react";
import {
  Box,
  Spinner,
  VStack,
  Text,
  useToast,
  HStack,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import ContractForm from "../components/ContractForm";
import SuccessfulPage from "../components/SuccessfulPage";
import PaymentForm from "../components/PaymentForm";
import pdf from "../assets/MUSIC_PERFORMANCE_AGREEMENT-samarcher12122024.pdf";

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
    <Box>
      {/* Only the page-specific content goes here */}
      {content}
    </Box>
  );
};

export default Landing;