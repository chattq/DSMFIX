import { useSetAtom } from "jotai";
import { viewingDataAtom } from "./Mst_CarStdOptStore";

export interface LinkCellProps<T extends string, E> {
  rowIndex: number;
  value: T;
  rowData: E;
  onClick?: (rowIndex: number, data: E) => void;
}
export const LinkCell = <T extends string, E>({
  rowIndex,
  value,
  rowData,
  onClick,
}: LinkCellProps<T, E>) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: E) => {
    console.log("viewRow", rowIndex, data);
    setViewingItem({
      rowIndex,
      item: data,
    });
    onClick?.(rowIndex, data);
  };
  return (
    <a href={"#"} onClick={() => viewRow(rowIndex, rowData)}>
      {value}
    </a>
  );
};
