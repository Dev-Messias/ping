import React, { useState, createContext, ReactNode, useEffect } from 'react';

import AsyncStorange from '@react-native-async-storage/async-storage'

import { api } from '../services/api';
import Toast from "react-native-toast-message";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean,
    loading: boolean;
    signOut: () => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    banner: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        avatar: '',
        banner: '',
        token: ''
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser() {
            //pegar os dados salvos o user
            const userInfo = await AsyncStorange.getItem('@pingApp');
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            //verificar se recebemos as informações
            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    avatar: hasUser.avatar,
                    banner: hasUser.banner,
                    token: hasUser.token
                })
            }

            setLoading(false)
        }

        getUser()
    }, [])

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);

        try {

            const response = await api.post('/session', {
                email,
                password
            })

            const { id, name, avatar, banner, token } = response.data;

            const data = {
                ...response.data
            }

            await AsyncStorange.setItem('@pingApp', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                avatar,
                banner,
                token
            })

            setLoadingAuth(false)

        } catch (err) {
            console.log('Erro ao acessar', err);
            Toast.show({
                type: 'error',
                text1: 'Ops! Erro ao acessar',
                text2: 'Tente novamente mais tarde.'
            })
            setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorange.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    avatar: '',
                    banner: '',
                    token: ''

                })
            })
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut, loadingAuth, loading }}
        >
            {children}
        </AuthContext.Provider>
    )
}