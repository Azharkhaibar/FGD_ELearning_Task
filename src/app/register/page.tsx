"use client";
import {
    Box, Heading, Text, Button, Flex, FormControl, FormLabel, Input, useToast, Image
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import RegisterImage from '../img/registerpict.png';
import Navbar from "../components/navbar";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "../components/loginmodal";
import GoogleSignIn from "../components/signwithgoogle";
import auth from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp: React.FC = () => {
    const { isOpen: isOpenModal, onOpen: openModal, onClose: closeModal } = useDisclosure();
    const toastNotification = useToast();
    const routerNavigation = useRouter();
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

    const handleSignUpProcess = async () => {
        if (!firstNameInput || !lastNameInput || !usernameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            toastNotification({
                title: "Missing Fields.",
                description: "Please fill in all fields.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        if (passwordInput !== confirmPasswordInput) {
            toastNotification({
                title: "Password mismatch.",
                description: "Ensure your passwords match.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
            toastNotification({
                title: "Registration successful.",
                description: "You can now log in.",
                status: "success",
                duration: 4000,
                isClosable: true,
            });

            resetFormFields();
            routerNavigation.push("/");

        } catch (error) {
            toastNotification({
                title: "Registration failed.",
                description: error instanceof Error ? error.message : "An unknown error occurred.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const resetFormFields = () => {
        setFirstNameInput('');
        setLastNameInput('');
        setUsernameInput('');
        setEmailInput('');
        setPasswordInput('');
        setConfirmPasswordInput('');
    };

    return (
        <Box w="100%" h="100vh" bg="gray.100">
            <Navbar />
            <LoginModal isOpen={isOpenModal} onClose={closeModal} />
            <Box w={{ base: "90%", md: "70%" }} mx="auto" mt={{ base: "5%", md: "8%" }}>
                <Flex direction={{ base: "column", md: "row" }} h="100%" align="center" justify="center">
                    <Box w={{ base: "100%", md: "40%" }} h="100%" position="relative" bg="gray.200">
                        <Image
                            src={RegisterImage.src}
                            alt="Register Illustration"
                            layout="fill" // Use 'fill' to make it cover the entire box
                            objectFit="cover" // This ensures the image covers the box without distortion
                        />
                        <Box pos="absolute" bottom="25px" left="30%">
                            <Text fontWeight="600">
                                Already a member?
                                <Button
                                    onClick={openModal}
                                    bg="purple.500"
                                    color="white"
                                    borderRadius="4px"
                                    ml="5px"
                                    fontSize="14px"
                                    px={2}
                                >
                                    Login
                                </Button>
                            </Text>
                        </Box>
                    </Box>
                    <Box w={{ base: "100%", md: "60%" }} h="100%" bg="white" boxShadow="md" borderRadius="md" p={8}>
                        <Heading size="lg" mb={4} textAlign="left">Create Your Account</Heading>
                        <Text mb={4} textAlign="left">Create your account</Text>
                        <Flex direction={{ base: "column", md: "row" }} mb={8}>
                            <Box w={{ base: "100%", md: "50%" }} pr={{ base: 0, md: 2 }}>
                                <FormControl>
                                    <FormLabel fontWeight="400">First Name</FormLabel>
                                    <Input
                                        placeholder="First Name"
                                        value={firstNameInput}
                                        onChange={(e) => setFirstNameInput(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box w={{ base: "100%", md: "50%" }} pl={{ base: 0, md: 2 }}>
                                <FormControl>
                                    <FormLabel fontWeight="400">Last Name</FormLabel>
                                    <Input
                                        placeholder="Last Name"
                                        value={lastNameInput}
                                        onChange={(e) => setLastNameInput(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                        </Flex>

                        <Flex direction={{ base: "column", md: "row" }} mb={8}>
                            <Box w={{ base: "100%", md: "50%" }} pr={{ base: 0, md: 2 }}>
                                <FormControl>
                                    <FormLabel fontWeight="400">Username</FormLabel>
                                    <Input
                                        placeholder="Username"
                                        value={usernameInput}
                                        onChange={(e) => setUsernameInput(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box w={{ base: "100%", md: "50%" }} pl={{ base: 0, md: 2 }}>
                                <FormControl>
                                    <FormLabel fontWeight="400">Email address</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={emailInput}
                                        onChange={(e) => setEmailInput(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                        </Flex>

                        <Flex direction={{ base: "column", md: "row" }} mb={4}>
                            <Box w={{ base: "100%", md: "50%" }} pr={{ base: 0, md: 2 }}>
                                <FormControl>
                                    <FormLabel fontWeight="400">Password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box w={{ base: "100%", md: "50%" }} pl={{ base: 0, md: 2 }}>
                                <FormControl>
                                    <FormLabel fontWeight="400">Confirm Password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPasswordInput}
                                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                        </Flex>
                        <GoogleSignIn />
                        <Button
                            color="white"
                            bg="purple.300"
                            width={{ base: "100%", md: "150px" }}
                            mt={4}
                            p={6}
                            onClick={handleSignUpProcess}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Box>

    );
}

export default SignUp;
