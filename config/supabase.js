import 'react-native-url-polyfill/auto'

// Expo Secure Store
import * as SecureStore from 'expo-secure-store'

// Supabase
import { createClient } from '@supabase/supabase-js'

// Dotenv
import { REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY } from 'react-native-dotenv';

const ExpoSecureStoreAdapter = {
    getItem: (key) => {
        return SecureStore.getItemAsync(key)
    },
    setItem: (key, value) => {
        SecureStore.setItemAsync(key, value)
    },
    removeItem: (key) => {
        SecureStore.deleteItemAsync(key)
    },
}

const supabaseUrl = REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})