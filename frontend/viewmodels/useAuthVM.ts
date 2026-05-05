import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useAuthVM = () => {
  // Login
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Register
  const [registerName, setRegisterName] = useState('');
  const [phone, setPhone] = useState('');
  const [registerPassword, setRegisterPassword] =
    useState('');
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  // LOGIN FUNCTION
  const login = () => {
    if (!name || !password) {
      Alert.alert(
        'Login Failed',
        'Please fill all fields.'
      );
      return;
    }

    console.log('Login Success');
  };

  // REGISTER FUNCTION
  const register = () => {
    if (
      !registerName ||
      !phone ||
      !registerPassword ||
      !confirmPassword
    ) {
      Alert.alert(
        'Register Failed',
        'Please complete all fields.'
      );
      return;
    }

    if (
      registerPassword !==
      confirmPassword
    ) {
      Alert.alert(
        'Register Failed',
        'Password confirmation does not match.'
      );
      return;
    }

    console.log('Register Success');

    // setelah register balik ke login
    router.replace('/auth/login');
  };

  return {
    // login
    name,
    password,
    setName,
    setPassword,
    login,

    // register
    registerName,
    phone,
    registerPassword,
    confirmPassword,
    setRegisterName,
    setPhone,
    setRegisterPassword,
    setConfirmPassword,
    register,
  };
};