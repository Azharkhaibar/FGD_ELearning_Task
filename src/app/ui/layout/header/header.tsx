"use client"
import React from 'react';
import { Box, Text, Heading, Flex, Button, useBreakpointValue } from '@chakra-ui/react';
import StudyPict from '../../../img/study.png';
import Navbar from '@/app/components/navbar';
import SEO from '@/app/seo/SEO';

const Header: React.FC = () => {
    const headingFontSize = useBreakpointValue({ base: "30px", md: "80px", lg: "80px" });
    const buttonFontSize = useBreakpointValue({ base: "14px", md: "16px", lg: "18px" });

    return (
        <>
            <SEO
                title="Online Study is Now Much Easier"
                description="Discover how easy it is to learn anything online."
                keywords="online learning, study, education"
                image={StudyPict.src}
            />
            <Box w="100%" h={{ base: "60vh", md: "80vh", lg: "90vh" }} bgImage={StudyPict.src} bgRepeat="no-repeat" bgSize="cover" zIndex={0} pos="relative">
                <Box w="100%" h="100%" bg="black" opacity="0.3" zIndex={-1} pos="absolute"></Box>
                <Navbar />
                <Flex
                    w="100%"
                    h="100%"
                    direction="column"
                    mt={{ base: "40%", md: "10%", lg: "13%" }}
                    align="center"
                    textAlign="center"
                    px={{ base: "4%", md: "10%" }}
                >
                    <Text fontSize={{ base: "md", md: "lg" }} mb="1" color="gray.200" zIndex="99">
                        Learn Anything Online
                    </Text>
                    <Heading fontSize={headingFontSize} mb="4" color="white" zIndex="99">
                        Online Study is Now<br /> Much Easier
                    </Heading>
                    <Button
                        p={{ base: "12px", md: "32px" }}
                        mt="2%"
                        zIndex="99"
                        fontSize={buttonFontSize}
                        w={{ base: "160px", md: "200px", lg: "260px" }}
                        bg="purple.300"
                        borderRadius="md"
                        fontWeight="bold"
                        color="white"
                        cursor="pointer"
                        _hover={{ bg: "purple.400" }}
                    >
                        Discover more
                    </Button>
                </Flex>
            </Box>
        </>
    );
};

export default Header;
