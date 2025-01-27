import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '@/src/contexts/AuthContext';
import Toast from "react-native-toast-message";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from 'react-hook-form';
import Feather from '@expo/vector-icons/Feather';

type FormData = {
    name: string;
    email: string;
    password: string;
};

const schema = yup.object({
    name: yup.string().required("Informe seu nome"),
    email: yup.string().email("Email Invalido").required("Informe seu email"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos.").required("Informe sua senha.")
})

export default function SignIn() {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const { signIn, loadingAuth, userRegister, login, setLogin } = useContext(AuthContext);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    async function handleLogin() {
        if (email === '' || password === '') {
            Toast.show({
                type: 'info',
                text1: 'Ops! Verifique os campos.',
                text2: 'Preencha todos os campos para fazer o login.'
            })
            return;
        }

        await signIn({ email, password });

    }

    function togglePassword() {
        setSecureText(!secureText);
    }

    function toggleLogin() {
        reset({ name: '' })
        reset({ email: '' })
        reset({ password: '' })
        setLogin(!login)
    }

    async function handleRegister(data: FormData) {
        const { name, email, password } = data;
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {

            Toast.show({
                type: 'info',
                text1: 'Ops! Verifique os campos.',
                text2: 'Preencha todos os campos para fazer o cadastro.'
            })
            return;
        }
        await userRegister({ name, email, password })
    }


    if (login) {
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
                    <View className=' flex flex-row items-center justify-between w-11/12 h-12 bg-gray-50 rounded-xl  mb-5' >
                        <TextInput
                            className='w-10/12 h-12 bg-gray-50 rounded-xl px-4 '
                            placeholder='Sua senha*'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureText}
                        />

                        {secureText === true ? (<Feather name='eye-off' size={20} className='mr-4' onPress={togglePassword} />) : (<Feather name='eye' size={20} className='mr-4' onPress={togglePassword} />)}

                    </View>

                    <TouchableOpacity className='w-11/12 h-12 bg-blue-900 justify-center items-center rounded-xl' onPress={handleLogin} >
                        {loadingAuth ? (
                            <ActivityIndicator size={25} color={'#FFF'} />
                        ) : (
                            <Text className='font-bold text-gray-50 text-lg' >Acessar</Text>
                        )}


                    </TouchableOpacity>

                    <TouchableOpacity className='w-11/12 h-12 justify-center items-center rounded-xl mt-3' onPress={toggleLogin} >

                        <Text className='font-bold text-gray-700 text-lg' >Criar um conta</Text>

                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (
        <View className='flex-1 items-center flex-col justify-center bg-gray-200' >

            <Text className='text-blue-900 font-bold text-6xl mb-5 ' >Ping</Text>

            <View className='w-11/12 justify-center items-center py-8 px-2' >
                <Controller
                    control={control}
                    name='name'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className={`w-11/12 h-12 bg-gray-50 rounded-xl px-4 mb-5 `}
                            placeholder='Seu nome*'
                            value={value}
                            onChangeText={onChange}
                        />
                    )}

                />

                {errors.name && <Text className='w-11/12 text-red-600 self-start mb-2 px-6 -mt-3' >{errors.name?.message}</Text>}

                <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className='w-11/12 h-12 bg-gray-50 rounded-xl px-4 mb-5'
                            placeholder='Seu email*'
                            value={value}
                            onChangeText={onChange}
                        />
                    )}

                />

                {errors.email && <Text className='w-11/12 text-red-600 self-start mb-2 px-6 -mt-3' >{errors.email?.message}</Text>}

                <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className=' flex flex-row items-center justify-between w-11/12 h-12 bg-gray-50 rounded-xl  mb-5' >
                            <TextInput
                                className='w-10/12  h-12 bg-gray-50 rounded-xl px-4 '
                                placeholder='Sua senha*'
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={secureText}
                            />

                            {secureText === true ? (<Feather name='eye-off' size={20} className='mr-4' onPress={togglePassword} />) : (<Feather name='eye' size={20} className='mr-4' onPress={togglePassword} />)}

                        </View>
                    )}

                />
                {errors.password && <Text className='w-11/12 text-red-600 self-start mb-2 px-6 -mt-3' >{errors.password?.message}</Text>}

                <TouchableOpacity className='w-11/12 h-12 bg-blue-900 justify-center items-center rounded-xl' onPress={handleSubmit(handleRegister)}  >
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color={'#FFF'} />
                    ) : (
                        <Text className='font-bold text-gray-50 text-lg' >Cadastrar</Text>
                    )}


                </TouchableOpacity>

                <TouchableOpacity className='w-11/12 h-12 justify-center items-center rounded-xl mt-3' onPress={toggleLogin} >

                    <Text className='font-bold text-gray-700 text-lg' >Já tenho uma conta</Text>

                </TouchableOpacity>
            </View>

        </View>
    )
}