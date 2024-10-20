import {
    Box,
    Text,
    Heading,
    Flex,
    Icon,
} from "@chakra-ui/react";
import { CourseFactData } from "../data/coursefactdata";
import { useEffect, useState } from "react";

const DataFact: React.FC = () => {
    return (
        <Box w="100%" h={{ base: "auto", md: "30vh" }} mx="auto" bg="blackAlpha.600" display="flex" flexDirection={{ base: "column", md: "row" }} alignItems="center" px="4%">
            <Box w={{ base: "100%", md: "40%" }} h="100%" p={4} mx="auto" mt={{ base: "4", md: "2%" }}>
                <Text fontWeight="bold" color="white">Funfact</Text>
                <Heading fontSize={{ base: "30px", md: "50px" }} fontWeight="600" color="white" mb={4}>
                    Elearning Mission is to<br /> Polish your skill
                </Heading>
                <Text color="white" fontSize={{ base: "sm", md: "md" }}>
                    There are many variations of passages of lore ipsum available but the majority have suffered.
                </Text>
            </Box>
            <Box w={{ base: "100%", md: "60%" }} h="100%" display="flex" flexDirection="row" alignItems="center" p={4} mx="auto" flexWrap="wrap">
                {CourseFactData.map((factItem) => (
                    <Counter
                        key={factItem.id}
                        icon={factItem.icon}
                        totalCount={factItem.Number}
                        factDescription={factItem.desc}
                    />
                ))}
            </Box>
        </Box>
    );
}

const Counter: React.FC<{ icon: any; totalCount: number; factDescription: string }> = ({ icon, totalCount, factDescription }) => {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
        let isComponentActive = true;
        let startValueNumber = 0;
        const endValueNumber = totalCount;
        const totalDurationAnimate = 2000;
        const timePerIncrement = Math.floor(totalDurationAnimate / endValueNumber);

        const countInterval = setInterval(() => {
            if (isComponentActive && startValueNumber < endValueNumber) {
                startValueNumber++;
                setCurrentNumber(startValueNumber);
            } else {
                clearInterval(countInterval);
            }
        }, timePerIncrement);

        return () => {
            isComponentActive = false;
            clearInterval(countInterval);
        };
    }, [totalCount]);

    return (
        <Flex
            align="center"
            mb={4}
            p={4}
            borderWidth={1}
            borderRadius="md"
            bg="white"
            mx="auto"
            color="black"
            boxShadow="sm"
            width={{ base: "100%", md: "calc(33% - 1rem)" }}
            maxWidth={{ base: "100%", md: "calc(33% - 1rem)" }} 
            mr={{ base: 0, md: 4 }} 
            justifyContent="center"
            textAlign="center"
        >
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Icon as={icon} color="purple.300" fontSize="38px" mb={2} />
                <Text fontSize={{ base: "32px", md: "40px" }} fontWeight="bold">{currentNumber}+</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>{factDescription}</Text>
            </Box>
        </Flex>
    );
}

export default DataFact;
