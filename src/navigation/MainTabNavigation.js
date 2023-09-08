import React from 'react';

// React Native Vector Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// React Native Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Navigation Components
import HomeNavigation from './HomeNavigation';
import ProfileNavigation from './ProfileNavigation';

const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                tabBarActiveTintColor: '#000',
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeNavigation}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" type="ionicon" color="#000" size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileNavigation}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-circle" type="ionicon" color="#000" size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabNavigation