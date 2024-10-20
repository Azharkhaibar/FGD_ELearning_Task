"use client";
import { Box, Heading, Text, Input, Button, Flex, VStack, useToast } from "@chakra-ui/react";
import CourseFree from '../img/freecourse.png';
import { useCourseForm } from "../lib/hooks/formcoursehooks";
import { SendDataFreeCourse } from "../lib/api/formcourse";

const FreeCourse = () => {
    const { name, setName, email, setEmail, phoneNumber, setPhoneNumber, ResetCourseForm } = useCourseForm();
    const toast = useToast();

    const handleSubmit = async () => {
        if (!name || !email || !phoneNumber) {
            toast({
                title: "Error",
                description: "All fields are required.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        console.log("Sending data:", { name, email, phoneNumber }); // Debug log

        try {
            await SendDataFreeCourse(name, email, phoneNumber);
            toast({
                title: "Success",
                description: "You have successfully registered!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            ResetCourseForm();
        } catch (error) {
            console.error("Error sending data:", error);
            toast({
                title: "Error",
                description: "Failed to register. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box w="100%" h={{ base: "auto", md: "70vh" }} position="relative" bgImage={CourseFree.src} bgRepeat="no-repeat" bgSize="cover">
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgColor="rgba(0, 0, 0, 0.5)"
                zIndex={1}
            />
            <Flex direction={{ base: "column", md: "row" }} zIndex={2} alignItems="center" justifyContent="space-between" height="100%">
                <Box
                    w={{ base: "90%", md: "50%" }}
                    h="100%"
                    borderRadius="md"
                    boxShadow="lg"
                    p={6}
                    zIndex={2}
                    color="black"
                    mx="auto"
                    my={{ base: 4, md: 0 }} // Add margin on mobile
                >
                    <Box
                        w={{ base: "100%", md: "450px" }}
                        h={{ base: "auto", md: "500px" }}
                        bg="rgba(255, 255, 255, 0.3)"
                        backdropFilter="blur(10px)"
                        borderRadius="md"
                        mx="auto"
                        my="8%"
                        boxShadow="lg"
                    >
                        <Text size="lg" p="10px" bg="rgba(255, 255, 255, 0.6)" textAlign="center" borderRadius="md" color="black" fontWeight="700">Online Course For Free</Text>
                        <Box mt={4} p={{ base: "15px", md: "25px" }}>
                            <Heading fontSize={{ base: "24px", md: "28px" }} textAlign="center" color="white">Start My Free Month</Heading>
                            <Text textAlign="center" mb={6} color="white" fontSize={{ base: "sm", md: "md" }}>Stay Sharp. Get ahead with Learning Paths.</Text>
                            <VStack spacing={4}>
                                <Input
                                    placeholder="Your Name"
                                    mb={3}
                                    color="white"
                                    _placeholder={{ color: 'white' }}
                                    borderColor="white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    placeholder="Your Email Address"
                                    type="email"
                                    mb={3}
                                    color="white"
                                    _placeholder={{ color: 'white' }}
                                    borderColor="white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    placeholder="Your Phone Number"
                                    type="tel"
                                    mb={4}
                                    color="white"
                                    _placeholder={{ color: 'white' }}
                                    borderColor="white"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <Button colorScheme="teal" width="full" w="150px" onClick={handleSubmit}>Apply</Button>
                            </VStack>
                        </Box>
                    </Box>
                </Box>

                <Box position="relative" zIndex={2} color="white" w={{ base: "90%", md: "50%" }} mx="auto" pr={{ base: 0, md: "14%" }} my={{ base: 4, md: 0 }}> {/* Add margin on mobile */}
                    <Heading color="white" fontSize={{ base: "28px", md: "32px" }} mb={4}>Limitless Learning Possibilities</Heading>
                    <Text mt={4} mb={6} fontSize={{ base: "sm", md: "lg" }} lineHeight="1.6"> {/* Adjust line height for better readability */}
                        Lorem Ipsum gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum
                        auci elit consequat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus
                        a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt aucto.
                    </Text>

                    <Heading color="white" fontSize={{ base: "24px", md: "28px" }} mb={2}>Join Free Now!</Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} lineHeight="1.6"> {/* Adjust line height for better readability */}
                        Per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condntum sit
                        amet a augue. Sed non mauris vitae erat consequat auctor eu in elit. Class aptento taciti
                        sociosqu ad litora torquent.
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default FreeCourse;
