import { supabase } from '../utils/supabase';

export interface User {
  id: string;
  email: string;
  name: string;
  isNewUser: boolean;
}

export const authService = {
  async signUp(email: string, password: string, name: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Sign up failed');
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata?.name || '',
      isNewUser: true,
    };
  },

  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Sign in failed');
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata?.name || '',
      isNewUser: false,
    };
  },

  async signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  },

  async signInWithGitHub(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || '',
      isNewUser: false,
    };
  },
};
