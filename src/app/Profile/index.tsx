import React, { useContext, useState } from 'react';
import { View, Text, Button, Image, SafeAreaView, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext'
import Header from '@/src/components/Header';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export default function Profile() {
    const { signOut, user, UpdateAvatarUser,  loadingAuth } = useContext(AuthContext);
    // console.log(user.bio)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uri, setUri] = useState<string | null>(null);
    const [type, setType] = useState<string | undefined>('null');
    const [nameImg, setNameImg] = useState<string | null | undefined>(null);




    function handleModalOpen() {
        setIsModalOpen(!isModalOpen);
        setUri(null)
    }


    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
            selectionLimit: 1,
        });

        // console.log(result.assets);

        if (!result.canceled) {
            setUri(result.assets[0].uri);
            setNameImg(result.assets[0].fileName);
            setType(result.assets[0].mimeType);
        }
    }

    async function EditAvatar() {
         const token = user.token;

        //  console.log("dentro do componente - ", token)
        if (!nameImg || !uri) {
            Toast.show({
                type: 'error',
                text1: 'Ops! Imagem invalida ',
                text2: 'Adicione uma imagem valida.'
            })
            return
        }

        await UpdateAvatarUser({ 
            uri: uri, 
            nameImg: nameImg, 
            type: type,
            token: user.token
        })

        setIsModalOpen(!isModalOpen);
        return;

    }

    return (
        <SafeAreaView className='flex-1 bg-slate-100 '  >
            <Header />
            <ScrollView className='w-full flex-1 flex-col px-2  ' showsVerticalScrollIndicator={false} >
                {/* <Text>Tela Profile</Text>
                <Button
                    title='Sair do app'
                    onPress={signOut}
                /> */}

                <View className='w-full h-44 rounded-2xl mt-5 mb-4 ' >
                    {user.banner === null ? (<Image
                        source={require("../../assets/placeholder.jpg")}
                        className='w-full h-52 rounded-2xl '
                    />) : (<Image
                        source={{ uri: `http://192.168.0.18:3333/files/${user.banner}` }}
                        className='w-full h-52 rounded-2xl '
                    />)}
                </View>

                <View className='w-full flex flex-row justify-center items-center -mt-14' >

                    {user.avatar === null ?
                        (
                            <View className='flex flex-col' >
                                <Image
                                    source={require("../../assets/avatar_placeholder.png")}
                                    className='w-36 h-36 rounded-full border-4 border-slate-100  '
                                />
                                <TouchableOpacity className='absolute bottom-1 right-4 bg-slate-200  p-1 rounded-full ' onPress={handleModalOpen} >
                                    <MaterialIcons name="photo-camera" size={18} color="black" />
                                </TouchableOpacity>
                            </View>

                        )
                        :
                        (
                            <View className='flex flex-col' >
                                <Image
                                    source={{ uri: `http://192.168.0.18:3333/files/${user.avatar}` }}
                                    className='w-36 h-36 rounded-full border-4 border-slate-100  '
                                />
                                <TouchableOpacity className='absolute bottom-1 right-4 bg-slate-200  p-1 rounded-full ' onPress={handleModalOpen} >
                                    <MaterialIcons name="photo-camera" size={18} color="black" />
                                </TouchableOpacity>
                            </View>
                        )
                    }

                </View>
                <View className='w-full flex flex-col justify-center items-center gap-1 mt-2' >
                    <Text className='font-bold text-2xl text-slate-900' >{user.name}</Text>
                    {user.bio && (<Text className='w-3/4 text-center text-slate-800 '  >{user.bio}</Text>)}
                </View>
                <View className='w-full flex flex-row items-center justify-between mt-10' >
                    {/* <View className=' flex-1 items-center justify-center ' >
                        <Text className='font-bold text-xl text-slate-900' >10</Text>
                        <Text className='text-base text-slate-500 font-medium' >Seguidores</Text>
                    </View> */}
                    <View className='flex-1 items-center justify-center border-r-[0.5px] ' >
                        <Text className='font-bold text-xl text-slate-900' >10</Text>
                        <Text className='text-base text-slate-500 font-medium' >Fotos</Text>
                    </View>
                    <View className='flex-1 items-center justify-center' >
                        <Text className='font-bold text-xl text-slate-900' >112</Text>
                        <Text className='text-base text-slate-500 font-medium' >publicações</Text>
                    </View>
                </View>

                <View className='w-full flex flex-col mt-10 mb-4 ' >

                    <Text className='font-bold text-2xl mb-3' >Publicações</Text>

                    <View className=' flex-row flex-wrap justify-between gap-2' >

                        <TouchableOpacity className='w-[48%]    '  >
                            <Image
                                source={require("../../assets/365661.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]  ' >
                            <Image
                                source={require("../../assets/photo-1.jpeg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]    '  >
                            <Image
                                source={require("../../assets/photo-2.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]  ' >
                            <Image
                                source={require("../../assets/365661.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]    '  >
                            <Image
                                source={require("../../assets/365661.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]  ' >
                            <Image
                                source={require("../../assets/photo-1.jpeg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]    '  >
                            <Image
                                source={require("../../assets/photo-2.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]  ' >
                            <Image
                                source={require("../../assets/365661.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]    '  >
                            <Image
                                source={require("../../assets/365661.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]  ' >
                            <Image
                                source={require("../../assets/photo-1.jpeg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]    '  >
                            <Image
                                source={require("../../assets/photo-2.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[48%]  ' >
                            <Image
                                source={require("../../assets/365661.jpg")}
                                className='w-56 h-56 rounded-3xl'
                            />
                        </TouchableOpacity>


                    </View>

                </View>
            </ScrollView>

            <Modal
                visible={isModalOpen}
                animationType='fade'
                transparent={true}
            >
                <View className=' flex-1 flex-col items-center justify-center px-2 bg-[rgba(0,0,0,0.5)] '  >
                    <TouchableOpacity className='w-full h-[25%]' onPress={handleModalOpen} ></TouchableOpacity>
                    <View className='w-full h-[50%] bg-slate-100 rounded-xl flex flex-col items-center justify-center ' >
                        <TouchableOpacity className='absolute top-4 right-5 flex-row items-center gap-2' onPress={handleModalOpen} >
                            <AntDesign name="closecircleo" size={24} color="#dc2626" />
                        </TouchableOpacity>

                        <View className='w-full flex-col items-center ' >
                            <TouchableOpacity className='flex-col items-center' onPress={pickImage}>
                                {uri === null ? (<Image
                                    source={require("../../assets/avatar_placeholder.png")}
                                    className='w-60 h-60 rounded-full border-4 border-slate-100  '
                                />) : (<Image
                                    source={{ uri: uri }}
                                    className='w-60 h-60 rounded-full border-4 border-slate-100  '
                                />)}

                                <View className='w-60 h-60 rounded-full bg-transparent items-center justify-center absolute' >
                                    <MaterialIcons name="add-to-photos" size={25} color="black" />
                                </View>

                            </TouchableOpacity>
                        </View>


                        <View className='w-full items-center justify-center mt-8 ' >
                            <TouchableOpacity className='w-[70%] py-3 bg-blue-900 items-center rounded-xl' onPress={EditAvatar} >

                                {loadingAuth ?
                                    <ActivityIndicator size={25} color={'#FFF'} />
                                    :
                                    <Text className='text-slate-100 font-semibold' >Atualizar</Text>
                                }

                            </TouchableOpacity>
                        </View>


                    </View>
                    <TouchableOpacity className='w-full h-[25%]' onPress={handleModalOpen}  ></TouchableOpacity>
                </View>
            </Modal>

        </SafeAreaView>
    )
}