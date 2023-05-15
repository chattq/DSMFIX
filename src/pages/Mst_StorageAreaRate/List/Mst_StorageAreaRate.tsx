import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_CarColor,
  Mst_CarModel,
  Mst_CarSpec,
  Mst_Storage,
  Mst_StorageAreaRate,
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
import { DataGrid } from "devextreme-react";
export const Mst_StorageAreaRatePage = () => {
  const { t } = useI18n("Mst_StorageAreaRate");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  let gridRef: any = useRef<DataGrid | null>(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);

  // call api posttyle search
  const { data, isLoading, refetch } = useQuery(
    ["Mst_StorageAreaRate", keyword],
    () =>
      api.Mst_StorageAreaRate_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listStorage, isLoading: isLoadingListStorage } = useQuery(
    ["listStorage"],
    () => api.Mst_Storage_GetAllActive()
  );
  const { data: listModal, isLoading: isLoadingListModal } = useQuery(
    ["listModal"],
    () => api.Mst_CarModel_GetAllActive()
  );
  const { data: listSpec, isLoading: isLoadingListSpe } = useQuery(
    ["listSpec"],
    () => api.Mst_CarSpec_GetAllActive()
  );
  const { data: listColor, isLoading: isLoadingListColor } = useQuery(
    ["listColor"],
    () => api.Mst_CarColor_GetAllActive()
  );

  const ColorValue = (options: any) => {
    // console.log("options 123", options);
    return listColor?.DataList ?? [];
  };

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
    const resp = await api.Mst_StorageAreaRate_Upload(file);
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
        const data: Mst_StorageAreaRate = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (data: any) => {
    const resp = await api.Mst_StorageAreaRate_Delete(data);
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
    const resp = await api.Mst_StorageAreaRate_ExportExcel_Template();
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

  const onCreate = async (data: Mst_StorageAreaRate) => {
    const resp = await api.Mst_StorageAreaRate_Create(data);
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
  const onUpdate = async (
    key: Partial<Mst_StorageAreaRate>,
    data: Partial<Mst_StorageAreaRate>
  ) => {
    const resp = await api.Mst_StorageAreaRate_Update(key, data);
    if (resp.isSuccess) {
      toast.success(t("Upload Successfully"));
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
        dataField: "StorageCode", // Ma kho
        caption: t("StorageCode"),
        editorType: "dxSelectBox",
        visible: true,
        editorOptions: {
          dataSource: listStorage?.DataList ?? [],
          displayExpr: "StorageCode",
          valueExpr: "StorageCode",
        },
        validationRules: [
          {
            type: "required",
          },
        ],
        setCellValue: (newData: any, value: any, currentRowData: any) => {
          if (value !== undefined && value !== null) {
            const data = listStorage?.DataList ?? [];
            const item = data.find(
              (item: Partial<Mst_Storage>) => item.StorageCode === value
            );
            if (item) {
              newData.StorageName = item.StorageName;
            } else {
              newData.StorageName = "";
            }
          }
          newData.StorageCode = value;
        },
      },
      {
        dataField: "ModelCode", // Mã model
        caption: t("ModelCode"),
        editorType: "dxSelectBox",
        lookup: {
          dataSource: listModal?.DataList ?? [],
          displayExpr: "ModelCode",
          valueExpr: "ModelCode",
        },
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
        setCellValue: (newValue: any, value: any) => {
          newValue.ModelCode = value;
          const data = listModal?.DataList ?? [];
          const dataValue = data.find((item) => {
            return item.ModelCode === value;
          });
          if (dataValue) {
            newValue.ModelName = dataValue.ModelName;
          }
          newValue.SpecCode = "";
          newValue.SpecDescription = "";
          newValue.ColorExtCode = "";
          newValue.ColorExtNameVN = "";
        },
      },
      {
        dataField: "ModelName", // tên modal
        caption: t("ModelName"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "SpecCode", // Mã spec
        caption: t("SpecCode"),
        editorType: "dxSelectBox",
        visible: true,
        lookup: {
          dataSource: (options: any) => {
            console.log("object spec ", {
              store: listSpec?.DataList ?? [],
              filter: options.data?.ModelCode
                ? ["ModelCode", "=", options.data?.ModelCode]
                : null,
            });

            return {
              store: listSpec?.DataList ?? [],
              filter: options.data?.ModelCode
                ? ["ModelCode", "=", options.data?.ModelCode]
                : null,
            };
          },
          displayExpr: "SpecCode",
          valueExpr: "SpecCode",
        },
        editorOptions: {
          // valueExpr: "SpecCode",
        },
        validationRules: [
          {
            type: "required",
          },
        ],
        setCellValue: (newValue: any, value: any) => {
          newValue.SpecCode = value;
          const data = listSpec?.DataList ?? [];
          const dataValue = data.find((item) => {
            return item.SpecCode === value;
          });
          if (dataValue) {
            newValue.SpecDescription = dataValue.SpecDescription;
          }
        },
      },
      {
        dataField: "SpecDescription", // Đặc tả xe
        caption: t("SpecDescription"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "ColorExtCode", // Mã màu ngoại thất
        caption: t("ColorExtCode"),
        editorType: "dxSelectBox",
        visible: true,
        lookup: {
          dataSource: (options: any) => {
            return {
              store: listColor?.DataList ?? [],
              filter: options.data?.ModelCode
                ? ["ModelCode", "=", options.data?.ModelCode]
                : null,
            };
          },
          displayExpr: "ColorCode",
          valueExpr: "ColorCode",
        },
        validationRules: [
          {
            type: "required",
          },
        ],
        setCellValue: (newValue: any, value: string) => {
          newValue.ColorExtCode = value;
          const data = listColor?.DataList ?? [];
          const dataValue = data.find((item: any) => {
            return item.ColorCode === value;
          });
          if (dataValue) {
            newValue.ColorExtNameVN = dataValue.ColorExtNameVN;
          }
        },
      },
      {
        dataField: "ColorExtNameVN", // Tên màu ngoại thất
        caption: t("ColorExtNameVN"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "MBVal", // Tỷ lệ cầu map miền bắc
        caption: t("MBVal"),
        editorType: "dxNumberBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
      },
      {
        dataField: "MTVal", // Tỷ lệ cầu map miền trung
        caption: t("MTVal"),
        editorType: "dxNumberBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
      },
      {
        dataField: "MNVal", // Tỷ lệ cầu map miền nam
        caption: t("MNVal"),
        editorType: "dxNumberBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
      },
    ],
    [listStorage, listModal, listSpec, listColor]
  );

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (
      e.dataField === "ModelCode" ||
      e.dataField === "ColorExtCode" ||
      e.dataField === "SpecCode" ||
      e.dataField === "StorageCode"
    ) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (!e?.row?.data.ModelCode) {
      if (e.dataField === "ColorExtCode") {
        e.editorOptions.readOnly = true;
      }
      if (e.dataField === "SpecCode") {
        e.editorOptions.readOnly = true;
      }
    }
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_StorageAreaRate_DeleteMultiple(rows);
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
              {t("Mst_StorageAreaRate")}
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
          isLoading={
            isLoading ||
            isLoadingListStorage ||
            isLoadingListModal ||
            isLoadingListSpe ||
            isLoadingListColor
          }
          defaultPageSize={config.PAGE_SIZE}
          dataSource={data?.DataList ?? []}
          columns={columns}
          keyExpr={["StorageCode", "ModelCode", "SpecCode", "ColorExtCode"]}
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
