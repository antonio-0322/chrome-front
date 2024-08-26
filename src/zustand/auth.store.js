import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  auth: {
    email: '',
  },
  userData: null,
  userState: 'pending',
  setEmail: (auth) =>
    set({
      auth,
    }),
  setUserData: (data) => set((state) => ({ userData: data })),
  setUserState: (value) => set(() => ({ userState: value })),
}));
