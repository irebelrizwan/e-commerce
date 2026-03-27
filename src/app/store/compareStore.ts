import { create } from "zustand";

type CompareState = {
  items: number[];
  toggleCompare: (id: number) => void;
};

export const useCompare = create<CompareState>((set) => ({
  items: [],

  toggleCompare: (id) =>
    set((state) => {
      let updated;

      if (state.items.includes(id)) {
        updated = state.items.filter((i) => i !== id);
      } else {
        updated = [...state.items, id];
      }

      console.log("COMPARE STATE:", updated); // DEBUG

      return { items: updated };
    }),
}));