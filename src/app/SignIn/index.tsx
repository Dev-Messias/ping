import React, {useState, useContext} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

import { AuthContext } from '@/src/contexts/AuthContext';

export default function SignIn() {

    const {signIn} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){
        if(email === '' || password === ''){
            return;
        }

        await signIn({email, password});

    }

    return (
        <View className='flex-1 items-center flex-col justify-center bg-gray-200' >
            
            <Text className='text-blue-900 font-bold text-6xl mb-5 ' >Ping</Text>
            
            <View className='w-11/12 justify-center items-center py-8 px-2' >
                <TextInput
                    className='w-11/12 h-12 bg-gray-50 rounded-xl px-4 mb-5'
                    placeholder='Digite seu email'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                className='w-11/12 h-12 bg-gray-50 rounded-xl px-4 mb-5'
                    placeholder='Sua senha'
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity className='w-11/12 h-12 bg-blue-900 justify-center items-center rounded-xl' onPress={handleLogin} >
                   
                        <Text className='font-bold text-gray-50 text-lg' >Acessar</Text>
                    
                </TouchableOpacity>
            </View>

        </View>
    )
}