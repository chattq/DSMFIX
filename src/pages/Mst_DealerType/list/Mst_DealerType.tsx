import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mst_DealerType, SearchParam } from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "./header-part";
import { useSetAtom, useAtomValue } from "jotai";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { DataGrid } from "devextreme-react";

export const Mst_DealerTypePage = () => {
  const { t } = useI18n("Mst_DealerType");
  const config = useConfiguration();
  let gridRef: any = useRef<DataGrid | null>(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const { data, isLoading, refetch } = useQuery(
    ["DealerType", keyword],
    () =>
      api.Mst_DealerType_Search({
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

  const onCreate = async (data: Partial<Mst_DealerType>) => {
    const respone = await api.Mst_DealerType_Create(data);
    if (respone.isSuccess) {
      toast.success(t("Created successfully"));
      await refetch();
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
    }
  };

  const onDelete = async (key: string) => {
    const respone = await api.Mst_DealerType_Delete(key);
    if (respone.isSuccess) {
      toast.success(t("Delete successfully"));
      await refetch();
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
    }
  };

  const onUpdate = async (key: string, data: Partial<Mst_DealerType>) => {
    const respone = await api.Mst_DealerType_Update(key, data);
    if (respone.isSuccess) {
      toast.success(t("Update successfully"));
      await refetch();
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
    }
  };

  const handleSave = async (e: any) => {
    console.log("e ", e);
    const { type } = e.changes[0];
    console.log("type ", type);
    if (type === "remove") {
      const key = e.changes[0].key;
      e.Promise = onDelete(key);
    } else if (type === "insert") {
      const data = {
        ...e.changes[0].data,
      };
      e.Promise = onCreate(data);
    } else if (type === "update") {
      const data = e.changes[0].data;
      const key = e.changes[0].key;
      e.Promise = onUpdate(key, data);
    }

    e.cancel = true;
  };

  const handleAddNew = () => {
    gridRef.current?.instance.addRow();
  };

  const handleUploadFile = async (file: File, pprogressCallback?: Function) => {
    const resp = await api.Mst_DealerType_Upload(file);
    if (resp.isSuccess) {
      toast.success(t("Upload Successfully"));
      await refetch();
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const onDownloadTemplate = async () => {
    const resp = await api.Mst_DealerType_ExportExcel_Template();
    if (resp.isSuccess) {
      toast.success(t("Download Successfully"));
      console.log("resp ", resp);
      window.location.href = resp.Data;
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };
  const handleSelectionChanged = (rowKeys: string[]) => {
    setSelectedItems(rowKeys);
  };
  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "DealerType",
        caption: t("DealerType"),
        editorType: "dxTextBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
        allowFiltering: true,
      },
      {
        dataField: "DealerTypeName",
        caption: t("DealerTypeName"),
        editorType: "dxTextBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
      },
    ];
  } , []);

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DealerType") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (e: any[]) => {
    const resp = await api.Mst_DealerType_DeleteMultiple(e);
    if (resp.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const handleGridReady = useCallback((grid: any) => {
    gridRef.current = grid;
  }, []);

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">{t("Mst_DealerType")}</div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center">
            <HeaderPart
              onAddNew={handleAddNew}
              onUploadFile={handleUploadFile}
              onDownloadTemplate={onDownloadTemplate}
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
          keyExpr="DealerType"
          allowInlineEdit={true}
          onReady={handleGridReady}
          onSaveRow={handleSave}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={handleEditorPreparing}
          onDeleteRows={handleDeleteRows}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
