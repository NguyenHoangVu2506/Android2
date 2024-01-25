
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegisterNow = () => {
        navigation.navigate('Register');
    };

    const handleLoginNow = async () => {
        const user = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://172.16.8.97/nguyenhoanvu/public/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();

            if (result.success === true) {
                alert(result.message);
                navigation.navigate('Home', { replace: true });
            } else {
                alert(result.message);
                navigation.navigate('', { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <Image source={require('../../assets/images/avt-login01.jpg')} style={styles.backgroundImage} />
                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="envelope" size={20} color="blue" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, { backgroundColor: 'transparent', color: 'white' }]}
                            placeholder="Email Address"
                            placeholderTextColor="#ffffe6"
                            keyboardType="email-address"
                            onChangeText={value => setEmail(value)}
                            value={email}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={20} color="blue" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, { backgroundColor: 'transparent', color: 'white' }]}
                            placeholder="Password"
                            placeholderTextColor="#ffffe6"
                            secureTextEntry
                            onChangeText={value => setPassword(value)}
                            value={password}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textaccount}>You don't have an account ?</Text>
                        <Text style={styles.textRegister} onPress={handleRegisterNow}>Register</Text>
                    </View>
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.textForgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRegister} onPress={handleLoginNow}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 45,
        color: '#66CCFF',
        marginBottom: 20,
        marginTop: 70,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 20,
        width: '85%',
        paddingLeft: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#66CCFF',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        color: 'white',
        backgroundColor: '#ffff',
        height: 70,
        flex: 1,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    textForgot: {
        color: '#66CCFF',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    buttonRegister: {
        backgroundColor: '#66CCFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 30,
    },
    textaccount: {
        color: 'white',
        fontSize: 12,
        marginRight: 5,
    },
    textRegister: {
        color: '#66CCFF',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default Login;