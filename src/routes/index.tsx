import React, {useContext} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { AuthContext } from '../contexts/AuthContext';

function Routes() {

    const {isAuthenticated, loading} = useContext(AuthContext)



    if (loading) {
        return (
            <View className='flex flex-1 justify-center items-center ' >
                <ActivityIndicator size={50} color="#1E3A8A" />

            </View>
        )
    }

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;