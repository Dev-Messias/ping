import React, { useContext, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext'
import Header from '@/src/components/Header';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import ModalImage from '@/src/components/ModalImage';

export default function Profile() {

    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uri, setUri] = useState<string | null>(null);
    const [imageType, setImageType] = useState<"avatar" | "banner">("avatar");

    function handleModalOpen(type: "avatar" | "banner") {
        setImageType(type)
        setIsModalOpen(true);
        setUri(null)

    }

    return (
        <SafeAreaView className='flex-1 bg-slate-100 '  >
            <Header />
            <ScrollView className='w-full flex-1 flex-col px-2  ' showsVerticalScrollIndicator={false} >

                <View className='w-full h-44 rounded-2xl mt-5 mb-4 ' >
                    {user.banner === null ? (
                        <View className='flex flex-col' >
                            <Image
                                source={require("../../assets/placeholder.jpg")}
                                className='w-full h-52 rounded-2xl '
                            />
                            <TouchableOpacity className='absolute top-2 right-2 bg-slate-200  p-1 rounded-full ' onPress={() => handleModalOpen("banner")} >
                                <MaterialIcons name="photo-camera" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className='flex flex-col' >
                            <Image
                                source={{ uri: `http://192.168.0.18:3333/files/${user.banner}` }}
                                className='w-full h-52 rounded-2xl '
                            />

                            <TouchableOpacity className='absolute top-2 right-2 bg-slate-200  p-1 rounded-full ' onPress={() => handleModalOpen("banner")} >
                                <MaterialIcons name="photo-camera" size={18} color="black" />
                            </TouchableOpacity>
                        </View>

                    )}
                </View>

                <View className='w-full flex flex-row justify-center items-center -mt-14' >

                    {user.avatar === null ?
                        (
                            <View className='flex flex-col' >
                                <Image
                                    source={require("../../assets/avatar_placeholder.png")}
                                    className='w-36 h-36 rounded-full border-4 border-slate-100  '
                                />
                                <TouchableOpacity className='absolute bottom-1 right-4 bg-slate-200  p-1 rounded-full ' onPress={() => handleModalOpen("avatar")} >
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
                                <TouchableOpacity className='absolute bottom-1 right-4 bg-slate-200  p-1 rounded-full ' onPress={() => handleModalOpen("avatar")} >
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
            <ModalImage visible={isModalOpen} onClose={() => setIsModalOpen(false)} imageType={imageType} uri={uri} setUri={setUri} />

        </SafeAreaView>
    )
}