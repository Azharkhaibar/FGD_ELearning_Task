"use client";
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Progress, Button, Link, Flex, SimpleGrid, Icon, Circle } from '@chakra-ui/react';
import LoginModal from '../components/loginmodal';
import auth from '../components/firebase';
import BusinessPict from '../img/b2.png';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../components/navbar';

const businessLessons = [
    { id: 1, title: 'Dasar-dasar Manajemen', type: 'video', completed: false, videoUrl: 'https://www.example.com/video1', quizUrl: '/quiz/1' },
    { id: 2, title: 'Strategi Pemasaran Digital', type: 'video', completed: false, videoUrl: 'https://www.example.com/video2', quizUrl: '/quiz/2' },
    { id: 3, title: 'Analisis Keuangan untuk Pemula', type: 'pdf', completed: false, pdfUrl: 'https://www.example.com/pdf1.pdf', quizUrl: '/quiz/3' },
    { id: 4, title: 'Pengembangan Bisnis', type: 'video', completed: false, videoUrl: 'https://www.example.com/video3', quizUrl: '/quiz/4' },
    { id: 5, title: 'Proyek Akhir Bisnis', type: 'pdf', completed: false, pdfUrl: 'https://www.example.com/pdf2.pdf', quizUrl: '/quiz/5' },
];

export default function Ebusiness() {
    const [progress, setProgress] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleOpenLogin = () => setIsOpen(true);
    const handleCloseLogin = () => setIsOpen(false);

    const handleCompleteLesson = (lessonId) => {
        const updatedLessons = businessLessons.map((lesson) => {
            if (lesson.id === lessonId) {
                lesson.completed = true;
            }
            return lesson;
        });

        const completedCount = updatedLessons.filter((lesson) => lesson.completed).length;
        setProgress((completedCount / updatedLessons.length) * 100);
    };

    return (
        <Box>
            <Navbar />
            {isLoggedIn ? (
                <>
                    <Box
                        w="100%"
                        h={{ base: "40vh", md: "60vh" }} // Responsive height
                        backgroundImage={`url(${BusinessPict.src})`} // Replace with your image
                        backgroundSize="cover"
                        backgroundPosition="center"
                    >
                        <Flex
                            h="100%"
                            align="center"
                            justify="center"
                            textAlign="center"
                            color="white"
                            p={{ base: 4, md: 8 }} // Responsive padding
                        >
                            <Box>
                                <Heading as="h1" fontSize={{ base: "40px", md: "70px" }} mb={4}>
                                    Kursus Bisnis
                                </Heading>
                                <Text fontSize={{ base: "md", md: "lg" }}>
                                    Pelajari konsep-konsep bisnis dan tingkatkan keterampilan Anda di dunia bisnis.
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Heading as="h2" size="lg" mb={3} textAlign="center" mt="4%">
                        Daftar Pelajaran
                    </Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} p={5}>
                        {businessLessons.map((lesson) => (
                            <Box
                                key={lesson.id}
                                borderWidth={1}
                                borderRadius="md"
                                p={5}
                                bg="white"
                                boxShadow="md"
                                transition="0.3s"
                                _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
                            >
                                <Text fontWeight="bold" fontSize="lg">{lesson.title}</Text>
                                <Text color="gray.500">{lesson.type === 'video' ? 'Video' : 'Dokumen PDF'}</Text>

                                {lesson.type === 'video' && (
                                    <Link href={lesson.videoUrl} color="teal.500" isExternal mt={2}>
                                        Tonton Video
                                    </Link>
                                )}

                                {lesson.type === 'pdf' && (
                                    <Link href={lesson.pdfUrl} color="teal.500" isExternal mt={2}>
                                        Unduh Materi PDF
                                    </Link>
                                )}

                                <Link href={lesson.quizUrl} color="blue.500" mt={2} display="block">
                                    Akses Kuis
                                </Link>

                                {!lesson.completed ? (
                                    <Button onClick={() => handleCompleteLesson(lesson.id)} mt={4} colorScheme="teal" width="full">
                                        Tandai sebagai selesai
                                    </Button>
                                ) : (
                                    <Text color="green.500" mt={4}>Selesai</Text>
                                )}
                            </Box>
                        ))}
                    </SimpleGrid>

                    <Box mt={6} textAlign="center">
                        <Text fontWeight="bold" fontSize="xl">Progress Anda:</Text>
                        <Flex align="center" justify="center" mt={2} position="relative">
                            <Box width={{ base: "90%", md: "80%" }} position="relative">
                                <Progress
                                    value={progress}
                                    size="lg"
                                    borderRadius="full"
                                    colorScheme="teal"
                                    sx={{
                                        bg: 'gray.200',
                                        '::before': {
                                            background: `linear-gradient(to right, teal, lightgreen)`,
                                            borderRadius: 'full',
                                            transition: 'width 0.5s ease-in-out'
                                        }
                                    }}
                                />
                                <Circle size="60px" bg="white" boxShadow="md" position="absolute" top="-15px" left="50%" transform="translateX(-50%)">
                                    <Text fontSize="lg" fontWeight="bold">{`${Math.round(progress)}%`}</Text>
                                </Circle>
                            </Box>

                            {progress === 100 && (
                                <Icon as={FaCheckCircle} color="green.500" boxSize={8} position="absolute" top="50%" left="90%" transform="translate(-50%, -50%)" />
                            )}
                        </Flex>
                    </Box>
                </>
            ) : (
                <VStack spacing={4} align="center" p={5}>
                    <Text fontSize={{ base: "md", md: "lg" }} mb={4}>
                        Konten ini terkunci. Silakan login untuk mengakses kursus.
                    </Text>
                    <Button onClick={handleOpenLogin} colorScheme="teal" size="lg" width="full">
                        Login
                    </Button>
                    <Text>atau</Text>
                    <Button as="a" href="/register" colorScheme="purple" size="lg" width="full">
                        Bergabung untuk gratis
                    </Button>
                </VStack>
            )}

            <LoginModal isOpen={isOpen} onClose={handleCloseLogin} />
        </Box>
    );
}
