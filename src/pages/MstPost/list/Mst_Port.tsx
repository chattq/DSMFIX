import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mst_Port, SearchParam } from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
export const Mst_PortPage = () => {
  const { t } = useI18n("Mst_Port");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  let gridRef: any = useRef(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  // call api posttyle search
  const { data, isLoading, refetch } = useQuery(
    ["PortType", keyword],
    () =>
      api.Mst_Port_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  // api portType
  const { data: ListPortType } = useQuery(
    ["PortTypes"],
    () => api.getPortTypeActive(),
    {}
  );

  const { data: listProvince } = useQuery(
    ["provinces"],
    () => api.Mst_Province_GetAllActive(),
    {}
  );

  const portAddressFilter = useMemo(() => {
    if (data?.isSuccess) {
      const valueFilt = data.DataList?.reduce((acc, cur) => {
        const value = cur.PortAddress;
        const existingItem = acc.find(
          (item: any) => item.PortAddress === value
        );
        if (!existingItem) {
          acc.push({ PortAddress: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { PortAddress: string; count: number }[])
        .sort((a: any, b: any) => a.PortAddress.localeCompare(b.PortAddress))
        .map((item: any) => ({
          text: `${item.PortAddress} (${item.count})`,
          value: item.PortAddress,
        }));
      return valueFilt;
    } else {
      return [];
    }
  }, [data]);

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
    const resp = await api.Mst_Port_Upload(file);
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
        const data: Mst_Port = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (id: string) => {
    const resp = await api.Mst_Port_Delete(id);
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
    const resp = await api.Mst_Port_DownloadTemplate();
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
  const onCreate = async (data: Mst_Port) => {
    const resp = await api.Mst_Port_Create(data);
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
  const onUpdate = async (key: string, data: Partial<Mst_Port>) => {
    const resp = await api.Mst_Port_Update(key, data);
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

  const PortCodeFilter = useMemo(() => {
    if (data?.isSuccess) {
      const dataValue = data.DataList?.reduce((acc, cur) => {
        const value = cur.PortAddress;
        const existingItem = acc.find(
          (item: any) => item.PortAddress === value
        );
        if (!existingItem) {
          acc.push({ PortAddress: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { PortAddress: string; count: number }[])
        .sort((a: any, b: any) => a.PortAddress.localeCompare(b.PortAddress))
        .map((item: any) => ({
          text: `${item.PortAddress} (${item.count})`,
          value: item.PortAddress,
        }));
      return dataValue;
    } else {
      return [];
    }
  }, [data]);

  const columns: ColumnOptions[] = [
    {
      dataField: "PortCode", // mã cảng
      caption: t("Port Code"),
      editorType: "dxTextBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
        {
          type: "pattern",
          pattern: /[a-zA-Z0-9]/,
        },
      ],
      headerFilter: {
        dataSource: PortCodeFilter,
      },
    },
    {
      dataField: "PortType", // loại cảng
      caption: t("Port Type"),
      editorType: "dxSelectBox",
      visible: true,
      allowFiltering: false,
      editorOptions: {
        placeholder: t("Select"),
        dataSource: ListPortType?.DataList ?? [],
        displayExpr: "PortType",
        valueExpr: "PortType",
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
      dataField: "PortName", // tên
      caption: t("Port Name"),
      editorType: "dxTextBox",
      visible: true,
      allowFiltering: false,
      editorOptions: {
        placeholder: t("Input"),
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
      dataField: "PortAddress", // Địa chỉ
      caption: t("PortAddress"),
      editorType: "dxTextBox",
      visible: true,
      allowFiltering: true,
      headerFilter: {
        dataSource: portAddressFilter,
      },
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "ProvinceCode", // Tỉnh thành
      caption: t("Province Code"),
      editorType: "dxSelectBox",
      visible: true,
      allowFiltering: false,

      validationRules: [
        {
          type: "required",
        },
        {
          type: "pattern",
          pattern: /[a-zA-Z0-9]/,
        },
      ],
      editorOptions: {
        dataSource: listProvince?.DataList ?? [],
        displayExpr: "ProvinceName",
        valueExpr: "ProvinceCode",
      },
    },
  ];

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "PortCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "PortType") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "ProvinceCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (e: string[]) => {
    const resp = await api.Mst_Port_DeleteMultiple(e);
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
            <div className="font-bold dx-font-m">{t("Mst_Port")}</div>
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
          keyExpr="PortCode"
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
