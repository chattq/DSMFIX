import { atom } from "jotai";
import { Mst_Transporter } from "@packages/types";
export const selecteItemsAtom = atom<any[]>([]);

export enum ViewMode {
  ReadOnly = "readonly",
  Edit = "edit",
}

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Mst_Transporter | undefined>(undefined);

export const viewingDataAtom = atom(
  (get) => {
    return {
      rowIndex: get(viewingRowAtom),
      item: get(viewingItemAtom),
    };
  },
  (get, set, data) => {
    if (!data) {
      set(viewingRowAtom, undefined);
      set(viewingItemAtom, undefined);
    } else {
      const { rowIndex, item } = data as any;
      set(viewingRowAtom, rowIndex);
      set(viewingItemAtom, item);
    }
  }
);
