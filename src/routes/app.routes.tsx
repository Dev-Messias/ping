import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




import Home from "../app/Home";
import Search from "../app/Search";
import Profile from "../app/Profile";
// import ProfileFriend from "../app/ProfileFriend";

const Tab = createBottomTabNavigator();

//user logado

function AppRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default AppRoutes;