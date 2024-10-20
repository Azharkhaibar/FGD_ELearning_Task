"use client";
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Progress, Button, Link, Flex, SimpleGrid, Icon, Circle } from '@chakra-ui/react';
import LoginModal from '../components/loginmodal';
import { User } from "firebase/auth";
import auth from '../components/firebase';
import ProgrammerPict from '../img/programmer.png';
import Navbar from '../components/navbar';
import { FaCheckCircle } from 'react-icons/fa';

const lessonList = [
    { id: 1, title: 'Pengantar Pemrograman', type: 'video', completed: false, videoUrl: '/pd1', pdfUrl: 'https://www.example.com/pdf1.pdf', quizUrl: '/quiz1' },
    { id: 2, title: 'Dasar-dasar JavaScript', type: 'video', completed: false, videoUrl: '/pd2', pdfUrl: 'https://www.example.com/pdf2.pdf', quizUrl: '/quiz2' },
    { id: 3, title: 'Pemrograman Berorientasi Objek', type: 'pdf', completed: false, pdfUrl: 'https://pustaka.ut.ac.id/lib/wp-content/uploads/pdfmk/MSIM4301-M1A.pdf', quizUrl: '/quiz/3' },
    { id: 4, title: 'Asynchronous JavaScript', type: 'video', completed: false, videoUrl: 'https://www.example.com/video4', pdfUrl: 'https://www.example.com/pdf4.pdf', quizUrl: '/quiz/4' },
    { id: 5, title: 'Proyek Akhir', type: 'pdf', completed: false, pdfUrl: 'https://www.example.com/pdf5.pdf', quizUrl: '/quiz/5' },
];

export default function Eprogrammer() {
    const [prog, setProg] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [warnMsg, setWarnMsg] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleLoginOpen = () => setModalOpen(true);
    const handleLoginClose = () => setModalOpen(false);

    const handleLessonComplete = (lessonId) => {
        const currentIndex = lessonList.findIndex(lesson => lesson.id === lessonId);
        if (currentIndex > 0 && !lessonList[currentIndex - 1].completed) {
            setWarnMsg("Selesaikan pelajaran sebelumnya terlebih dahulu.");
            return;
        } else {
            setWarnMsg("");
        }

        const updatedLessons = lessonList.map((lesson) => {
            if (lesson.id === lessonId) {
                lesson.completed = true;
            }
            return lesson;
        });

        const completedCount = updatedLessons.filter((lesson) => lesson.completed).length;
        setProg((completedCount / updatedLessons.length) * 100);
    };

    return (
        <Box>
            <Navbar />
            {loggedIn ? (
                <>
                    <Box
                        w="100%"
                        h={{ base: "40vh", md: "60vh" }}
                        backgroundImage={`url(${ProgrammerPict.src})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                    >
                        <Flex
                            h="100%"
                            align="center"
                            justify="center"
                            textAlign="center"
                            color="white"
                            p={{ base: 4, md: 8 }}
                        >
                            <Box>
                                <Heading as="h1" fontSize={{ base: "40px", md: "70px" }} mb={4}>Kursus Pemrograman</Heading>
                                <Text fontSize={{ base: "md", md: "lg" }}>
                                    Pelajari dasar-dasar pemrograman dan tingkatkan keterampilan Anda di dunia teknologi.
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Heading as="h2" size="lg" mb={3} textAlign="center" mt="4%">
                        Daftar Pelajaran
                    </Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} p={5}>
                        {lessonList.map((lesson, index) => (
                            <Box
                                key={lesson.id}
                                borderWidth={1}
                                borderRadius="md"
                                p={5}
                                bg="white"
                                boxShadow="md"
                                transition="0.3s"
                                _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
                                opacity={lesson.completed ? 1 : 0.6}
                            >
                                <Text fontWeight="bold" fontSize="lg">{`${index + 1}. ${lesson.title}`}</Text>
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
                                    <Button
                                        onClick={() => handleLessonComplete(lesson.id)}
                                        mt={4}
                                        colorScheme="teal"
                                        isDisabled={index > 0 && !lessonList[index - 1].completed}
                                        width="full"
                                    >
                                        Tandai sebagai selesai
                                    </Button>
                                ) : (
                                    <Text color="green.500" mt={4}>Selesai</Text>
                                )}
                            </Box>
                        ))}
                    </SimpleGrid>

                    {warnMsg && (
                        <Box
                            bg="red.100"
                            borderRadius="md"
                            p={4}
                            mt={4}
                            border="1px solid"
                            borderColor="red.400"
                            color="red.800"
                        >
                            <Text>{warnMsg}</Text>
                        </Box>
                    )}

                    <Box mt={6} textAlign="center">
                        <Text fontWeight="bold" fontSize="xl">Progress Anda:</Text>
                        <Flex align="center" justify="center" mt={2} position="relative">
                            <Box width={{ base: "90%", md: "80%" }} position="relative">
                                <Progress
                                    value={prog}
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
                                    <Text fontSize="lg" fontWeight="bold">{`${Math.round(prog)}%`}</Text>
                                </Circle>
                            </Box>

                            {prog === 100 && (
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
                    <Button onClick={handleLoginOpen} colorScheme="teal" size="lg" width="full">
                        Login
                    </Button>
                    <Text>atau</Text>
                    <Button as="a" href="/register" colorScheme="purple" size="lg" width="full">
                        Bergabung untuk gratis
                    </Button>
                </VStack>
            )}

            <LoginModal isOpen={modalOpen} onClose={handleLoginClose} />
        </Box>
    );
}
