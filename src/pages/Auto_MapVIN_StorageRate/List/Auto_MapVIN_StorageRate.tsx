import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  Auto_MapVIN_StorageRate,
  FlagActiveEnum,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import {
  keywordAtom,
  selectedItemsAtom,
} from "../components/Auto_MapVIN_StorageRateStore";
import { HeaderPart } from "../components/header-part";

export const Auto_MapVIN_StorageRatePage = () => {
  const { t } = useI18n("Auto_MapVIN_StorageRate");
  const config = useConfiguration();
  let gridRef: any = useRef(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedRowKeys = useRef<string[]>([]);

  const { data, isLoading, refetch } = useQuery(
    ["Auto_MapVIN_StorageRate", keyword],
    () =>
      api.Auto_MapVIN_StorageRate_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listColor } = useQuery(
    ["color"],
    api.Mst_CarColor_GetAllActive
  );

  const { data: listStorage } = useQuery(
    ["storage"],
    api.Mst_Storage_GetAllActive
  );

  const { data: listModel } = useQuery(
    ["model"],
    api.Mst_CarModel_GetAllActive
  );

  const { data: listSpec } = useQuery(["spec"], api.Mst_CarSpec_GetAllActive);
  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  const onCreate = async (data: Partial<any>) => {
    const respone = await api.Auto_MapVIN_StorageRate_Create(data);
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
    const respone = await api.Auto_MapVIN_StorageRate_Delete(key);
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

  const onUpdate = async (
    key: string,
    data: Partial<Auto_MapVIN_StorageRate>
  ) => {
    const respone = await api.Auto_MapVIN_StorageRate_Update(key, data);
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
    const resp = await api.Auto_MapVIN_StorageRate_Import(file);
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
    const resp = await api.Auto_MapVIN_StorageRate_ExportTemplate();
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
        allowFiltering: true,
      },
      {
        dataField: "ModelCode",
        caption: t("ModelCode"),
        editorType: "dxSelectBox",
        visible: true,
        lookup: {
          dataSource: listModel?.DataList ?? [],
          displayExpr: "ModelCode",
          valueExpr: "ModelCode",
        },
        validationRules: [
          {
            type: "required",
          },
        ],
        allowFiltering: true,
        setCellValue: (newData: any, value: any) => {
          newData.ModelCode = value;

          const model = listModel?.DataList?.find(
            (item: any) => item.ModelCode == value
          );

          newData.ModelName = model?.ModelName;

          newData.SpecCode = null;
          newData.SpecDescription = null;

          newData.ColorExtCode = null;
          newData.ColorExtNameVN = null;
        },
      },
      {
        dataField: "ModelName",
        caption: t("ModelName"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        allowFiltering: true,
      },
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
        lookup: {
          dataSource: (options: any) => {
            return {
              store: listSpec?.DataList,
              filter: options.data
                ? ["ModelCode", "=", options.data.ModelCode]
                : null,
            };
          },
          displayExpr: "SpecCode",
          valueExpr: "SpecCode",
        },
        allowFiltering: true,
        setCellValue: (newData: any, value: any) => {
          newData.SpecCode = value;

          const carSpec = listSpec?.DataList?.find(
            (item: any) => item.SpecCode == value
          );

          newData.SpecDescription = carSpec?.SpecDescription;
        },
      },
      {
        dataField: "SpecDescription",
        caption: t("SpecDescription"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        allowFiltering: true,
      },

      {
        dataField: "ColorExtCode",
        caption: t("ColorExtCode"),
        editorType: "dxSelectBox",
        visible: true,
        lookup: {
          dataSource: (options: any) => {
            return {
              store: listColor?.DataList,
              filter: options.data
                ? ["ModelCode", "=", options.data.ModelCode]
                : null,
            };
          },
          displayExpr: "ColorExtCode",
          valueExpr: "ColorExtCode",
        },
        validationRules: [
          {
            type: "required",
          },
        ],
        allowFiltering: true,
        setCellValue: (newData: any, value: any) => {
          newData.ColorExtCode = value;

          const color = listColor?.DataList?.find(
            (item: any) => item.ColorExtCode == value
          );

          newData.ColorExtNameVN = color?.ColorExtName;
        },
      },
      {
        dataField: "ColorExtNameVN",
        caption: t("ColorExtNameVN"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        allowFiltering: true,
      },

      {
        dataField: "MBVal",
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
        dataField: "MTVal",
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
        dataField: "MNVal",
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
    [listColor, listStorage, listModel, data]
  );

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (
      e.dataField === "ModelCode" ||
      e.dataField === "StorageCode" ||
      e.dataField === "SpecCode" ||
      e.dataField === "ColorExtCode"
    ) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }

    if (!e.row?.data.ModelCode) {
      if (e.dataField === "SpecCode") {
        e.editorOptions.readOnly = true;
      }
      if (e.dataField === "ColorExtCode") {
        e.editorOptions.readOnly = true;
      }
    }
  };

  const handleDeleteRows = async (e: any[]) => {
    const resp = await api.Auto_MapVIN_StorageRate_DeleteMultiple(e);
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
              {t("Auto_MapVIN_StorageRate")}
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
          keyExpr={["StorageCode", "ModelCode", "SpecCode", "ColorExtCode"]}
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
