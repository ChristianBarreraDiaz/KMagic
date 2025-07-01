import { create } from "@/lib/zustand";

type Selected = {
  label: string;
  id: string;
};

// Define the store
// type Store = {
//   selected: Selected[];
//   setSelected: (newSelected: Selected[]) => void;
// };

// // Create the zustand store
// const useSelectedStore = create<Store>((set) => ({
//   selected: [],
//   setSelected: (newSelected: Selected[]) => set({ selected: newSelected }),
// }));

type Store = {
  selected: Selected[];
  setSelected: (newSelected: React.SetStateAction<Selected[]>) => void;
};

export const useSelectedStore = create<Store>((set) => ({
  selected: [],
  setSelected: (newSelected: React.SetStateAction<Selected[]>) => {
    set((state) => ({
      selected:
        typeof newSelected === "function"
          ? newSelected(state.selected)
          : newSelected,
    }));
  },
}));
