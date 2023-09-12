import React, { useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context
import { AuthContext } from '../common/context/AuthContext';

// Screens
import Onboarding from '../screens/onboarding';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import MainTabNavigation from './MainTabNavigation';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    const { session } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {session ? (
                <Stack.Screen name="MainTabNavigation" component={MainTabNavigation} />
            ) : (
                <>
                    <Stack.Screen name="OnboardingScreen" component={Onboarding} />
                    <Stack.Screen name="LoginScreen" component={Login} />
                    <Stack.Screen name="RegisterScreen" component={Register} />
                </>
            )}
        </Stack.Navigator>

    )
}

export default AuthNavigation