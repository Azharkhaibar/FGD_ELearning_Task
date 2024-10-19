import { Box, Image, useToast, Text } from "@chakra-ui/react";
import GoogleLogo from "../img/google.png";  
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from './firebase';

const SignInWithGoogle: React.FC = () => {
    const toast = useToast();

    const GoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);

            if (result.user) {
                toast({
                    title: "Login Successful.",
                    description: "You have successfully logged in!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });

                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error during Google Sign-In:", error);
            toast({
                title: "Login Failed.",
                description: "Unable to sign in with Google.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <Box textAlign="center" mt={4}>
            <Box
                as="button"
                mx="auto"
                onClick={GoogleLogin}
                cursor="pointer"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}
                borderRadius="md"
                boxShadow="md"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
            >
                <Image
                    src={GoogleLogo.src}
                    alt="Sign in with Google"
                    boxSize="40px" 
                    objectFit="contain" 
                />
            </Box>
        </Box>
    );
};

export default SignInWithGoogle;
