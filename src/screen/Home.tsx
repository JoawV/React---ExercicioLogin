import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


const Home: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const Logar = () => {
        console.log('Email: ', email)
        console.log('Senha: ', senha)
    }

    return (
        <View>
            <Text>Login</Text>
            <View>
                <TextInput
                    placeholder='Email...'
                    onChange={tex}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
