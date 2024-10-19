"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Heading,
    Text,
    Flex,
    Avatar,
    Icon,
    Button,
    Image,
    useDisclosure,
} from "@chakra-ui/react";
import { FaShare, FaRegBookmark } from "react-icons/fa";
import Navbar from "../components/navbar";
import { FaPeopleGroup } from "react-icons/fa6";
import ProgrammerPict from '../img/programmer.png';
import { IoStatsChartOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { useRouter } from "next/navigation";
import auth from '../components/firebase';
import LoginModal from "../components/loginmodal";
import ShareModal from "../components/sharemodal";

const CourseDetails: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const courseId = "your_course_id"; // Replace with your actual course ID
    const isFavorited = favorites.includes(courseId); // Check if the course is favorited

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleEnroll = () => {
        if (loggedIn) {
            router.push("/eprogrammer");
        } else {
            onOpen(); // Show login modal if not logged in
        }
    };

    const handleToggleFavorite = () => {
        setFavorites((prevFavorites) => {
            const isFavorited = prevFavorites.includes(courseId);
            const updatedFavorites = isFavorited
                ? prevFavorites.filter(id => id !== courseId)
                : [...prevFavorites, courseId];

            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <Box h="100vh" bg="gray.100">
            <Navbar favoriteCount={favorites.length} />
            <Box
                w="100%"
                h="100%"
                mx="auto"
                display="flex"
                alignItems="flex-start"
                flexDirection={{ base: "column", md: "row" }}
                px={{ base: "5%", md: "15%" }}
                mt="2%"
                overflow="hidden"
            >
                <Box
                    w={{ base: "100%", md: "65%" }}
                    bg="white"
                    p={6}
                    borderBottomLeftRadius={{ base: "20px", md: "0" }}
                    borderTopLeftRadius={{ base: "20px", md: "0" }}
                    mb={{ base: "4", md: "0" }} // margin bottom for mobile
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Flex alignItems="center">
                            <Avatar src="/path-to-your-image/programmer.png" />
                            <Text ml={3}>Azhar Khaibar</Text>
                        </Flex>
                        <Flex>
                            <Button
                                leftIcon={<Icon as={FaRegBookmark} />}
                                variant="ghost"
                                mr={4}
                                color={isFavorited ? "red.500" : "black"}
                                onClick={handleToggleFavorite}
                            >
                                Favorite
                            </Button>
                            <Button leftIcon={<Icon as={FaShare} />} bg="purple.300" color="white" onClick={onShareOpen}>
                                Share
                            </Button>
                        </Flex>
                    </Flex>

                    <Box display="flex" flexDirection="column" mt="3%">
                        <Heading size={{ base: "lg", md: "xl" }}>Programming Course</Heading>
                        <Box display="flex" alignItems="center" mt="2%">
                            <Icon as={FaPeopleGroup} />
                            <Text ml="1%">0 Enrolled</Text>
                        </Box>
                    </Box>

                    <Box
                        w="100%"
                        h="auto"
                        p={1}
                        borderRadius="md"
                        bg="white"
                        overflow="hidden"
                        mt="2%"
                    >
                        <Image
                            src={ProgrammerPict.src}
                            alt="Programmer Image"
                            w="100%"
                            h={{ base: "300px", md: "450px" }} // responsive height
                            objectFit="cover"
                            borderRadius="md"
                        />

                        <Box mt={4} p={2}>
                            <Heading as="h4" size="md" mb={2}>Programming Course</Heading>
                            <Text color="gray.600">
                                This is a sample text describing the content of the card. It's a dummy text from the printing and typesetting industry.
                            </Text>
                        </Box>
                    </Box>
                </Box>

                <Box
                    w={{ base: "100%", md: "35%" }}
                    bg="white"
                    borderTopRightRadius={{ base: "20px", md: "0" }}
                    borderBottomRightRadius={{ base: "20px" }}
                >
                    <Box display="flex" flexDirection="column" p="26px" w="100%" bg="gray.50">
                        <Heading size="lg" mb={4} textAlign="left">Free</Heading>

                        <Text
                            p="10px"
                            bg="purple.300"
                            textAlign="center"
                            borderRadius="md"
                            cursor="pointer"
                            _hover={{ bg: "purple.400" }}
                            color="white"
                            mb={4}
                            onClick={handleEnroll}
                        >
                            Enroll Now
                        </Text>

                        <Text opacity="0.6" textAlign="center">Free Access to This Course</Text>
                    </Box>

                    <Box display="flex" p="26px" w="100%" bg="gray.200" flexDirection="column">
                        <Flex alignItems="center" mb={4}>
                            <Icon as={IoStatsChartOutline} boxSize={6} />
                            <Text ml="2" fontSize="lg">Beginner</Text>
                        </Flex>

                        <Flex alignItems="center">
                            <Icon as={PiStudent} boxSize={6} />
                            <Text ml="2" fontSize="lg">0 Total Enrolled</Text>
                        </Flex>
                    </Box>
                </Box>
            </Box>

            <LoginModal isOpen={isOpen} onClose={onClose} />
            <ShareModal isOpen={isShareOpen} onClose={onShareClose} pageUrl={pageUrl} />
        </Box>
    );
};

export default CourseDetails;