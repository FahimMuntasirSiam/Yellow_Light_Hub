'use client';

import React, { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from './authStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { setUser, setSession, setProfile, setLoading, refreshProfile } = useAuthStore();

    useEffect(() => {
        // 1. Initial Session Check
        const initAuth = async () => {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setSession(session);
                setUser(session.user);

                // Fetch or clear profile
                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                setProfile(profile);
            } else {
                setSession(null);
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        };

        initAuth();

        // 2. Listen for Auth State Changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth event:', event);

            if (session) {
                setSession(session);
                setUser(session.user);

                if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
                    const { data: profile } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();
                    setProfile(profile);
                }
            } else {
                setSession(null);
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return <>{children}</>;
};
