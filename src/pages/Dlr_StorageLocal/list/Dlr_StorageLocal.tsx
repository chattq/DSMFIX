import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  Dlr_StorageLocal,
  FlagActiveEnum,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { StatusButton } from "@/packages/ui/status-button";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import {
  keywordAtom,
  selectedItemsAtom,
} from "../components/Dlr_StorageLocalStore";
import { HeaderPart } from "../components/header-part";

export const Dlr_StorageLocalPage = () => {
  const { t } = useI18n("Dlr_StorageLocal");
  const config = useConfiguration();
  let gridRef: any = useRef(null);
  const api = useClientgateApi();

  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);

  const { data, isLoading, refetch } = useQuery(
    ["storageGlobal", keyword],
    () =>
      api.Dlr_StorageLocal_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const listDealer = useQuery(["dealer"], api.Mst_Dealer_GetAllActive);

  const listStorage = useQuery(["storage"], api.Mst_Storage_GetAllActive);

  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  const onCreate = async (data: Partial<Dlr_StorageLocal>) => {
    const respone = await api.Dlr_StorageLocal_Create(data);
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
    const respone = await api.Dlr_StorageLocal_Delete(key);
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

  const onUpdate = async (key: any, data: Partial<Dlr_StorageLocal>) => {
    const respone = await api.Dlr_StorageLocal_Update(key, data);
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
    if (gridRef?.instance) {
      gridRef.instance.addRow();
    }
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Dlr_StorageLocal_ImportExcel(file);
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
    const resp = await api.Dlr_StorageLocal_ExportTemplate();
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
        dataField: "StorageCode",
        caption: t("StorageCode"),
        editorType: "dxSelectBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
        editorOptions: {
          dataSource: listStorage?.data?.DataList ?? [],
          displayExpr: "StorageCode",
          valueExpr: "StorageCode",
        },

        setCellValue: (rowData: any, value: any) => {
          rowData.StorageCode = value;
          rowData.StorageName = listStorage?.data?.DataList?.find(
            (item: any) => item.StorageCode === value
          )?.StorageName;
        },
      },
      {
        dataField: "StorageName",
        caption: t("StorageName"),
        editorType: "dxTextBox",
        visible: true,
      },
      {
        dataField: "DealerCode",
        caption: t("DealerCode"),
        editorType: "dxSelectBox",
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
        editorOptions: {
          dataSource: listDealer?.data?.DataList ?? [],
          displayExpr: "DealerCode",
          valueExpr: "DealerCode",
        },
        setCellValue: (rowData: any, value: any) => {
          rowData.DealerCode = value;
          rowData.DealerName = listDealer?.data?.DataList?.find(
            (item: any) => item.DealerCode === value
          )?.DealerName;
        },
      },
      {
        dataField: "DealerName",
        caption: t("DealerName"),
        editorType: "dxTextBox",
        visible: true,
      },
      {
        dataField: "FlagActive",
        caption: t("FlagActive"),
        editorType: "dxSwitch",
        visible: true,
        alignment: "center",
        width: 120,
        cellRender: ({ data }: any) => {
          return <StatusButton isActive={data.FlagActive} />;
        },
      },
    ],
    [listDealer, listStorage, data]
  );

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DealerCode" || e.dataField === "StorageCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "DealerName" || e.dataField === "StorageName") {
      e.editorOptions.readOnly = true;
    }
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Dlr_StorageLocal_DeleteMultiple(rows);

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
            <div className="font-bold dx-font-m">{t("Dlr_StorageLocal")}</div>
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
