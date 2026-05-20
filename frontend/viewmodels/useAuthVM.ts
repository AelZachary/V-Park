import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import {
  isPengunjungLoginResult,
  isPetugasLoginResult,
  loginUser,
} from '@/fetching/services/loginservices';
import { registerUser } from '@/fetching/services/registrasiservice';
import { setCurrentUsername } from '@/fetching/authSession';

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
  const login = async () => {
    if (!name || !password) {
      Alert.alert(
        'Login Failed',
        'Please fill all fields.'
      );
      return;
    }

    try {
      const result = await loginUser(name, password);
      setCurrentUsername(name);

      if (isPengunjungLoginResult(result)) {
        router.replace('/user/home');
        return;
      }

      if (isPetugasLoginResult(result)) {
        router.replace('/staff/StaffProfile');
        return;
      }

      Alert.alert('Login Failed', 'Unexpected login response.');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Login failed';
      Alert.alert('Login Failed', message);
    }
  };

  // REGISTER FUNCTION
  const register = async () => {
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

    try {
      await registerUser(
        registerName,
        registerPassword,
        phone
      );

      Alert.alert(
        'Register Success',
        'Your account has been created.'
      );
      router.replace('/auth/login');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Register failed';
      Alert.alert('Register Failed', message);
    }
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