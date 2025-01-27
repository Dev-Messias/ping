import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../app/SignIn';

export type StackPramsList = {
    Login: undefined;
}

const Stack = createNativeStackNavigator<StackPramsList>();

//user nao logado



function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={SignIn} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;