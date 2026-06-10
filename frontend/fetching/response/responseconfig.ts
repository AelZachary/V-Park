import Constants from 'expo-constants';
import { Platform } from 'react-native';

function resolveExpoGoLanBaseUrl() {
  if (Platform.OS === 'web') {
    return null;
  }

  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.manifest2?.extra?.expoClient?.hostUri ??
    Constants.manifest?.debuggerHost;

  if (!hostUri || typeof hostUri !== 'string') {
    return null;
  }

  const host = hostUri.split(':')[0]?.trim();
  if (!host || host === 'localhost' || host === '127.0.0.1') {
    return null;
  }

  return `http://${host}:5012`;
}

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  resolveExpoGoLanBaseUrl() ??
  Platform.select({
    android: 'http://10.0.2.2:5012',
    ios: 'http://localhost:5012',
    default: 'http://localhost:5012',
  }) ?? 'http://localhost:5012';