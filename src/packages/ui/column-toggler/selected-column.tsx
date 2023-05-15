import {ColumnOptions} from "@packages/ui/base-gridview";
import {Button} from "devextreme-react";
import React from "react";

interface SelectedColumnProps {
  onClick: () => void;
  item: ColumnOptions;
}
export function SelectedColumn({item, onClick}: SelectedColumnProps) {
  return <div className={"flex justify-end items-center"}>
    <Button icon={"/images/icons/remove.svg"} stylingMode={"text"} className={"ml-auto"} onClick={onClick} />
    {item.caption}
  </div>;
}
