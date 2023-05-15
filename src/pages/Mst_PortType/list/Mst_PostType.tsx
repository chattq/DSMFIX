import { useI18n } from "@/i18n/useI18n";
import { AdminPageLayout } from "@/layouts";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mst_PortType, SearchParam } from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAtomValue, useSetAtom } from "jotai";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
import { requiredType } from "@/packages/common/Validation_Rules";
import { DataGrid } from "devextreme-react";

export const Mst_PortTypePage = () => {
  const api = useClientgateApi();
  const config = useConfiguration();
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom); 
  const { t } = useI18n("Mst_PortType");
  let gridRef: any = useRef(null);
  const showError = useSetAtom(showErrorAtom);
  const { data, isSuccess, isLoading, refetch } = useQuery(
    ["PortType", keyword],
    () =>
      api.getPortType({
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

  const handleAddNew = () => {
    gridRef.current?.instance.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_Port_Type_Upload(file);
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
    const resp = await api.Mst_PortType_ExportExcelTemplate();
    if (resp.isSuccess) {
      window.location.href = resp.Data;
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        // mã cảng , tên cảng , trạng thái
        dataField: "PortType",
        caption: t("PortType"),
        editorType: "dxTextBox",
        validationRules: [requiredType],
      },
      {
        // mã cảng , tên cảng , trạng thái
        dataField: "PortTypeName",
        caption: t("PortTypeName"),
        editorType: "dxTextBox",
        validationRules: [requiredType],
      },
    ],
    []
  );

  const onDelete = async (id: string) => {
    const respone = await api.Mst_PortType_Delete(id);
    if (respone.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
      throw new Error(respone.errorCode);
    }
  };

  const onCreate = async (data: Mst_PortType) => {
    const respone = await api.Mst_PortType_Create(data);
    if (respone.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
      throw new Error(respone.errorCode);
    }
  };

  const onUpdate = async (key: string, data: Partial<Mst_PortType>) => {
    const respone = await api.Mst_PortType_Update(key, data);
    if (respone.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
      throw new Error(respone.errorCode);
    }
  };

  const handleSaveRow = async (e: any) => {
    const { type } = e.changes[0];
    if (type === "remove") {
      const id = e.changes[0].key;
      e.promise = onDelete(id);
    } else if (type === "insert") {
      const data: Mst_PortType = e.changes[0].data;
      e.promise = onCreate(data);
    } else if (type === "update") {
      e.promise = onUpdate(e.changes[0].key, e.changes[0].data);
    }

    e.cancel = true;
  };

  const handleSelectionChanged = (rowKeys: string[]) => {
    setSelectedItems(rowKeys);
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "PortType") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (e: any) => {
    const respone = await api.Mst_PortType_DeleteMultiple(e);
    if (respone.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
      throw new Error(respone.errorCode);
    }
  };

  const handleReadyGrid = (grid: any) => {
    gridRef.current = grid;
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">{t("Mst_PortType")}</div>
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
          columns={columns}
          keyExpr={"PortType"}
          onSaveRow={handleSaveRow}
          onReady={handleReadyGrid}
          allowSelection={true}
          allowInlineEdit={true}
          inlineEditMode="row"
          onEditorPreparing={handleEditorPreparing}
          onSelectionChanged={handleSelectionChanged}
          isLoading={isLoading}
          dataSource={data?.DataList ?? []}
          onDeleteRows={handleDeleteRows}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
