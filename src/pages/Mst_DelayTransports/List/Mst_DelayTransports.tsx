import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_Dealer,
  Mst_DelayTransports,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "./header-part";
import { useSetAtom, useAtomValue } from "jotai";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { StatusButton } from "@/packages/ui/status-button";

export const Mst_DelayTransportsPage = () => {
  const { t } = useI18n("Mst_DelayTransports");
  const config = useConfiguration();
  let gridRef: any = useRef(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedRowKeys = useRef<string[]>([]);
  const { data, isLoading, refetch } = useQuery(
    ["Mst_DelayTransports", keyword],
    () =>
      api.Mst_DelayTransports_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listDealer } = useQuery(["dealer"], () =>
    api.Mst_Dealer_GetAllActive()
  );

  const { data: listStorage } = useQuery(["storage"], () =>
    api.Mst_Storage_GetAllActive()
  );

  console.log("listDealer ", listDealer, "listStorage ", listStorage);

  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  const onCreate = async (data: Partial<Mst_DelayTransports>) => {
    const respone = await api.Mst_DelayTransports_Create(data);
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
    const respone = await api.Mst_DelayTransports_Delete(key);
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

  const onUpdate = async (key: string, data: Partial<Mst_DelayTransports>) => {
    const respone = await api.Mst_DelayTransports_Update(key, data);
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
    const { type } = e.changes[0];
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
    if (gridRef?.instance) {
      gridRef.instance.addRow();
    }
  };

  const handleUploadFile = async (file: File, pprogressCallback?: Function) => {
    const resp = await api.Mst_DelayTransports_Upload(file);
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
    const resp = await api.Mst_DelayTransports_ExportExcel_Template();
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
  const columns: ColumnOptions[] = [
    {
      dataField: "StorageCode",
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
      allowFiltering: false,
      setCellValue: (newData: any, value: any, currentRowData: any) => {
        if (value !== undefined && value !== null) {
          const data = listStorage?.DataList ?? [];
          const item = data.find(
            (item: Partial<Mst_DelayTransports>) => item.StorageCode === value
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
      dataField: "StorageName",
      caption: t("StorageName"),
      allowFiltering: false,
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      allowFiltering: false,
      editorType: "dxSelectBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
      editorOptions: {
        dataSource: listDealer?.DataList || [],
        displayExpr: "DealerCode",
        valueExpr: "DealerCode",
      },
      setCellValue: (newData: any, value: any, currentRowData: any) => {
        if (value !== undefined && value !== null) {
          const data = listDealer?.DataList ?? [];
          const itemFind = data.find(
            (item: Partial<Mst_Dealer>) => item.DealerCode === value
          );
          if (itemFind) {
            newData.DealerName = itemFind.DealerName;
          } else {
            newData.DealerName = "";
          }
        }
        newData.DealerCode = value;
      },
    },
    {
      dataField: "DealerName",
      allowFiltering: false,
      caption: t("DealerName"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "DelayTransport",
      caption: t("DelayTransport"),
      editorType: "dxTextBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
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

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DealerCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "StorageCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (e: any[]) => {
    const resp = await api.Mst_DelayTransports_DeleteMultiple(e);
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
              {t("Mst_DelayTransports")}
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
          columns={columns}
          allowSelection={true}
          dataSource={data?.DataList ?? []}
          inlineEditMode="row"
          keyExpr={["StorageCode", "DealerCode"]}
          allowInlineEdit={true}
          onReady={(ref) => (gridRef = ref)}
          onSaveRow={handleSave}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={handleEditorPreparing}
          onDeleteRows={handleDeleteRows}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
