import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_AmplitudeApprOrd,
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
export const Mst_AmplitudeApprOrdPage = () => {
  const { t } = useI18n("Mst_AmplitudeApprOrd");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  let gridRef: any = useRef<DataGrid | null>(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);

  const { data: listModel, isLoading: isLoadingModel } = useQuery(
    ["model"],
    () => api.Mst_CarModel_GetAllActive()
  );
  const { data: listDealer, isLoading: isLoadingDealer } = useQuery(
    ["dealer"],
    () => api.Mst_Dealer_GetAllActive()
  );

  // call api posttyle search
  const { data, isLoading, refetch } = useQuery(
    ["Mst_AmplitudeApprOrd", keyword],
    () =>
      api.Mst_AmplitudeApprOrd_Search({
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
    gridRef.current?.instance?.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_AmplitudeApprOrd_Upload(file);
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
        const data: Mst_AmplitudeApprOrd = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (id: any) => {
    const resp = await api.Mst_AmplitudeApprOrd_Delete(id);
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
    const resp = await api.Mst_AmplitudeApprOrd_ExportExcel_Template();
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

  const onCreate = async (data: Mst_AmplitudeApprOrd) => {
    const resp = await api.Mst_AmplitudeApprOrd_Create(data);
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

  const onUpdate = async (key: any, data: Partial<Mst_AmplitudeApprOrd>) => {
    const resp = await api.Mst_AmplitudeApprOrd_Update(key, data);
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
        dataField: "DealerCode",
        caption: t("DealerCode"),
        visible: true,
        editorType: "dxSelectBox",
        validationRules: [
          {
            type: "required",
          },
        ],
        editorOptions: {
          displayExpr: "DealerCode",
          valueExpr: "DealerCode",
          dataSource: listDealer?.DataList ?? [],
        },
        setCellValue: (newValue: any, value: any) => {
          newValue.DealerCode = value;
          const data = listDealer?.DataList ?? [];
          const dataValue = data.find((item) => {
            return item.DealerCode === value;
          });
          if (dataValue) {
            newValue.md_DealerName = dataValue.DealerName;
          }
        },
      },
      {
        dataField: "md_DealerName",
        caption: t("md_DealerName"),
        visible: true,
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "ModelCode",
        caption: t("ModelCode"),
        visible: true,
        editorType: "dxSelectBox",
        validationRules: [
          {
            type: "required",
          },
        ],
        editorOptions: {
          displayExpr: "ModelCode",
          valueExpr: "ModelCode",
          dataSource: listModel?.DataList ?? [],
        },
        setCellValue: (newValue: any, value: any) => {
          newValue.ModelCode = value;
          const data = listModel?.DataList ?? [];
          const dataValue = data.find((item) => {
            return item.ModelCode === value;
          });
          if (dataValue) {
            newValue.mcm_ModelName = dataValue.ModelName;
          }
        },
      },
      {
        dataField: "mcm_ModelName",
        caption: t("mcm_ModelName"),
        visible: true,
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "AmplitudeOrdMax", // Biên độ đặt hàng (%)
        caption: t("AmplitudeOrdMax"),
        editorType: "dxNumberBox",
      },
      {
        dataField: "AmplitudePlanMax", //  Biên độ kế hoạch dự kiến (%)
        caption: t("AmplitudePlanMax"),
        editorType: "dxNumberBox",
      },
    ],
    [listModel, listDealer]
  );

  const handleGridReady = useCallback((grid: any) => {
    gridRef.current = grid;
  }, []);

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DealerCode") {
      // console.log("e ", e);
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "ModelCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (a: any) => {
    const resp = await api.Mst_AmplitudeApprOrd_DeleteMultiple(a);
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
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              {t("Mst_AmplitudeApprOrd")}
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
          isLoading={isLoading || isLoadingModel || isLoadingDealer}
          defaultPageSize={config.PAGE_SIZE}
          dataSource={data?.DataList ?? []}
          columns={columns}
          keyExpr={["DealerCode", "ModelCode"]}
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
