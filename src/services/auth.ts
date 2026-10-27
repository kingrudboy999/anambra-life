import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type AuthMode = 'login' | 'signup';

export async function signInWithEmail(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
  return data;
}

export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName ?? 'Anambra User',
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export { supabase, isSupabaseConfigured };
