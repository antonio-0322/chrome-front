import {create} from 'zustand'

export const useUserStore = create((set) => ({
    info: {

    },
    isLoggedIn: false,
    setUser: (user) => set({
        user,
      }),
}))
 