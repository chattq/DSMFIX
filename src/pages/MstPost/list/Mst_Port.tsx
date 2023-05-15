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
import { phoneType, requiredType } from "@/packages/common/Validation_Rules";
import { uniqueFilterByDataField } from "@/packages/common";
import { DataGrid } from "devextreme-react";
export const Mst_PortPage = () => {
  const { t } = useI18n("Mst_Port");
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

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "PortCode", // mã cảng
        caption: t("Port Code"),
        editorType: "dxTextBox",
        visible: true,
        validationRules: [requiredType, phoneType],
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList ?? [],
            "PortCode",
            t("( Empty )")
          ),
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
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList ?? [],
            "PortType",
            t("( Empty )")
          ),
        },
        validationRules: [requiredType, phoneType],
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
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList ?? [],
            "PortName",
            t("( Empty )")
          ),
        },
        validationRules: [requiredType, phoneType],
      },
      {
        dataField: "PortAddress", // Địa chỉ
        caption: t("PortAddress"),
        editorType: "dxTextBox",
        visible: true,
        allowFiltering: true,
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList ?? [],
            "PortAddress",
            t("( Empty )")
          ),
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
        headerFilter: {
          dataSource: uniqueFilterByDataField(
            data?.DataList ?? [],
            "ProvinceCode",
            t("( Empty )")
          ),
        },
        validationRules: [requiredType, phoneType],
        editorOptions: {
          dataSource: listProvince?.DataList ?? [],
          displayExpr: "ProvinceName",
          valueExpr: "ProvinceCode",
        },
      },
    ];
  }, [ListPortType, listProvince]);

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

  const handleGridReady = useCallback((grid: any) => {
    gridRef.current = grid;
  }, []);

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
