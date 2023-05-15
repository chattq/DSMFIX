import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_MinInventory,
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
export const Mst_MinInventoryPage = () => {
  const { t } = useI18n("Mst_MinInventory");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  let gridRef: any = useRef(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  // call api posttyle search
  const { data, isLoading, refetch } = useQuery(
    ["Mst_MinInventory", keyword],
    () =>
      api.Mst_MinInventory_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listModal } = useQuery(["Model"], () => {
    return api.Mst_CarModel_GetAllActive();
  });

  const { data: listSpec } = useQuery(["Spec"], () => {
    return api.Mst_CarSpec_GetAllActive();
  });

  console.log("listSpec", listSpec, "listModel", listModal);

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
    const resp = await api.Mst_MinInventory_Upload(file);
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
        const data: Mst_MinInventory = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (id: Partial<Mst_MinInventory>) => {
    const resp = await api.Mst_MinInventory_Delete(id);
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
    const resp = await api.Mst_MinInventory_ExportExcel_Template();
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

  const onCreate = async (data: Mst_MinInventory) => {
    const resp = await api.Mst_MinInventory_Create(data);
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
    key: Partial<Mst_MinInventory>,
    data: Partial<Mst_MinInventory>
  ) => {
    const resp = await api.Mst_MinInventory_Update(key, data);
    if (resp.isSuccess) {
      toast.success(t("Update Successfully"));
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
      dataField: "ModelCode", // Số hợp đồng
      caption: t("ModelCode"),
      editorType: "dxSelectBox",
      visible: true,
      lookup: {
        dataSource: listModal?.DataList ?? [],
        displayExpr: "ModelCode",
        valueExpr: "ModelCode",
      },
      editorOptions: {},
      validationRules: [
        {
          type: "required",
        },
      ],
      setCellValue: (newData: any, value: any) => {
        newData.ModelCode = value;
        const data = listModal?.DataList ?? [];
        const dataValue = data.find((item) => {
          return item.ModelCode === value;
        });
        if (dataValue) {
          newData.ModelName = dataValue.ModelName;
        }
        newData.SpecCode = "";
        newData.SpecDescription = "";
      },
    },
    {
      dataField: "ModelName", // Tỉ lệ bảo hiểm
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
      dataField: "SpecDescription", // Tỉ lệ bảo hiểm
      caption: t("SpecDescription"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "QtyInv", // Tồn kho tối thiểu
      caption: t("QtyInv"),
      editorType: "dxNumberBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
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
    if (e.dataField === "ModelCode" || e.dataField === "SpecCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (!e?.row?.data.ModelCode) {
      if (e.dataField === "SpecCode") {
        e.editorOptions.readOnly = true;
      }
    }
  };

  const handleDeleteRows = async (rows: any[]) => {
    const resp = await api.Mst_MinInventory_DeleteMultiple(rows);
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
            <div className="font-bold dx-font-m">{t("Mst_MinInventory")}</div>
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
          keyExpr={["ModelCode", "SpecCode"]}
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
