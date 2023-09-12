import { View } from 'react-native'
import React from 'react'

// React Navigation
import { useNavigation } from '@react-navigation/native';

// Gluestack UI
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY } from 'react-native-dotenv';


const Onboarding = () => {
    const navigation = useNavigation();

    return (
        <Box flex={1} h="$80" p="$5" justifyContent="center">
            <Text color="$black" size="5xl" fontWeight="$bold" textAlign="center">
                Daily Fun Facts
            </Text>
            <Button
                size="md"
                variant="solid"
                action="primary"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                <ButtonText>Get Started </ButtonText>
            </Button>
        </Box>
    )
}

export default Onboarding