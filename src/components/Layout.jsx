import React from "react";
import { Box, HStack, Text, Image } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import VideoMaskedLogo from "../components/MaskedLogo";
import VideoMaskedText from "../components/VideoMaskedText";
import ShoppingBadge from "../components/ShoppingBadge";

const Layout = () => {
  return (
    <Box height="100vh" overflowY="auto" backgroundColor="black">
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100%"
        padding="2rem"
        gap="1.5rem"
      >
        {/* Static Header - This will remain on all pages */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          gap="2rem"
          id="header"
          position="relative"
        >
          {/* Left: JARRAD */}
          <Box flex="1" height="120px" zIndex={1}>
            <Box height="150px">
              <VideoMaskedText text="JARRAD" height="100%" />
            </Box>
          </Box>

          {/* Center: Logo */}
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

        {/* Navigation Bar - Also static */}
        <Box display="flex" flexDirection="column" gap="1rem" marginTop="2rem">
          <HStack alignItems="center" justifyContent="space-between" px="6rem">
            <HStack
              color="white"
              fontFamily="nimbus"
              fontSize="17px"
              gap="2rem"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link to="/">
                <Text>HOME</Text>
              </Link>

              <Link to="/tour-dates">
                <Text>TOUR DATES</Text>
              </Link>

              <Link to="/about">
                <Text>ABOUT</Text>
              </Link>

              <Link to="/epk">
                <Text>EPK</Text>
              </Link>

              <Link to="/contact">
                <Text>CONTACT</Text>
              </Link>

              <Link to="/shop">
                <Text>SHOP</Text>
              </Link>

              <Link to="/blog">
                <Text>BLOG</Text>
              </Link>
            </HStack>

            <HStack gap="18px">
              <Link>
                <Image
                  src="/assets/icons/spotify.svg"
                  alt="spotify"
                  h="24px"
                  w="auto"
                />
              </Link>

              <Link>
                <Image
                  src="/assets/icons/apple-music.svg"
                  alt="apple-music"
                  h="24px"
                  w="auto"
                />
              </Link>

              <Link>
                <Image
                  src="/assets/icons/youtube.svg"
                  alt="youtube"
                  h="24px"
                  w="auto"
                />
              </Link>

              <Link>
                <Image
                  src="/assets/icons/tiktok.svg"
                  alt="tiktok"
                  h="24px"
                  w="auto"
                />
              </Link>

              <Link>
                <Image
                  src="/assets/icons/facebook.svg"
                  alt="facebook"
                  h="24px"
                  w="auto"
                />
              </Link>
            </HStack>

            <HStack color="white" alignItems="center" gap="1rem">
              <Link to="/login">
                <Text>Log In</Text>
              </Link>

              <Link to="/cart">
                <ShoppingBadge />
              </Link>
            </HStack>
          </HStack>
        </Box>

        {/* Dynamic Content Area - This is where page content will change */}
        <Box flex="1" overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
