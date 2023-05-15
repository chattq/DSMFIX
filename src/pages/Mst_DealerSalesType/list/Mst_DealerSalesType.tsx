import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_DealerSalesType,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { StatusButton } from "@/packages/ui/status-button";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  keywordAtom,
  selectedItemsAtom,
} from "../components/Mst_DealerSalesTypeStore";
import { HeaderPart } from "../components/header-part";

export const Mst_DealerSalesTypePage = () => {
  const { t } = useI18n("Mst_DealerSalesType");
  const config = useConfiguration();
  let gridRef: any = useRef(null);
  const api = useClientgateApi();

  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);

  const { data, isLoading, refetch } = useQuery(
    [keyword],
    () =>
      api.Mst_DealerSalesType_Search({
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

  const listDealerGroup = useQuery(
    [],
    api.Mst_DealerSalesGroupType_GetAllActive
  );

  const onCreate = async (data: Partial<Mst_DealerSalesType>) => {
    const respone = await api.Mst_DealerSalesType_Create(data);
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
    const respone = await api.Mst_DealerSalesType_Delete(key);
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

  const onUpdate = async (key: any[], data: Partial<Mst_DealerSalesType>) => {
    const respone = await api.Mst_DealerSalesType_Update(key, data);
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
    const resp = await api.Mst_DealerSalesType_ImportExcel(file);
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
    const resp = await api.Mst_DealerSalesType_ExportTemplate();
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
      dataField: "SalesGroupType",
      caption: t("SalesGroupType"),
      editorType: "dxSelectBox",
      visible: true,
      validationRules: [
        {
          type: "required",
        },
      ],
      allowFiltering: true,
      editorOptions: {
        dataSource: listDealerGroup?.data?.DataList ?? [],
        displayExpr: "SalesGroupType",
        valueExpr: "SalesGroupType",
      },
    },
    {
      dataField: "SalesType",
      caption: t("SalesType"),
      editorType: "dxTextBox",
      visible: true,

      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "SalesTypeName",
      caption: t("SalesTypeName"),
      editorType: "dxTextBox",
      visible: true,

      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "SalesTypeNameVN",
      caption: t("SalesTypeNameVN"),
      editorType: "dxTextBox",
      visible: true,

      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "SalesTypeDescription",
      caption: t("SalesTypeDescription"),
      editorType: "dxTextBox",
      visible: true,
      width: 300,
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
  ];

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "SalesType" || e.dataField === "SalesGroupType") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: any[]) => {
    const resp = await api.Mst_DealerSalesType_DeleteMultiple(rows);
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
              {t("Mst_DealerSalesType")}
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
          keyExpr={["SalesGroupType", "SalesType"]}
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
