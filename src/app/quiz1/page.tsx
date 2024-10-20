"use client";
import { useState } from 'react';
import { Box, Button, Radio, RadioGroup, Stack, Text, Progress, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

interface QuizQuestion {
    questionText: string;
    answerOptions: string[];
    correctAnswerIndex: number; 
}

const quizQuestions: QuizQuestion[] = [
    {
        questionText: "Apa itu variabel dalam pemrograman?",
        answerOptions: [
            "Struktur kontrol alur program",
            "Penyimpanan untuk nilai data",
            "Metode untuk mencetak data",
            "Jenis bahasa pemrograman"
        ],
        correctAnswerIndex: 1,
    },
    {
        questionText: "Bahasa pemrograman apa yang digunakan untuk pengembangan web front-end?",
        answerOptions: ["Python", "JavaScript", "Java", "C++"],
        correctAnswerIndex: 1,
    },
    {
        questionText: "Apa output dari `console.log(2 + 3)` dalam JavaScript?",
        answerOptions: ["5", "23", "Error", "NaN"],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa itu loop dalam pemrograman?",
        answerOptions: [
            "Struktur yang digunakan untuk menyimpan data",
            "Metode untuk mengulang blok kode",
            "Kondisi yang mengevaluasi ekspresi",
            "Fungsi untuk menghapus data"
        ],
        correctAnswerIndex: 1,
    },
    {
        questionText: "Apa itu fungsi dalam pemrograman?",
        answerOptions: [
            "Blok kode yang bisa digunakan kembali",
            "Struktur untuk menyimpan nilai",
            "Struktur kontrol keputusan",
            "Tipe data khusus"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa itu array dalam pemrograman?",
        answerOptions: [
            "Tipe data yang menyimpan satu nilai",
            "Tipe data yang menyimpan beberapa nilai",
            "Metode untuk mengubah data",
            "Fungsi untuk menampilkan data"
        ],
        correctAnswerIndex: 1,
    },
    {
        questionText: "Apa perbedaan antara '==' dan '===' dalam JavaScript?",
        answerOptions: [
            "'==' membandingkan nilai, '===' membandingkan tipe data",
            "'==' dan '===' sama",
            "'==' adalah operator logika, '===' adalah operator aritmatika",
            "Tidak ada perbedaan"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa itu objek dalam pemrograman?",
        answerOptions: [
            "Tipe data yang menyimpan beberapa nilai dengan properti dan nilai",
            "Fungsi yang digunakan untuk mencetak data",
            "Struktur kontrol alur program",
            "Metode untuk menyimpan data"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa itu promise dalam JavaScript?",
        answerOptions: [
            "Nilai yang akan tersedia di masa depan",
            "Fungsi untuk menghentikan eksekusi",
            "Metode untuk mendeklarasikan variabel",
            "Struktur untuk menyimpan data"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa yang dilakukan perintah 'return' dalam fungsi?",
        answerOptions: [
            "Menghentikan fungsi",
            "Mengembalikan nilai dari fungsi",
            "Mencetak nilai ke konsol",
            "Tidak melakukan apa-apa"
        ],
        correctAnswerIndex: 1,
    },
];

const QuizComponent: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1));
    const [finalScore, setFinalScore] = useState<number | null>(null);
    const [hasAnsweredCurrentQuestion, setHasAnsweredCurrentQuestion] = useState(false);

    const handleAnswerSelection = (selectedAnswerIndex: number) => {
        if (!hasAnsweredCurrentQuestion) {
            const updatedAnswers = [...userAnswers];
            updatedAnswers[currentQuestionIndex] = selectedAnswerIndex;
            setUserAnswers(updatedAnswers);
            setHasAnsweredCurrentQuestion(true);
        }
    };

    const computeFinalScore = () => {
        const calculatedScore = userAnswers.reduce((Accumulation, answer, index) => {
            return answer === quizQuestions[index].correctAnswerIndex ? Accumulation + 1 : Accumulation;
        }, 0);
        setFinalScore(calculatedScore);
    };

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setHasAnsweredCurrentQuestion(false);
        }
    };

    const moveToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setHasAnsweredCurrentQuestion(false);
        }
    };

    return (
        <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.100">
            <Box bg="white" p={8} rounded="lg" shadow="xl" width="600px" maxW="90%">
                <NextLink href="/eprogrammer" passHref>
                    <Button position="absolute" top="10px" left="10px" bg="teal.600" color="white" _hover={{ bg: "teal.500" }} transition="background-color 0.3s">
                        Back
                    </Button>
                </NextLink>

                {finalScore !== null ? (
                    <Box textAlign="center">
                        <Heading as="h2" size="lg" mb={4}>
                            Kuis Selesai!
                        </Heading>
                        <Text fontSize="xl" mt={4}>
                            Skor Kamu: {finalScore}/{quizQuestions.length}
                        </Text>
                        <Button mt={6} colorScheme="teal" onClick={() => setFinalScore(null)} transition="transform 0.2s" _hover={{ transform: "scale(1.05)" }}>
                            Coba Lagi
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Text fontSize="xl" fontWeight="bold" mb={4}>
                            {quizQuestions[currentQuestionIndex].questionText}
                        </Text>
                        <RadioGroup
                            mt={4}
                            onChange={(value) => handleAnswerSelection(parseInt(value))}
                            value={userAnswers[currentQuestionIndex] !== -1 ? userAnswers[currentQuestionIndex].toString() : ''}
                        >
                            <Stack direction="column">
                                {quizQuestions[currentQuestionIndex].answerOptions.map((option, index) => (
                                    <Radio
                                        key={index}
                                        value={index.toString()}
                                        isDisabled={hasAnsweredCurrentQuestion}
                                        borderColor="gray.300"
                                        _hover={{ borderColor: "teal.500" }}
                                        bgColor={
                                            hasAnsweredCurrentQuestion && userAnswers[currentQuestionIndex] === index && index !== quizQuestions[currentQuestionIndex].correctAnswerIndex
                                                ? 'red.200'
                                                : hasAnsweredCurrentQuestion && index === quizQuestions[currentQuestionIndex].correctAnswerIndex
                                                    ? 'green.200'
                                                    : 'transparent'
                                        }
                                        transition="background-color 0.2s"
                                    >
                                        {option}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>

                        <Box mt={6} display="flex" justifyContent="space-between">
                            <Button onClick={moveToPreviousQuestion} disabled={currentQuestionIndex === 0} colorScheme="gray" transition="transform 0.2s" _hover={{ transform: "scale(1.05)" }}>
                                Sebelumnya
                            </Button>
                            {currentQuestionIndex < quizQuestions.length - 1 ? (
                                <Button onClick={moveToNextQuestion} isDisabled={!hasAnsweredCurrentQuestion} colorScheme="teal" transition="transform 0.2s" _hover={{ transform: "scale(1.05)" }}>
                                    Selanjutnya
                                </Button>
                            ) : (
                                <Button colorScheme="teal" onClick={computeFinalScore} isDisabled={!hasAnsweredCurrentQuestion} transition="transform 0.2s" _hover={{ transform: "scale(1.05)" }}>
                                    Selesai
                                </Button>
                            )}
                        </Box>
                    </>
                )}

                <Progress
                    value={((currentQuestionIndex + 1) / quizQuestions.length) * 100}
                    size="sm"
                    colorScheme="teal"
                    mt={4}
                    borderRadius="md"
                />
            </Box>
        </Box>
    );
};

export default QuizComponent;
