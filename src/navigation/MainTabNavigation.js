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
                    tabBarIcon: () => (
                        <Icon name="home" type="ionicon" color="#4AA9FF" size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileNavigation}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <Icon name="account-circle" type="ionicon" color="#4AA9FF" size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabNavigation