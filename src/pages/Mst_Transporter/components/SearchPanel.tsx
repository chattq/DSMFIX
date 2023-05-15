import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import Form, { IItemProps } from "devextreme-react/form";
import { useEffect } from "react";
import {
  Header,
  SearchPanel as CommonSearchPanel,
} from "@/packages/ui/search-panel";

interface SearchPanelProps {
  conditionFields?: IItemProps[];
  onSearch?: (values: any) => void;
  data?: any;
}

const flagEditorOptions = {
  searchEnabled: true,
  valueExpr: "value",
  displayExpr: "text",
  items: [
    {
      value: "1",
      text: "1",
    },
    {
      value: "0",
      text: "0",
    },
  ],
};
export const SearchPanel = ({
  conditionFields = [],
  onSearch,
  data,
}: SearchPanelProps) => {
  // màn hình search
  const { t } = useI18n("Common");
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom); // hàm này dùng để thay đổi trạng thái của state
  const onToggleSettings = () => {
    console.log("togger");
  };
  // console.log("search:", data);
  let formData = {};
  useEffect(() => {
    formData = {
      ...formData,
      ...data,
    };
  }, []);
  const handleSearch = () => {
    // console.log("search form:", formData);
    onSearch?.(formData);
  };
  const onClose = () => {
    // đóng màn hình nav search
    setSearchPanelVisible(false);
  };
  // điều kiện form ở trong nav search
  const formItems: IItemProps[] = [
    ...conditionFields, // default
    {
      caption: t("TransporterCode"),
      dataField: "TransporterCode",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "TransporterName",
      caption: t("TransporterName"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      editorType: "dxSelectBox",
      editorOptions: flagEditorOptions,
    },
    {
      itemType: "button",
      cssClass: "w-full flex items-center justify-center",
      buttonOptions: {
        text: t("Search"),
        stylingMode: "contained",
        type: "default",
        width: "100%",
        onClick: handleSearch,
      },
    },
  ];
  return (
    <CommonSearchPanel
      onClose={onClose}
      data={data}
      items={formItems}
      onToggleSettings={onToggleSettings}
    />
  );
};
