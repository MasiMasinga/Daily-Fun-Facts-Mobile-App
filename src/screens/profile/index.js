import React, { useState, useEffect } from 'react'

// React Navigation
import { useNavigation } from '@react-navigation/native';

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
    CheckIcon,
    Icon,
} from '@gluestack-ui/themed';
import { createToastHook } from "@gluestack-ui/toast"

// Supabase
import { supabase } from '../../../config/supabase';

const useToast = createToastHook(Toast)

const Profile = () => {
    const toast = useToast();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        handleGetUserProfile();
    }, []);

    const handleGetUserProfile = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user.email) {
                setProfile(user.email);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error getting user profile:", error);
        }
    }

    const handleLogoutUser = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            setLoading(false);
            toast.show({
                placement: 'top',
                render: ({ id }) => {
                    return (
                        <Toast bg="$error700" nativeId={id} action="error" p="$3">
                            <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                            <VStack space="xs">
                                <ToastTitle color="$textLight50">
                                    Failed to logout
                                </ToastTitle>
                            </VStack>
                            <Pressable mt="$1" onPress={() => toast.close(id)}>
                                <Icon as={CloseIcon} color="$coolGray50" />
                            </Pressable>
                        </Toast>
                    )
                }
            })
        } else {
            navigation.navigate('LoginScreen');
            toast.show({
                placement: 'top',
                render: ({ id }) => {
                    return (
                        <Toast bg="$success700" nativeId={id} action="success" p="$3">
                            <Icon as={CheckIcon} color="$white" mt="$1" mr="$3" />
                            <VStack space="xs">
                                <ToastTitle color="$textLight50">
                                    Logout Successful
                                </ToastTitle>
                            </VStack>
                            <Pressable mt="$1" onPress={() => toast.close(id)}>
                                <Icon as={CloseIcon} color="$coolGray50" />
                            </Pressable>
                        </Toast>
                    )
                }
            })
            setLoading(false);
        }
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
                                    {profile}
                                </Text>
                        }
                        <Button onPress={handleLogoutUser}>
                            <ButtonText>Logout</ButtonText>
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    )
}

export default Profile