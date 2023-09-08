import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Onboarding from '../screens/onboarding';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import MainTabNavigation from './MainTabNavigation';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="OnboardingScreen"
        >
            <Stack.Screen name="OnboardingScreen" component={Onboarding} />
            <Stack.Screen name="LoginScreen" component={Login} />
            <Stack.Screen name="RegisterScreen" component={Register} />
            <Stack.Screen name="MainTabNavigation" component={MainTabNavigation} />
        </Stack.Navigator>

    )
}

export default AuthNavigation