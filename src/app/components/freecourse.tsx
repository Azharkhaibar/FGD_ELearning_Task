import { Box, Heading, Text, Icon, Image } from "@chakra-ui/react";
import CourseFree from '../img/freecourse.png';

const FreeCourse = () => {
    return (
        <Box w="100%" h="70vh" position="relative" bgImage={CourseFree.src} bgRepeat="no-repeat" bgSize="cover">

            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgColor="rgba(0, 0, 0, 0.5)" 
                zIndex={1}
            />
            <Box position="relative" zIndex={2} p={4} color="white"> 
                <Heading size="lg">Free Course Title</Heading>
                <Text mt={2}>Join our free course and start learning today!</Text>
            </Box>
        </Box>
    );
}

export default FreeCourse;
