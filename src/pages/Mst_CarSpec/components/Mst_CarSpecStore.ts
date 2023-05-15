import { Mst_CarSpec } from "@packages/types";
import { atom } from "jotai";
export const selectedItemsAtom = atom<string[]>([]);

export const searchParams = atom<any>({
  SpecCode: "",
  SpecDescription: "",
  AssemblyStatus: "",
  FlagActive: "",
});

export enum ViewMode {
  Readonly = "readonly",
  Edit = "edit",
}

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Mst_CarSpec | undefined>(undefined);

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
