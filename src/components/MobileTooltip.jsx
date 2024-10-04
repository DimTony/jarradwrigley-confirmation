/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useMediaQuery,
  Text,
  VStack,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

const MobileQuestionTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 48em)");

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <IconButton
          icon={<QuestionIcon />}
          onClick={handleToggle}
          variant="link"
          colorScheme="blue"
          size={isMobile ? "md" : "sm"}
          aria-label="Show transfer instructions"
        />
      </PopoverTrigger>
      <PopoverContent width="300px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody padding={4}>
          <Box>
            <Text fontWeight="bold">
              Please transfer using PayPal's 'Friends and Family' option:
            </Text>
            <Text>1. Log in to your PayPal account.</Text>
            <Text>
              2. Make sure you have the amount to be paid available in your
              PayPal balance.
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MobileQuestionTooltip;
