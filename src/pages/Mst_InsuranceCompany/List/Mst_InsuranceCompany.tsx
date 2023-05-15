import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_InsuranceCompany,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
import { StatusButton } from "@/packages/ui/status-button";
export const Mst_InsuranceCompanyPage = () => {
  const { t } = useI18n("Mst_InsuranceCompany");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  let gridRef: any = useRef(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);

  // call api posttyle search
  const { data, isLoading, refetch } = useQuery(
    ["Mst_InsuranceCompany", keyword],
    () =>
      api.Mst_InsuranceCompany_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
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

  const handleAddNew = () => {
    if (gridRef._instance) {
      gridRef._instance.addRow();
    }
  };
  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_InsuranceCompany_Upload(file);
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

  const handleSelectionChanged = (rowKeys: string[]) => {
    setSelectedItems(rowKeys);
  };
  // khi mà tác động vào thằng row thì gọi thằng này
  const handleSavingRow = async (e: any) => {
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        const data: Mst_InsuranceCompany = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (id: string) => {
    const resp = await api.Mst_InsuranceCompany_Delete(id);
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

  const onDownloadTemplate = async () => {
    const resp = await api.Mst_InsuranceCompany_ExportTemplate();
    if (resp.isSuccess) {
      toast.success(t("Download Successfully"));
      window.location.href = resp.Data;
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const onCreate = async (data: Mst_InsuranceCompany) => {
    const obj = {
      ...data,
      FlagActive: data?.FlagActive ? 1 : 0,
    };
    const resp = await api.Mst_InsuranceCompany_Create(obj);
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
  const onUpdate = async (key: string, data: Partial<Mst_InsuranceCompany>) => {
    const obj = {
      ...data,
      FlagActive: data?.FlagActive ? 1 : 0,
    };
    const resp = await api.Mst_InsuranceCompany_Update(key, obj);
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
      dataField: "InsCompanyCode", // Mã hãng bảo hiểm
      caption: t("InsCompanyCode"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      validationRules: [
        {
          type: "required",
        },
        {
          type: "pattern",
          pattern: /[a-zA-Z0-9]/,
        },
      ],
    },
    {
      dataField: "InsCompanyName", // Tên hãng
      caption: t("InsCompanyName"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "Remark", // Mô tả
      caption: t("Remark"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "FlagActive", // Trạng thái
      caption: t("Flag Active"),
      editorType: "dxSwitch",
      visible: true,
      alignment: "center",
      width: 120,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
  ];

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    // if (e.dataField === "CustomerBaseCode") {
    //   e.editorOptions.readOnly = true;
    // }
    if (e.dataField === "InsCompanyCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_InsuranceCompany_Delete_Multiple(rows);
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

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              {t("Mst_InsuranceCompany")}
            </div>
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
          dataSource={data?.DataList ?? []}
          columns={columns}
          keyExpr="InsCompanyCode"
          allowSelection={true}
          allowInlineEdit={true}
          onReady={(ref) => (gridRef = ref)}
          onEditorPreparing={handleEditorPreparing}
          onSelectionChanged={handleSelectionChanged}
          onSaveRow={handleSavingRow}
          inlineEditMode={"row"}
          onDeleteRows={handleDeleteRows}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
