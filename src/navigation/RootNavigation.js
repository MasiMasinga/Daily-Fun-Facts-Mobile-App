import { View, Text } from 'react-native'
import React from 'react'

// React Native Navigation
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Components
import AuthNavigation from './AuthNavigation';

const RootNavigation = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AuthNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default RootNavigation