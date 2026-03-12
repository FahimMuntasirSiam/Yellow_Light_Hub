import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    session: Session | null;
    profile: any | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    setSession: (session: Session | null) => void;
    setProfile: (profile: any | null) => void;
    setLoading: (loading: boolean) => void;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            session: null,
            profile: null,
            loading: true,
            setUser: (user) => set({ user }),
            setSession: (session) => set({ session }),
            setProfile: (profile) => set({ profile }),
            setLoading: (loading) => set({ loading }),
            signOut: async () => {
                await supabase.auth.signOut();
                set({ user: null, session: null, profile: null });
            },
            refreshProfile: async () => {
                const user = get().user;
                if (!user) return;

                try {
                    const { data, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (!error) set({ profile: data });
                } catch (err) {
                    console.error('Error refreshing profile:', err);
                }
            },
        }),
        {
            name: 'ylh-auth-storage',
            partialize: (state) => ({
                user: state.user,
                session: state.session,
                profile: state.profile
            }),
        }
    )
);
