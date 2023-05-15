import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mng_Quota, SearchParam } from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { toast } from "react-toastify";
export const Mng_QuotaPage = () => {
  const { t } = useI18n("Mng_Quota");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  let gridRef: any = useRef(null);

  // call api posttyle search
  const { data, isLoading, refetch } = useQuery(
    ["Mng_Quota"],
    () =>
      api.Mng_Quota_Search({
        KeyWord: "",
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );
  // const { data: listModel } = useQuery(["Model"], () =>
  //   api.Mst_CarModel_GetAllActive()
  // );
  const { data: listDealer } = useQuery(["Dealer"], () =>
    api.Mst_CarModel_GetAllActive()
  );

  const { data: listSpec } = useQuery(["Dealer"], () =>
    api.Mst_CarSpec_GetAllActive()
  );

  // api portType
  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  const handleSelectionChanged = (rowKeys: string[]) => {};
  // khi mà tác động vào thằng row thì gọi thằng này
  const handleSavingRow = async (e: any) => {
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        const data: Mng_Quota = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (id: string) => {
    const resp = await api.Mng_Quota_Delete(id);
    if (resp.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  const onCreate = async (data: Mng_Quota) => {
    const obj = {
      ...data,
      FlagActive: data?.FlagActive ? 1 : 0,
    };
    const resp = await api.Mng_Quota_Create(obj);
    if (resp.isSuccess) {
      toast.success(t("Create Successfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  const onUpdate = async (key: string, data: Partial<Mng_Quota>) => {
    const obj = {
      ...data,
      FlagActive: data?.FlagActive ? 1 : 0,
    };
    const resp = await api.Mng_Quota_Update(key, obj);
    if (resp.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "DealerCode", // Số giấy chứng nhận thùng
      caption: t("DealerCode"),
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: listDealer?.DataList ?? [],
        valueEpxr: "DealerCode",
        displayEpxr: "DealerCode",
        readOnly: true,
      },
      validationRules: [
        {
          type: "required",
        },
      ],
      setCellValue: (newValue: any, value: any) => {
        newValue.DealerCode = value;
        newValue.md_DealerName = value;
      },
    },
    {
      dataField: "md_DealerName", // Số giấy chứng nhận thùng
      caption: t("md_DealerName"),
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: listDealer?.DataList ?? [],
        valueEpxr: "DealerCode",
        displayEpxr: "DealerName",
        readOnly: true,
      },
    },
    {
      dataField: "SpecCode", // Số giấy chứng nhận thùng
      caption: t("SpecCode"),
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: listDealer?.DataList ?? [],
        valueEpxr: "SpecCode",
        displayEpxr: "SpecCode",
        readOnly: true,
      },
      validationRules: [
        {
          type: "required",
        },
      ],
      setCellValue: (newValue: any, value: any) => {
        newValue.SpecCode = value;
        newValue.mcs_SpecDescription = value;
      },
    },
    {
      dataField: "mcs_SpecDescription", // Số giấy chứng nhận thùng
      caption: t("mcs_SpecDescription"),
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: listSpec?.DataList ?? [],
        valueEpxr: "SpecCode",
        displayEpxr: "SpecDescription",
        readOnly: true,
      },
    },
    {
      dataField: "mcm_ModelCode", // Trạng thái
      caption: t("mcm_ModelCode"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "mcm_ModelName", // Trạng thái
      caption: t("mcm_ModelName"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "QtyQuota", // Trạng thái
      caption: t("QtyQuota"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "UpdateBy", // User Cập nhật
      caption: t("UpdateBy"),
      editorType: "dxTextBox",
      visible: true,
    },
  ];

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField !== "QtyQuota") {
      e.editorOptions.readOnly = true;
    }
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">{t("Mng_Quota")}</div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center"></PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <BaseGridView
          isLoading={isLoading}
          defaultPageSize={config.PAGE_SIZE}
          dataSource={data?.DataList ?? []}
          columns={columns}
          keyExpr={["DealerCode", "SpecCode"]}
          allowSelection={false}
          allowInlineEdit={true}
          onReady={(ref) => (gridRef = ref)}
          onEditorPreparing={handleEditorPreparing}
          onSelectionChanged={handleSelectionChanged}
          onSaveRow={handleSavingRow}
          inlineEditMode={"row"}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
