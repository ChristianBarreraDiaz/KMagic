// sectionStore.ts
import { create } from "@/lib/zustand";

type SectionStore = {
  currentSection: string;
  setCurrentSection: (section: string) => void;
};

export const useSectionStore = create<SectionStore>((set) => ({
  currentSection: "",
  setCurrentSection: (section) => set({ currentSection: section }),
}));
