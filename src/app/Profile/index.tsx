import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';

import {AuthContext} from '../../contexts/AuthContext'

export default function Profile(){
    const {signOut} =  useContext(AuthContext);

    return(
        <View>
            <Text>Tela Profile</Text>
            <Button 
                title='Sair do app'
                onPress={signOut}
            />
        </View>
    )
}