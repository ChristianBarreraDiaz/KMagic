import { create } from "@/lib/zustand";

interface ResetToggleStore {
  reset: boolean;
  setReset: (value: boolean) => void;
}

export const useResetStore = create<ResetToggleStore>((set) => ({
  reset: false,
  setReset: (value: boolean) => set({ reset: value }),
}));
