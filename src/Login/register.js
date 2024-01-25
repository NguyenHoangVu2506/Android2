import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('1');

  const [successMessage, setSuccessMessage] = useState('');
  const registered_user_data = {};

  const handleLoginNow = async () => {
    const user = {
        email: email,
        password: password,
        name:name,
        status:status,
    };

    try {
        const response = await fetch('http://172.16.8.97/nguyenhoanvu/public/api/user/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const result = await response.json();

        if (result.success === true) {
            alert(result.message);
            navigation.navigate('Login', { replace: true });
        } else {
            alert(result.message);
            navigation.navigate('/', { replace: true });
        }
    } catch (error) {
        console.error(error);
    }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../../assets/images/avt-login01.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="blue" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { backgroundColor: 'transparent', color: 'white' }]}
              placeholder="Name"
              placeholderTextColor="#ffffe6"
              keyboardType="Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="blue" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { backgroundColor: 'transparent', color: 'white' }]}
              placeholder="Email Address"
              placeholderTextColor="#ffffe6"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="blue" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { backgroundColor: 'transparent', color: 'white' }]}
              placeholder="Password"
              placeholderTextColor="#ffffe6"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="blue" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { backgroundColor: 'transparent', color: 'white' }]}
              placeholder="Address"
              placeholderTextColor="#ffffe6"
              keyboardType="email-address"
            />
          </View>
          <TouchableOpacity style={styles.buttonRegister} onPress={handleLoginNow}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
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
    marginRight: '15%',
    marginBottom: 10,
  },
  textForgot: {
    color: '#66CCFF',
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
  },
  textaccount: {
    color: 'white',
    fontSize: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 70,
    marginBottom: 5,
  },
  textRegister: {
    color: '#66CCFF',
    fontSize: 12,
    marginLeft: 10,
  },
  buttonRegister: {
    backgroundColor: '#0099CC',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 3,
    marginTop: 30,
    shadowColor: '#66CCFF',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1.5,
    shadowRadius: 500,
    elevation: 7,
  },
  buttonLogin: {
    marginTop: 20,
  },
  buttonText: {
    color: '#DDDDDD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;