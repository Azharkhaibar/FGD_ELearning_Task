"use client";
import { useState } from "react";
import {
    Box,
    Text,
    Heading,
    Image,
    Flex,
    Icon,
    Button,
    HStack,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";
import CoursePict from '../img/course.png';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { coursesData } from '../data/coursepage';
import Link from 'next/link'; // Import Link from next/link

const CoursePage: React.FC = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [selectedCategoryName, setSelectedCategoryName] = useState("All");
    const totalCoursesPerPage = 9;

    const indexOfLastCourse = currentPageNumber * totalCoursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - totalCoursesPerPage;

    const filteredCoursesList = selectedCategoryName === "All"
        ? coursesData
        : coursesData.filter(course => course.category === selectedCategoryName);

    const currentCoursesList = filteredCoursesList.slice(indexOfFirstCourse, indexOfLastCourse);

    const handleNextPage = () => {
        if (currentPageNumber < Math.ceil(filteredCoursesList.length / totalCoursesPerPage)) {
            setCurrentPageNumber(currentPageNumber + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPageNumber > 1) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    };

    return (
        <Box w="100%" overflow="hidden" pb={4}>
            <Navbar />
            <Box
                w="100%"
                h={{ base: "30vh", md: "45vh" }}
                position="relative"
                bgImage={CoursePict.src}
                bgSize="cover"
                bgRepeat="no-repeat"
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgColor="rgba(0, 0, 0, 0.5)"
                    zIndex={1}
                />
                <Box position="relative" zIndex={2} color="white" p={4}>
                    <Box display="flex" flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" mx={{ base: "5%", md: "12%" }} my="8%">
                        <Flex alignItems="center">
                            <Heading fontSize={{ base: "40px", md: "90px" }}>Course</Heading>
                        </Flex>
                        <Flex alignItems="center" mt={{ base: 2, md: 0 }}>
                            <Text fontWeight="600">Home</Text>
                            <Icon as={FaArrowRight} ml={2} />
                            <Text ml={2} fontWeight="400">Course</Text>
                        </Flex>
                    </Box>
                </Box>
            </Box>

            {/* Category Filter */}
            <Box
                w={{ base: "90%", md: "40%" }}
                p="25px"
                borderRadius="50px"
                bg="transparent"
                mx="auto"
                mt="3%"
                border="1px solid rgba(0, 0, 0, 0.6)"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-around"
                    flexWrap="wrap"
                >
                    {["All", "Programming", "Business", "Marketing", "Design"].map(category => (
                        <Text
                            key={category}
                            fontSize={{ base: "14px", md: "17px" }}
                            fontWeight="500"
                            cursor="pointer"
                            onClick={() => {
                                setSelectedCategoryName(category);
                                setCurrentPageNumber(1); // Reset to first page when category changes
                            }}
                            color={selectedCategoryName === category ? "purple.500" : "black"} // Highlight selected category
                        >
                            {category}
                        </Text>
                    ))}
                </Flex>
            </Box>

            {/* Course Cards */}
            <Box w="100%" mx="auto" mt="3%" display="flex" justifyContent="center" flexWrap="wrap" gap={{ base: "2%", md: "2%" }}>
                {currentCoursesList.map((course) => (
                    <Box
                        key={course.id} // Use course.id for a unique key
                        w={{ base: "90%", sm: "400px" }}
                        bg="gray.100"
                        borderRadius="15px"
                        display="flex"
                        mb="25px"
                        flexDirection="column"
                        justifyContent="space-between"
                        textAlign="left"
                    >
                        <Box w="100%" h="200px">
                            <Image
                                src={course.image.src}
                                alt={course.name}
                                objectFit="cover"
                                w="100%"
                                h="100%"
                                borderRadius="10px"
                            />
                        </Box>
                        <Box p="25px">
                            <Text fontSize="18px" fontWeight="bold" mb="13px"
                                bg="purple.300"
                                textAlign="center"
                                color="white"
                                borderRadius="25px"
                                w="100px"
                            >
                                {course.price}
                            </Text>
                            <Heading fontSize="24px" fontWeight="600" mb="8px">
                                {course.name}
                            </Heading>
                            <Text fontSize="16px" color="gray.600" mb="15px">
                                {course.description}
                            </Text>
                            {/* Learn More Button */}
                            <Link href={course.href} passHref>
                                <Button
                                    bg="purple.400"
                                    color="white"
                                    variant="solid"
                                    w="full"
                                >
                                    {course.button}
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Pagination Controls */}
            <HStack
                justifyContent="center" // Center the pagination controls
                mt="30px"
                spacing={4} // Adjust spacing to be smaller
                flexDirection={{ base: "column", md: "row" }} // Keep it vertical on mobile, horizontal on larger screens
                w="full"
            >
                <Button
                    onClick={handlePreviousPage}
                    isDisabled={currentPageNumber === 1}
                    colorScheme="purple"
                    variant="solid"
                    leftIcon={<FaArrowLeft />}
                    w={{ base: "100%", md: "120px" }} // Set width for button
                    mb={{ base: 2, md: 0 }} // Margin for mobile view
                >
                    Previous
                </Button>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="purple.100"
                    borderRadius="10px"
                    p="10px 20px"
                    w={{ base: "100%", md: "auto" }} // Full width on mobile, auto on larger screens
                    textAlign={{ base: "center", md: "initial" }} // Center text on mobile
                    mb={{ base: 2, md: 0 }} // Margin for mobile view
                >
                    <Text fontWeight="bold" color="purple.600">
                        Page {currentPageNumber} of {Math.ceil(filteredCoursesList.length / totalCoursesPerPage)}
                    </Text>
                </Box>
                <Button
                    onClick={handleNextPage}
                    isDisabled={currentPageNumber === Math.ceil(filteredCoursesList.length / totalCoursesPerPage)}
                    colorScheme="purple"
                    variant="solid"
                    rightIcon={<FaArrowRight />}
                    w={{ base: "100%", md: "120px" }} // Set width for button
                    mt={{ base: 2, md: 0 }} // Margin for mobile view
                >
                    Next
                </Button>
            </HStack>

        </Box>
    );
}

export default CoursePage;
