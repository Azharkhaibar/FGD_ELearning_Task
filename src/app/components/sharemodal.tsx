import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    useDisclosure,
    Input,
    VStack,
    useBreakpointValue
} from '@chakra-ui/react';

const ShareModal: React.FC<{ isOpen: boolean; onClose: () => void; pageUrl: string }> = ({ isOpen, onClose, pageUrl }) => {
    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`, '_blank');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'sm', md: 'md', lg: 'lg' }}> {/* Responsif */}
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Share this Course</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Text>Share this link:</Text>
                        <Input value={pageUrl} readOnly />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="facebook" onClick={shareOnFacebook} mr={3}>
                        Share on Facebook
                    </Button>
                    <Button colorScheme="twitter" onClick={shareOnTwitter}>
                        Share on Twitter
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ShareModal;
