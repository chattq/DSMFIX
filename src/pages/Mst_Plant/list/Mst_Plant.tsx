import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mst_Plant, SearchParam } from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { keywordAtom, selectedItemsAtom } from "../components/Mst_PlantStore";
import { HeaderPart } from "../components/header-part";

export const Mst_PlantPage = () => {
  const { t } = useI18n("Mst_Plant");
  const config = useConfiguration();
  let gridRef: any = useRef(null);
  const api = useClientgateApi();

  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);

  const { data, isLoading, refetch } = useQuery(
    ["PlantType", keyword],
    () =>
      api.Mst_Plant_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
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

  const onCreate = async (data: Partial<Mst_Plant>) => {
    const respone = await api.Mst_Plant_Create(data);
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
    const respone = await api.Mst_Plant_Delete(key);
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

  const onUpdate = async (key: string, data: Partial<Mst_Plant>) => {
    const respone = await api.Mst_Plant_Update(key, data);
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
    const resp = await api.Mst_Plant_ImportExcel(file);
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
    const resp = await api.Mst_Plant_ExportTemplate();
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

  const columns: ColumnOptions[] = [
    {
      dataField: "PlantCode",
      caption: t("PlantCode"),
      editorType: "dxTextBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
      allowFiltering: true,
    },
    {
      dataField: "PlantName",
      caption: t("PlantName"),
      editorType: "dxTextBox",
      visible: true,

      validationRules: [
        {
          type: "required",
        },
      ],
    },
  ];

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "PlantCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_Plant_DeleteMultiple(
      rows.map((item: any) => {
        return {
          PlantCode: item,
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

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">{t("Mst_Plant")}</div>
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
          keyExpr="PlantCode"
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
