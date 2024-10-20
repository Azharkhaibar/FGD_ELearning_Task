import React from 'react';
import { Box, Container, Stack, Text, Link, Icon } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <Box bg="gray.800" color="white" py={10}>
            <Container maxW="container.xl">
                <Stack spacing={6}>
                    <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
                        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">FGD Elearning</Text>
                        <Stack direction="row" spacing={4} mt={{ base: 4, md: 0 }}>
                            <Link href="https://facebook.com" isExternal>
                                <Icon as={FaFacebookF} boxSize={5} />
                            </Link>
                            <Link href="https://twitter.com" isExternal>
                                <Icon as={FaTwitter} boxSize={5} />
                            </Link>
                            <Link href="https://instagram.com" isExternal>
                                <Icon as={FaInstagram} boxSize={5} />
                            </Link>
                            <Link href="https://linkedin.com" isExternal>
                                <Icon as={FaLinkedinIn} boxSize={5} />
                            </Link>
                        </Stack>
                    </Stack>

                    <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 8, md: 10 }} justify="space-between">
                        <Stack spacing={1}>
                            <Text fontWeight="bold">Quick Links</Text>
                            <Link href="/">Home</Link>
                            <Link href="/register">Join Now</Link>
                            <Link href="/course">Courses</Link>
                            <Link href="/contact">Contact</Link>
                        </Stack>
                        <Stack spacing={1}>
                            <Text fontWeight="bold">Resources</Text>
                            <Link href="/faq">FAQ</Link>
                            <Link href="/blog">Blog</Link>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                            <Link href="/terms-of-service">Terms of Service</Link>
                        </Stack>
                    </Stack>
                    <Text textAlign="center" mt={5} fontSize={{ base: 'sm', md: 'md' }}>
                        © {new Date().getFullYear()} Elearning Azhar. All rights reserved.
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
