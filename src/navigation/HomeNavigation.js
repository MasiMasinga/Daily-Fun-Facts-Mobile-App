import React from 'react';

// React Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Components
import Home from '../screens/home';

const HomeStack = createStackNavigator();

const HomeNavigation = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="HomeScreen"
                component={Home}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeNavigation;