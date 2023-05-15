import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_InsuranceType,
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
export const Mst_InsuranceTypePage = () => {
  const { t } = useI18n("Mst_InsuranceType");
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
      api.Mst_InsuranceType_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listInsurenceCompany } = useQuery(
    ["listInsurenceCompany"],
    () => api.Mst_InsuranceCompany_GetAllActive(),
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
    const resp = await api.Mst_InsuranceType_Upload(file);
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
        const data: Mst_InsuranceType = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (id: string) => {
    const resp = await api.Mst_InsuranceType_Delete(id);
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
    const resp = await api.Mst_InsuranceType_ExportExcel_Template();
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

  const onCreate = async (data: Mst_InsuranceType) => {
    const resp = await api.Mst_InsuranceType_Create(data);
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
  const onUpdate = async (key: string, data: Partial<Mst_InsuranceType>) => {
    console.log("data", data, "key ", key);
    const respone = await api.Mst_InsuranceType_Update(key, data);
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

  const columns: ColumnOptions[] = [
    {
      dataField: "InsCompanyCode", // Mã hãng bảo hiểm
      caption: t("InsCompanyCode"),
      editorType: "dxSelectBox",
      visible: true,
      allowFiltering: true,
      validationRules: [
        {
          type: "required",
        },
      ],
      editorOptions: {
        dataSource: listInsurenceCompany?.DataList ?? [],
        displayExpr: "InsCompanyName",
        valueExpr: "InsCompanyCode",
      },
    },
    {
      dataField: "InsTypeCode", // Mã loại hình bảo hiểm
      caption: t("InsTypeCode"),
      defaultSortOrder: "asc",
      allowFiltering: false,
      editorType: "dxTextBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "EffectiveDate", // Ngày hiệu lực
      caption: t("EffectiveDate"),
      allowFiltering: false,
      editorType: "dxDateBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
      format: "yyyy-MM-dd",
      editorOptions: {
        type: "date",
      },
    },
    {
      dataField: "InsTypeName", // Tên loại hình bảo hiểm
      caption: t("InsTypeName"),
      allowFiltering: false,
      editorType: "dxTextBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "Rate", // Tỉ lệ phí
      caption: t("Rate"),
      allowFiltering: false,
      editorType: "dxNumberBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "Remark", // Ghi chú
      caption: t("Remark"),
      allowFiltering: false,
      editorType: "dxTextBox",
      visible: true,
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
    },
  ];

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "InsCompanyCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "InsTypeCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "EffectiveDate") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_InsuranceType__DeleteMultiple(rows);
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
            <div className="font-bold dx-font-m">{t("Mst_InsuranceType")}</div>
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
          keyExpr={["InsCompanyCode", "InsTypeCode", "EffectiveDate"]}
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
