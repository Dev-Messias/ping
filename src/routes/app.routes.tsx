import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';


import Home from "../app/Home";
import Search from "../app/Search";
import Profile from "../app/Profile";
 import ProfileFriend from "../app/ProfileFriend";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutesHome(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile Friend" component={ProfileFriend} />
        </Stack.Navigator>
    )
}

//user logado

function AppRoutes(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#1E3A8A'
            }}
        >
            <Tab.Screen name="HomeTab" component={StackRoutesHome}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return <FontAwesome name="home" size={size} color={color} />
                    }
                }}
            />

            <Tab.Screen name="Search" component={Search}
            
            options={{
                tabBarIcon: ({color, size}) => {
                    return <Feather name="search" size={size} color={color} />
                }
            }}
            
            />

            <Tab.Screen name="Profile" component={Profile}
            
            options={{
                tabBarIcon: ({color, size}) => {
                    return <FontAwesome name="user-circle-o" size={size} color={color} />
                }
            }}
            />



        </Tab.Navigator>
    )
}

export default AppRoutes;