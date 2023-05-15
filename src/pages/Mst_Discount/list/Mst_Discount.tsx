import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, SearchParam } from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export const Mst_DiscountPage = () => {
  const { t } = useI18n("Mst_Discount");
  const config = useConfiguration();
  const [keyword, setKeyword] = useState<string>("");
  let gridRef: any = useRef(null);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedRowKeys = useRef<string[]>([]);
  const { data, isLoading, refetch } = useQuery(
    ["Discount", keyword],
    () =>
      api.Mst_Discount_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  const handleSearch = (keyword: any) => {
    setKeyword(keyword);
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "EffectiveDate",
      caption: t("EffectiveDate"),
      editorType: "dxTextBox",
      visible: true,
      allowFiltering: true,
    },
    {
      dataField: "DiscountPercent",
      caption: t("DiscountPercent"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "PenaltyPercent",
      caption: t("PenaltyPercent"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "FnExpPercent",
      caption: t("FnExpPercent"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "PmtDsTCGPercent",
      caption: t("PmtDsTCGPercent"),
      editorType: "dxTextBox",
      visible: true,
    },
  ];

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">{t("Mst_Discount")}</div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center">
            <HeaderForm
              onSearch={handleSearch}
              onAddNew={() => {}}
              selectedItems={selectedRowKeys.current}
            />
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <BaseGridView
          isLoading={isLoading}
          defaultPageSize={config.PAGE_SIZE}
          columns={columns}
          allowSelection={true}
          dataSource={data?.DataList ?? []}
          inlineEditMode="row"
          keyExpr=""
          allowInlineEdit={true}
          onReady={(ref) => (gridRef = ref)}
          onSelectionChanged={() => {}}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
