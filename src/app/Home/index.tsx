import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Header from '@/src/components/Header';

export default function Home(){
    return(
        <SafeAreaView className='flex-1' >
            <Header/>
        </SafeAreaView>
    )
}