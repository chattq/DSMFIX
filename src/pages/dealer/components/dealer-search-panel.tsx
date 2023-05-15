import {SearchPanelV2} from "@packages/ui/search-panel";
import {SearchDealerParam} from "@packages/types";
import {memo, useMemo, useState} from "react";
import {IItemProps} from "devextreme-react/form";
import {useI18n} from "@/i18n/useI18n";
import {useAtom, useSetAtom} from "jotai";
import {searchConditionAtom} from "@/pages/dealer/components/dealer-store";

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
interface DealerSearchPanelProps {
  data: SearchDealerParam
  onSearch?: (data: SearchDealerParam) => void
}
export const DealerSearchPanel = memo(function SearchPanel({data, onSearch}: DealerSearchPanelProps) {
  const {t} = useI18n("Dealer")
  // const setSearchConditions = useSetAtom(searchConditionAtom)
  
  const items: IItemProps[] = [
    {
      caption: t("Dealer Code"),
      dataField: 'DealerCode',
      editorType: 'dxTextBox',
      editorOptions: {
        placeholder: t('Input'),
      }
    },
    {
      dataField: 'DealerName',
      caption: t("Dealer Name"),
      editorType: 'dxTextBox',
      editorOptions: {
        placeholder: t('Input'),
      }
    },
    {
      dataField: 'FlagAutoLXX',
      caption: t("Flag Auto LXX"),
      editorType: 'dxSelectBox',
      editorOptions: flagEditorOptions
    },
    {
      dataField: 'FlagAutoMapVIN',
      caption: t("Flag Auto Map VIN"),
      editorType: 'dxSelectBox',
      editorOptions: flagEditorOptions
    },
    {
      dataField: 'FlagAutoSOAppr',
      caption: t("Flag Auto SO Appr"),
      editorType: 'dxSelectBox',
      editorOptions: flagEditorOptions
    },
    {
      dataField: 'FlagActive',
      caption: t("Flag Active"),
      editorType: 'dxSelectBox',
      editorOptions: {
        searchEnabled: true,
        valueExpr: 'value',
        displayExpr: 'text',
        items: [
          {
            value: '',
            text: t('All')
          },
          {
            value: '1',
            text: t('Active')
          },
          {
            value: '0',
            text: t('Inactive')
          }
        ]
      }
    },
  ]
  const handleSearch = (value: any) => {
    console.log('data:', data)
    // setSearchConditions({
    //   ...value
    // })
    onSearch?.(data)
  }
  return (
    <SearchPanelV2 conditionFields={items}
                   data={data}
                   onSearch={handleSearch}
    />
  )
})
