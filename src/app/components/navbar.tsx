"use client";
import {
    Box,
    Heading,
    Button,
    Flex,
    Spacer,
    Image,
    Link,
    Divider,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from "@chakra-ui/react";
import { FaRegBookmark, FaBars } from "react-icons/fa";
import NextLink from 'next/link';
import LoginModal from "./loginmodal";
import React, { useState, useEffect } from "react";
import auth from "./firebase";

const Navbar: React.FC<{ favoriteCount: number }> = ({ favoriteCount }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserDetails(user);
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsLoggedIn(false);
            window.location.href = "/";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <Box bg="white" px={{ base: "4", md: "6" }} py="4" boxShadow="sm" zIndex={99}>
            <Flex alignItems="center" justify="space-between">
                <Flex alignItems="center">
                    <Image
                        boxSize="40px"
                        objectFit="cover"
                        src="/path-to-your-logo.png"
                        alt="Logo"
                    />
                    <Heading size="md" ml="2">
                        ELearning
                    </Heading>
                </Flex>

                <Box display={{ base: "none", md: "flex" }} ml="6">
                    <Link href="/" fontWeight="bold" color="black" mx="2">Home</Link>
                    <Link href="/course" fontWeight="bold" color="black" mx="2">Courses</Link>
                </Box>

                <Spacer />

                <Flex alignItems="center" position="relative">
                    <FaRegBookmark size={20} color="black" />
                    {favoriteCount > 0 && (
                        <Box
                            position="absolute"
                            top="-5px"
                            right="-5px"
                            bg="red.500"
                            color="white"
                            borderRadius="full"
                            width="20px"
                            height="20px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="12px"
                        >
                            {favoriteCount}
                        </Box>
                    )}
                </Flex>

                <Divider orientation="vertical" height="20px" mx={2} borderColor="gray.300" />

                <Box display="flex" alignItems="center">
                    {isLoggedIn ? (
                        <Box display={{ base: "none", md: "flex" }}>
                            <Text mr="4">{userDetails?.displayName || "User"}</Text>
                            <Button
                                variant="ghost"
                                colorScheme="red"
                                mr="4"
                                color="black"
                                fontWeight="bold"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Box display={{ base: "none", md: "flex" }}>
                            <Button
                                variant="ghost"
                                colorScheme="green"
                                mr="4"
                                color="black"
                                fontWeight="bold"
                                onClick={onOpen}
                            >
                                Login
                            </Button>
                            <NextLink href="/register" passHref>
                                <Button
                                    bg="purple.300"
                                    color="white"
                                    fontWeight="bold"
                                >
                                    Join for free
                                </Button>
                            </NextLink>
                        </Box>
                    )}
                </Box>
                <Box display={{ base: "block", md: "none" }}>
                    <Menu>
                        <MenuButton as={IconButton} aria-label="Options" icon={<FaBars />} variant="outline" />
                        <MenuList>
                            <MenuItem as={NextLink} href="/">Home</MenuItem>
                            <MenuItem as={NextLink} href="/course">Courses</MenuItem>
                            {isLoggedIn ? (
                                <>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    <Divider />
                                    <MenuItem>{userDetails?.displayName || "User"}</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={onOpen}>Login</MenuItem>
                                    <MenuItem as={NextLink} href="/register">Join for free</MenuItem>
                                </>
                            )}
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>

            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export default Navbar;
