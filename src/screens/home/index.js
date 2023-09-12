import React, { useState, useEffect } from 'react'

// Gluestack UI
import {
    VStack,
    HStack,
    Text,
    Box,
    Button,
    ButtonText,
    Spinner,
    Toast,
    ToastTitle,
    Pressable,
    AlertTriangleIcon,
    CloseIcon,
    Icon,
} from '@gluestack-ui/themed';
import { createToastHook } from "@gluestack-ui/toast"

// Axios
import axios from 'axios';

// Dotenv
import { REACT_NATIVE_FUN_FACTS_API } from 'react-native-dotenv';

const useToast = createToastHook(Toast)

const Home = () => {
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const [facts, setFacts] = useState([]);
    const limit = 1;
    const apiKey = REACT_NATIVE_FUN_FACTS_API;

    useEffect(() => {
        handleGetRandomFacts();
    }, []);

    const handleGetRandomFacts = async () => {
        setLoading(true);
        axios.get(`https://api.api-ninjas.com/v1/facts?limit=${limit}`, {
            headers: {
                'X-Api-Key': apiKey,
            },
        })
            .then(response => {
                setFacts(response.data[0].fact);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error: ', error);
                toast.show({
                    placement: 'top',
                    render: ({ id }) => {
                        return (
                            <Toast bg="$error700" nativeId={id} action="error" p="$3">
                                <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                                <VStack space="xs">
                                    <ToastTitle color="$textLight50">
                                        Failed to get facts
                                    </ToastTitle>
                                </VStack>
                                <Pressable mt="$1" onPress={() => toast.close(id)}>
                                    <Icon as={CloseIcon} color="$coolGray50" />
                                </Pressable>
                            </Toast>
                        )
                    }
                })
            });
        setLoading(false);
    }

    return (
        <Box flex={1} h="$80" justifyContent="center" alignItems="center">
            <VStack space="md" reversed={false}>
                <Box p="$5">
                    <VStack space="md">
                        {
                            loading ? (
                                <HStack space="sm">
                                    <Spinner />
                                    <Text size="md" textAlign='center'>
                                        Please Wait
                                    </Text>
                                </HStack>
                            ) :
                                <Text textAlign='center' fontWeight='bold'>
                                    {facts}
                                </Text>
                        }
                        <Button onPress={handleGetRandomFacts}>
                            <ButtonText>Generate Fun Fact!</ButtonText>
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    )
}

export default Home