import { create } from "@/lib/zustand";

type NavbarToggleState = {
  isToggled: boolean;
  toggle: () => void;
};

export const useNavbarToggle = create<NavbarToggleState>((set) => ({
  isToggled: false,
  toggle: () => set((state) => ({ isToggled: !state.isToggled })),
}));
