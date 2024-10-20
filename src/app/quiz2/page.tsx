"use client";
import { useState } from 'react';
import { Box, Button, Radio, RadioGroup, Stack, Text, Progress, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

interface JavaScriptQuizQuestion {
    questionText: string;
    answerOptions: string[];
    correctAnswerIndex: number;
}

const javaScriptQuizQuestions: JavaScriptQuizQuestion[] = [
    {
        questionText: "Apa output dari `console.log(typeof 'Hello')`?",
        answerOptions: ["string", "undefined", "error", "number"],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa perbedaan antara `var`, `let`, dan `const`?",
        answerOptions: [
            "`var` tidak memiliki scope, `let` dan `const` memiliki block scope",
            "`let` dan `const` tidak bisa diubah, `var` bisa",
            "`const` bisa di-reassign, `var` dan `let` tidak bisa",
            "Tidak ada perbedaan"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa itu callback dalam JavaScript?",
        answerOptions: [
            "Fungsi yang dipanggil setelah fungsi lain selesai dieksekusi",
            "Fungsi yang mengembalikan nilai",
            "Variabel yang menyimpan fungsi",
            "Metode untuk menghentikan eksekusi"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa itu Promise dalam JavaScript?",
        answerOptions: [
            "Objek yang mewakili nilai yang mungkin tidak tersedia saat ini",
            "Fungsi untuk menghapus data",
            "Metode untuk mengulang kode",
            "Tipe data khusus"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Bagaimana cara mendeklarasikan fungsi dalam JavaScript?",
        answerOptions: [
            "function myFunction() {}",
            "declare myFunction() {}",
            "myFunction() = function {}",
            "func myFunction() {}"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa itu 'hoisting' dalam JavaScript?",
        answerOptions: [
            "Proses mengangkat deklarasi variabel dan fungsi ke atas",
            "Proses mengeksekusi kode dari atas ke bawah",
            "Proses menghapus variabel yang tidak digunakan",
            "Proses mendeklarasikan variabel global"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa output dari `[1, 2, 3].map(x => x * 2)`?",
        answerOptions: [
            "[2, 4, 6]",
            "[1, 2, 3]",
            "Error",
            "[1, 4, 9]"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa perbedaan antara `==` dan `===`?",
        answerOptions: [
            "`==` membandingkan nilai, `===` membandingkan nilai dan tipe data",
            "Keduanya sama",
            "`==` lebih cepat dari `===`",
            "`===` adalah operator logika"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa yang dilakukan `this` dalam konteks fungsi?",
        answerOptions: [
            "Mewakili objek saat ini",
            "Mengembalikan nilai dari fungsi",
            "Mendeklarasikan fungsi",
            "Tidak memiliki arti khusus"
        ],
        correctAnswerIndex: 0,
    },
    {
        questionText: "Apa itu 'event bubbling' dalam JavaScript?",
        answerOptions: [
            "Proses di mana event ditangkap dari elemen anak ke elemen induk",
            "Proses menghapus event listener",
            "Proses mengatur timeout",
            "Proses mengulangi event"
        ],
        correctAnswerIndex: 0,
    },
];

const JavaScriptQuizComponent: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<number[]>(Array(javaScriptQuizQuestions.length).fill(-1));
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
            return answer === javaScriptQuizQuestions[index].correctAnswerIndex ? Accumulation + 1 : Accumulation;
        }, 0);
        setFinalScore(calculatedScore);
    };

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < javaScriptQuizQuestions.length - 1) {
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
                            Skor Kamu: {finalScore}/{javaScriptQuizQuestions.length}
                        </Text>
                        <Button mt={6} colorScheme="teal" onClick={() => setFinalScore(null)} transition="transform 0.2s" _hover={{ transform: "scale(1.05)" }}>
                            Coba Lagi
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Text fontSize="xl" fontWeight="bold" mb={4}>
                            {javaScriptQuizQuestions[currentQuestionIndex].questionText}
                        </Text>
                        <RadioGroup
                            mt={4}
                            onChange={(value) => handleAnswerSelection(parseInt(value))}
                            value={userAnswers[currentQuestionIndex] !== -1 ? userAnswers[currentQuestionIndex].toString() : ''}
                        >
                            <Stack direction="column">
                                {javaScriptQuizQuestions[currentQuestionIndex].answerOptions.map((option, index) => (
                                    <Radio
                                        key={index}
                                        value={index.toString()}
                                        isDisabled={hasAnsweredCurrentQuestion}
                                        borderColor="gray.300"
                                        _hover={{ borderColor: "teal.500" }}
                                        bgColor={
                                            hasAnsweredCurrentQuestion && userAnswers[currentQuestionIndex] === index && index !== javaScriptQuizQuestions[currentQuestionIndex].correctAnswerIndex
                                                ? 'red.200'
                                                : hasAnsweredCurrentQuestion && index === javaScriptQuizQuestions[currentQuestionIndex].correctAnswerIndex
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
                            {currentQuestionIndex < javaScriptQuizQuestions.length - 1 ? (
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
                    value={((currentQuestionIndex + 1) / javaScriptQuizQuestions.length) * 100}
                    size="sm"
                    colorScheme="teal"
                    mt={4}
                    borderRadius="md"
                />
            </Box>
        </Box>
    );
};

export default JavaScriptQuizComponent;
