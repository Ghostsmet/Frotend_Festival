import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface UserState {
  isAdmin: boolean;
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role: 'user' | 'admin', name?: string, realToken?: string) => void;
  logout: () => void;
  updateUserProfile: (name: string, email: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAdmin: false,
  isAuthenticated: false,
  user: null,
  token: null,

  login: (email, password, role, name, realToken) => {
    const tokenToSave = realToken || `mock-token-${Date.now()}`;
    localStorage.setItem('token', tokenToSave);
    localStorage.setItem('user', JSON.stringify({
      name: name || email.split('@')[0],
      email: email,
      role: role
    }));

    set({
      isAuthenticated: true,
      isAdmin: role === 'admin',
      user: {
        name: name || email.split('@')[0],
        email: email,
        role: role
      },
      token: tokenToSave
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
      token: null
    });
  },

  updateUserProfile: (name, email) => {
    set((state) => {
      if (!state.user) return state;
      
      const updatedUser = { ...state.user, name, email };
      localStorage.setItem('user', JSON.stringify({
        name, email, role: state.user.role
      }));
      
      return { ...state, user: updatedUser };
    });
  }
}));