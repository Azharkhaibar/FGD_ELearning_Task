"use client"
import { Box, Button, Icon } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import NextLink from 'next/link';

const PD2: React.FC = () => {
    return (
        <Box width="100vw" height="100vh" overflow="hidden" position="relative">
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/hdI2bqOjy3c?si=A_acNK0qEHLRt4HB"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <NextLink href="/eprogrammer" passHref>
                <Button
                    position="absolute"
                    top="10px"
                    left="10px"
                    bg="gray.700"
                    color="white"
                    _hover={{ bg: "gray.600" }}
                    leftIcon={<Icon as={FaArrowLeft} />}
                >
                    Back
                </Button>
            </NextLink>
        </Box>
    );
};

export default PD2;
