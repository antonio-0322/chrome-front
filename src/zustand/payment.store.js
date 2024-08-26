import { create } from 'zustand';

export const usePaymentStore = create((set) => ({
  plans: [],
  setPlans: (data) => set(() => ({ plans: data })),
}));
