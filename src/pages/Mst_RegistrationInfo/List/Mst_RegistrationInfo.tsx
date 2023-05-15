import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_RegistrationInfo,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
import { StatusButton } from "@/packages/ui/status-button";
import { DataGrid } from "devextreme-react";
export const Mst_RegistrationInfoPage = () => {
  const { t } = useI18n("Mst_RegistrationInfo");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  let gridRef: any = useRef<DataGrid | null>(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);

  // call api posttyle search
  const { data, isLoading, refetch } = useQuery(
    ["PortType", keyword],
    () =>
      api.Mst_RegistrationInfo_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listProvince, isLoading: isLoadingProvinces } = useQuery(
    ["Provinces"],
    () => api.Mst_Province_GetAllActive(),
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
    gridRef.current?.instance?.addRow();
  };
  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_RegistrationInfo_Upload(file);
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
    console.log("e ", e);
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        const data: Mst_RegistrationInfo = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (id: Partial<Mst_RegistrationInfo>) => {
    const resp = await api.Mst_RegistrationInfo_Delete(id);
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
    const resp = await api.Mst_RegistrationInfo_ExportExcel_Template();
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

  const onCreate = async (data: Mst_RegistrationInfo) => {
    const resp = await api.Mst_RegistrationInfo_Create(data);
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
  const handleGridReady = useCallback((grid: any) => {
    gridRef.current = grid;
  }, []);
  const onUpdate = async (
    key: Partial<Mst_RegistrationInfo>,
    data: Partial<Mst_RegistrationInfo>
  ) => {
    const resp = await api.Mst_RegistrationInfo_Update(key, data);
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

  const columns: ColumnOptions[] = useMemo<any>(
    () => [
      {
        dataField: "RegistYear", // Năm
        caption: t("RegistYear"),
        editorType: "dxNumberBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
        allowFiltering: true,
      },
      {
        dataField: "ProvinceCode", // Mã tỉnh
        caption: t("ProvinceCode"),
        allowFiltering: false,
        validationRules: [
          {
            type: "required",
          },
        ],
        editorType: "dxSelectBox",
        visible: true,
        editorOptions: {
          dataSource: listProvince?.DataList ?? [],
          displayExpr: "ProvinceCode",
          valueExpr: "ProvinceCode",
        },
        setCellValue: (newValue: any, value: any) => {
          console.log("newValue ", newValue, "value", value);
          newValue.ProvinceCode = value;
          newValue.ProvinceName = value;
          console.log("newValue ", newValue, "value", value);
        },
      },
      {
        dataField: "ProvinceName", // Mã tỉnh
        caption: t("ProvinceName"),
        allowFiltering: false,
        editorType: "dxSelectBox",
        visible: true,
        editorOptions: {
          readOnly: true,
          dataSource: listProvince?.DataList ?? [],
          displayExpr: "ProvinceName",
          valueExpr: "ProvinceCode",
        },
      },
      {
        dataField: "Qty", // Số lượng xe Hyundai
        caption: t("Qty"),
        allowFiltering: false,
        editorType: "dxNumberBox",
        visible: true,
      },
      {
        dataField: "RegistPercent", // Thị phần
        caption: t("RegistPercent"),
        allowFiltering: false,
        editorType: "dxNumberBox",
        validationRules: [
          {
            type: "required",
          },
        ],
        visible: true,
      },
      {
        dataField: "TotalAmount", // Tổng dung lượng thị trường
        caption: t("TotalAmount"),
        allowFiltering: false,
        editorType: "dxNumberBox",
        visible: true,
      },
    ],
    [listProvince]
  );

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    // console.log("e ", e);
    if (e.dataField === "ProvinceCode" || e.dataField === "RegistYear") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: any[]) => {
    const resp = await api.Mst_RegistrationInfo_DeleteMultiple(rows);
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
              {t("Mst_RegistrationInfo")}
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
          isLoading={isLoading || isLoadingProvinces}
          defaultPageSize={config.PAGE_SIZE}
          dataSource={data?.DataList ?? []}
          columns={columns}
          keyExpr={["RegistYear", "ProvinceCode"]}
          allowSelection={true}
          allowInlineEdit={true}
          onReady={handleGridReady}
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
