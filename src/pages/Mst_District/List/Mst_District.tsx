import { useI18n } from "@/i18n/useI18n";
import { AdminPageLayout } from "@/layouts";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_District,
  Mst_PortType,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
import { StatusButton } from "@/packages/ui/status-button";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";

export const Mst_DistrictPage = () => {
  const api = useClientgateApi();
  const config = useConfiguration();
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const { t } = useI18n("Mst_District");
  let gridRef: any = useRef(null);
  const selectedRowKeys = useRef<string[]>([]);

  const showError = useSetAtom(showErrorAtom);

  const { data, isSuccess, isLoading, refetch } = useQuery(
    ["PortType", keyword],
    () =>
      api.Mst_District_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listProvince } = useQuery(
    ["listProvince"],
    () => api.Mst_Province_GetAllActive(),
    {}
  );

  console.log("listProvince ", listProvince);

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
    if (gridRef.instance) {
      gridRef.instance.addRow();
    }
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    debugger;
    const resp = await api.Mst_District_Upload(file);
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
    const resp = await api.Mst_District_ExportTemplate();
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

  const flagActiveFilter = useMemo(() => {
    if (data?.isSuccess) {
      return data.DataList?.reduce((acc, cur) => {
        const value = cur.FlagActive;
        const existingItem = acc.find((item) => item.FlagActive === value);
        if (!existingItem) {
          acc.push({ FlagActive: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { FlagActive: string; count: number }[])
        .sort((a, b) => a.FlagActive?.localeCompare(b.FlagActive))
        .map((item) => ({
          text: `${t(`FlagActive.${item.FlagActive}`)} (${item.count})`,
          value: item.FlagActive,
        }));
    }
  }, [data]);

  const columns: ColumnOptions[] = [
    {
      // mã cảng , tên cảng , trạng thái
      dataField: "DistrictCode",
      caption: t("DistrictCode"),
      editorType: "dxTextBox",
      allowFiltering: true,
      editorOptions: {
        placeholder: t("Input"),
      },
      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      // mã cảng , tên cảng , trạng thái
      dataField: "ProvinceCode",
      caption: t("ProvinceCode"),
      editorType: "dxSelectBox",
      validationRules: [
        {
          type: "required",
        },
      ],
      editorOptions: {
        placeholder: t("Select"),

        dataSource: listProvince?.DataList ?? [],
        displayExpr: "ProvinceName",
        valueExpr: "ProvinceCode",
      },
    },
    {
      dataField: "DistrictName",
      caption: t("DistrictName"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      editorType: "dxSwitch",
      visible: true,
      alignment: "center",
      width: 120,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
      headerFilter: {
        dataSource: flagActiveFilter,
      },
    },
  ];

  const onDelete = async (id: string) => {
    const respone = await api.Mst_District_Delete(id);
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
    const respone = await api.Mst_DealerType_Create(data);
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
  const onUpdate = async (key: string, data: Partial<Mst_District>) => {
    const respone = await api.Mst_District_Update(key, data);
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

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_District_Delete_Multiple(rows);
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
            <div className="font-bold dx-font-m">{t("Mst_District")}</div>
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
          keyExpr={["DistrictCode", "ProvinceCode"]}
          onSaveRow={handleSaveRow}
          onReady={(ref) => (gridRef = ref)}
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
