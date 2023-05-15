import { useSetAtom } from "jotai";
import { viewingDataAtom } from "@/pages/Mst_Transporter/components/store";

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
    console.log("rowIndex ", rowIndex, "data ", data);
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