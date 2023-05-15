import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mst_CarInvoice, SearchParam } from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import {
  keywordAtom,
  selectedItemsAtom,
} from "../components/Mst_CarInvoiceStore";
import { HeaderPart } from "../components/header-part";

export const Mst_CarInvoicePage = () => {
  const { t } = useI18n("Mst_CarInvoice");
  const config = useConfiguration();
  let gridRef: any = useRef<DataGrid | null>(null);
  const api = useClientgateApi();

  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);

  const { data, isLoading, refetch } = useQuery(
    ["carInvoice", keyword],
    () =>
      api.Mst_CarInvoice_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listCarSpec, isLoading: isLoadingCarSpec } = useQuery(
    [],
    api.Mst_CarSpec_GetAllActive
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

  const onCreate = async (data: Partial<Mst_CarInvoice>) => {
    const respone = await api.Mst_CarInvoice_Create(data);
    if (respone.isSuccess) {
      toast.success(t("Created successfully"));
      refetch();
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
    }
  };

  const onDelete = async (key: string) => {
    const respone = await api.Mst_CarInvoice_Delete(key);
    if (respone.isSuccess) {
      toast.success(t("Delete successfully"));
      refetch();
    } else {
      showError({
        message: t(respone.errorCode),
        debugInfo: respone.debugInfo,
        errorInfo: respone.errorInfo,
      });
    }
  };

  const onUpdate = async (key: string, data: Partial<Mst_CarInvoice>) => {
    const respone = await api.Mst_CarInvoice_Update(key, data);
    if (respone.isSuccess) {
      toast.success(t("Update successfully"));
      refetch();
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
    gridRef.current._instance.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_CarInvoice_ImportExcel(file);
    if (resp.isSuccess) {
      toast.success(t("Upload Successfully"));
      refetch();
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const onDownloadTemplate = async () => {
    const resp = await api.Mst_CarInvoice_ExportTemplate();
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
  const handleSelectionChanged = (rowKeys: string[]) => {
    setSelectedItems(rowKeys);
  };

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        dataField: "SpecCode",
        caption: t("SpecCode"),
        editorType: "dxSelectBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
        allowFiltering: true,
        editorOptions: {
          dataSource: listCarSpec?.DataList ?? [],
          displayExpr: "SpecCode",
          valueExpr: "SpecCode",
        },
      },
      {
        dataField: "VehiclesType",
        caption: t("VehiclesType"),
        editorType: "dxTextBox",
        visible: true,

        validationRules: [
          {
            type: "required",
          },
        ],
      },
      {
        dataField: "NumberOfSeats",
        caption: t("NumberOfSeats"),
        editorType: "dxNumberBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
      },
      {
        dataField: "CarType",
        caption: t("CarType"),
        editorType: "dxTextBox",
        visible: true,

        validationRules: [
          {
            type: "required",
          },
        ],
      },
      {
        dataField: "VAT",
        caption: t("VAT"),
        editorType: "dxNumberBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
      },
    ],
    [listCarSpec]
  );

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "SpecCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_CarInvoice_DeleteMultiple(
      rows.map((item: any) => {
        return {
          SpecCode: item,
        };
      })
    );
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
            <div className="font-bold dx-font-m">{t("Mst_CarInvoice")}</div>
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
          isLoading={isLoading || isLoadingCarSpec}
          defaultPageSize={config.PAGE_SIZE}
          columns={columns}
          allowSelection={true}
          dataSource={data?.DataList ?? []}
          inlineEditMode="row"
          keyExpr="SpecCode"
          allowInlineEdit={true}
          onReady={handleGridReady}
          onSaveRow={handleSave}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={handleEditorPreparing}
          onDeleteRows={handleDeleteRows}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
