"use client";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    Box,
    useToast,
    Link
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from 'next/link';
import SignInWithGoogle from "./signwithgoogle";
import auth from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const initialRef = React.useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Login successful.",
                description: "Welcome back!",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            onClose(); // Menutup modal setelah login berhasil
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: "Login failed.",
                    description: error.message,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Login failed.",
                    description: "An unknown error occurred.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={{ base: 'sm', md: 'md' }}> {/* Responsif */}
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    textAlign="center"
                    fontSize="25px"
                    fontWeight="700"
                >
                    Sign In
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl px="5%">
                        <FormLabel>Email</FormLabel>
                        <Input
                            ref={initialRef}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size={{ base: 'sm', md: 'md' }} // Responsif
                        />
                    </FormControl>

                    <FormControl mt={4} px="5%">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size={{ base: 'sm', md: 'md' }} // Responsif
                        />
                    </FormControl>

                    <Text mt="2%" textAlign="center">
                        Don’t have an account?{" "}
                        <NextLink href="/register" passHref>
                            <Link color="purple.500" fontWeight="semibold" textDecoration="underline">
                                Register
                            </Link>
                        </NextLink>
                    </Text>

                    <Text textAlign="center" mt={4} mb={2}>
                        -- or continue with --
                    </Text>
                    <Box textAlign="center">
                        <SignInWithGoogle />
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleLogin}>
                        Login
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
