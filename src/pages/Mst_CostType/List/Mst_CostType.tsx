import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_Dealer,
  Mst_CostType,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { StatusButton } from "@/packages/ui/status-button";

export const Mst_CostTypePage = () => {
  const { t } = useI18n("Mst_CostType");
  const config = useConfiguration();
  let gridRef: any = useRef(null);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const { data, isLoading, refetch } = useQuery(
    ["useMstCostTypeApi"],
    () => api.Mst_CostType_GetByContractUpdateType(),
    {}
  );

  console.log("data", data);

  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  const columns: ColumnOptions[] = [
    {
      dataField: "CostType",
      caption: t("CostType"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "CostTypeName",
      caption: t("CostTypeName"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      allowFiltering: false,
      editorType: "dxSwitch",
      visible: true,
      alignment: "center",
      width: 135,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
  ];

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">{t("Mst_CostType")}</div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center"></PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <BaseGridView
          isLoading={isLoading}
          defaultPageSize={config.PAGE_SIZE}
          columns={columns}
          allowSelection={false}
          dataSource={data ? data?.DataList ?? [] : []}
          inlineEditMode="row"
          keyExpr={["CostType"]}
          allowInlineEdit={false}
          onReady={(ref) => (gridRef = ref)}
          onSelectionChanged={() => {}}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
