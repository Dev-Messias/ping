import React, { useState, useContext } from 'react';

import { View, Text, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '@/src/contexts/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

type FormData = {
    name: string;
    bio?: string;
};

const schema = yup.object({
    name: yup.string().required("Informe seu nome"),
    bio: yup.string(),

})

function Header() {
    const { signOut, user, UpdateDataUser } = useContext(AuthContext)

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues:{
            name: user.name,
            bio: user.bio
        }
    })

    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function handleModalOpen() {
        setIsModalOpen(!isModalOpen);
        setIsMenuOpen(false)
    }


    async function handleUpdateUser(data: FormData){
            const { name, bio } = data;
            const token = user.token;
                    if (name.trim() === '') {
            
                        Toast.show({
                            type: 'info',
                            text1: 'Ops! Verifique os campos.',
                            text2: 'Preencha todos os campos para fazer o cadastro.'
                        })
                        return;
                    }
                    await UpdateDataUser({ name, bio, token })
                    setIsModalOpen(!isModalOpen)
                    
    }

    return (

        <View className='w-full pt-4 pb-3 flex flex-row justify-between items-center bg-white px-3' >
            <Text className='font-bold text-3xl text-blue-900' >Ping</Text>

            {/* Botão para abrir o menu */}
            <TouchableOpacity
                className=" w-8 h-8 bg-slate-200 flex items-center justify-center rounded-full "
                onPress={toggleMenu}
            >
                <SimpleLineIcons name="options" size={16} color="black" />
            </TouchableOpacity>

            {/* Menu de opções */}
            {isMenuOpen && (
                <View className="absolute top-[60px] right-4 bg-white rounded-lg z-20 shadow-lg p-4 w-60">
                    <View className="py-2 px-4 rounded-md hover:bg-gray-100">
                        <Text className="text-gray-800 font-semibold">Opções</Text>
                    </View>
                    <TouchableOpacity className=" flex flex-row gap-2  items-center py-2 px-4 rounded-md hover:bg-gray-100" onPress={handleModalOpen} >
                        <MaterialCommunityIcons name="account-settings-outline" size={18} color="black" />
                        <Text className="text-gray-800 font-normal">Configurações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-row gap-2  items-center  py-2 px-4 rounded-md hover:bg-gray-100" onPress={signOut} >
                        <Feather name="log-out" size={18} color="#ef4444" />
                        <Text className="text-red-500 font-normal">Sair</Text>
                    </TouchableOpacity>
                </View>
            )}


            <Modal
                visible={isModalOpen}
                animationType='slide'
                transparent={true}
            >

                <View className='flex-1 flex-col' >
                    <Pressable className=' w-full h-[30%] bg-black opacity-40 ' onPress={handleModalOpen} >

                    </Pressable>
                    <View className='w-full h-[70%] bg-white absolute bottom-0 items-center justify-center' >
                        <TouchableOpacity className='absolute top-4 left-6 flex-row items-center gap-2' onPress={handleModalOpen} >
                            <Feather name='arrow-left' size={20} color="#121212" />
                            <Text>Voltar</Text>
                        </TouchableOpacity>

                        <View className='w-11/12  items-center flex-row gap-2 mb-6' >
                            <Feather name="edit-3" size={20} color="black" />
                            <Text className='text-xl font-bold' >Editar dados</Text>
                        </View>
                        <Controller
                            control={control}
                            name='name'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className={`w-11/12 h-12 bg-gray-50 rounded-xl border text-slate-900 px-4 mb-5 `}
                                    placeholder='Seu nome*'
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}

                        />

                        {errors.name && <Text className='w-11/12 text-red-600 self-start mb-2 px-6 -mt-3' >{errors.name?.message}</Text>}

                        <Controller
                            control={control}
                            name='bio'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className={`w-11/12 h-12 bg-gray-50 rounded-xl border text-slate-900 px-4 mb-5 `}
                                    placeholder='Sua bio*'
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}

                        />

                        <TouchableOpacity className='w-11/12 h-12 bg-blue-900 justify-center items-center rounded-xl' onPress={handleSubmit(handleUpdateUser)}  >

                            <Text className='font-bold text-gray-50 text-lg' >Atualizar</Text>

                        </TouchableOpacity>


                    </View>
                </View>


            </Modal>

        </View>





    )
}

export default Header;