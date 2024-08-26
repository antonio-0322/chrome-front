import { create } from 'zustand';

export const useExtensionInfoStore = create((set) => ({
  isExtension: true,
  setIsExtension: (data) => set((state) => ({ isExtension: data })),
}));
