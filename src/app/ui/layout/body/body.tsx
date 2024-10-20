"use client";
import React from 'react';
import {
    Box,
    Text,
    Heading,
    Icon,
    VStack,
    Flex,
    SimpleGrid,
    useBreakpointValue
} from '@chakra-ui/react';
import { FaLaptopCode, FaBusinessTime } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Ecourse as CourseData } from '@/app/data/course';
import DataFact from '@/app/components/datacalculate';
import DiscoverCourse from '@/app/components/discovercourse';
import NextLink from 'next/link';
import FreeCourse from '@/app/components/freecourse';
import Footer from '../footer/footer';

export default function Body() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 }), // Responsif
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
    };

    const selectIcon = (courseType: string) => {
        switch (courseType.toLowerCase()) {
            case "programming":
                return FaLaptopCode;
            case "business":
                return FaBusinessTime;
            default:
                return FaLaptopCode;
        }
    };

    return (
        <Box w="100%" bg="gray.50" py={10}>
            <Heading textAlign="center" mb={8} fontSize={{ base: 'xl', md: '2xl' }}>
                Explore Our E-Courses
            </Heading>
            <Box w={{ base: "90%", md: "80%", lg: "70%" }} h={{ base: "35vh", md: "35vh"}} mx="auto">
                <Slider {...sliderSettings}>
                    {CourseData.map((course, idx) => (
                        <NextLink key={idx} href={course.href} passHref>
                            <Box
                                p={4}
                                bg="white"
                                borderRadius="lg"
                                boxShadow="md"
                                _hover={{ boxShadow: "lg", transition: "0.2s" }} 
                                mx={2} 
                                mb={4}
                            >
                                <VStack spacing={4}>
                                    <Box p="18px" bg="gray.200" borderRadius="full" mx="auto">
                                        <Icon as={selectIcon(course.name_course)} boxSize={12} color="purple.400" />
                                    </Box>
                                    <Heading size="md" textAlign="center">{course.name_course}</Heading>
                                    <Text color="gray.500" textAlign="center">{course.time}</Text>
                                    <Flex justifyContent="center" alignItems="center">
                                        <Text fontWeight="bold" color="green.600">{course.amount_course}</Text>
                                        <Text color="gray.500" ml={1}>Courses</Text>
                                    </Flex>
                                </VStack>
                            </Box>
                        </NextLink>
                    ))}
                </Slider>
            </Box>
            <DataFact />
            <FreeCourse />
            <Footer />
        </Box>
    );
}
