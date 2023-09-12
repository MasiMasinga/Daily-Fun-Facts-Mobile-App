import React, { createContext, useEffect, useState } from 'react';

// Supabase
import { supabase } from '../../../config/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setSession(session);
                setAuth(true)
            } else if (event === 'SIGNED_OUT') {
                setSession(null);
                setAuth(false)
            }
        });

        return () => {
            supabase.auth.removeAuthStateListener();
        }
    }, []);

    let value = { auth, session }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

