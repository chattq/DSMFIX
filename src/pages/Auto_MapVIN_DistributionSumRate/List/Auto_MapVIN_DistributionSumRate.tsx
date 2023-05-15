import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import {
  Auto_MapVIN_DistributionSumRate,
  FlagActiveEnum,
  SearchParam,
} from "@/packages/types";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
export const Auto_MapVIN_DistributionSumRatePage = () => {
  const { t } = useI18n("Auto_MapVIN_DistributionSumRate");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  let gridRef: any = useRef<DataGrid | null>(null);
  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);

  // call api posttyle search
  const { data, isLoading, refetch } = useQuery(
    ["Auto_MapVIN_DistributionSumRate", keyword],
    () =>
      api.Auto_MapVIN_DistributionSumRate_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  const { data: listModel, isLoading: isLoadingModel } = useQuery(
    ["Model"],
    () => api.Mst_CarModel_GetAllActive()
  );
  const { data: listSpec, isLoading: isLoadingSpec } = useQuery(["Spec"], () =>
    api.Mst_CarSpec_GetAllActive()
  );
  const { data: listColor, isLoading: isLoadingColor } = useQuery(
    ["Color"],
    () => api.Mst_CarColor_GetAllActive()
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
    gridRef.current?.instance?.addRow();
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Auto_MapVIN_DistributionSumRate_Upload(file);
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
        const data: Auto_MapVIN_DistributionSumRate = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onDelete = async (id: Partial<Auto_MapVIN_DistributionSumRate>) => {
    const resp = await api.Auto_MapVIN_DistributionSumRate_Delete(id);
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
    const resp =
      await api.Auto_MapVIN_DistributionSumRate_ExportExcel_Template();
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

  const onCreate = async (data: Auto_MapVIN_DistributionSumRate) => {
    const resp = await api.Auto_MapVIN_DistributionSumRate_Create(data);
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
    key: Partial<Auto_MapVIN_DistributionSumRate>,
    data: Partial<Auto_MapVIN_DistributionSumRate>
  ) => {
    const resp = await api.Auto_MapVIN_DistributionSumRate_Update(key, data);
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

  const columns: ColumnOptions[] = useMemo<any>(
    () => [
      {
        dataField: "ModelCode", // Mã model
        caption: t("ModelCode"),
        editorType: "dxSelectBox",
        lookup: {
          dataSource: listModel?.DataList ?? [],
          displayExpr: "ModelCode",
          valueExpr: "ModelCode",
        },
        visible: true,
        validationRules: [
          {
            type: "required",
          },
        ],
        setCellValue: (
          newValue: Partial<Auto_MapVIN_DistributionSumRate>,
          value: any
        ) => {
          newValue.ModelCode = value;
          const data = listModel?.DataList ?? [];
          const dataValue = data.find((item) => {
            return item.ModelCode === value;
          });
          if (dataValue) {
            newValue.ModelName = dataValue.ModelName;
          }
          newValue.SpecCode = "";
          newValue.SpecDescription = "";
          newValue.ColorExtCode = "";
          newValue.ColorExtNameVN = "";
        },
      },
      {
        dataField: "ModelName", // Tên model
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
            return {
              store: listSpec?.DataList ?? [],
              filter: options.data?.ModelCode
                ? ["ModelCode", "=", options.data?.ModelCode]
                : null,
            } as any;
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
        dataField: "SpecDescription", // Đặc tả xe
        caption: t("SpecDescription"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "ColorExtCode", // Mã màu ngoại thất
        caption: t("ColorExtCode"),
        editorType: "dxSelectBox",
        visible: true,
        lookup: {
          dataSource: (options: any) => {
            return {
              store: listColor?.DataList ?? [],
              filter: options.data?.ModelCode
                ? ["ModelCode", "=", options.data?.ModelCode]
                : null,
            } as any;
          },
          displayExpr: "ColorCode",
          valueExpr: "ColorCode",
        },
        validationRules: [
          {
            type: "required",
          },
        ],
        setCellValue: (
          newValue: Partial<Auto_MapVIN_DistributionSumRate>,
          value: string
        ) => {
          newValue.ColorExtCode = value;
          const data = listColor?.DataList ?? [];
          const dataValue = data.find((item: any) => {
            return item.ColorCode === value;
          });
          if (dataValue) {
            newValue.ColorExtNameVN = dataValue.ColorExtNameVN;
          }
        },
      },
      {
        dataField: "ColorExtNameVN", // Tên màu ngoại thất
        caption: t("ColorExtNameVN"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "MBVal", // Tỷ lệ Cầu map Miền Bắc (%)
        caption: t("MBVal"),
        editorType: "dxNumberBox",
        visible: true,
      },
      {
        dataField: "MTVal", // Tỷ lệ Cầu map Miền Trung (%)
        caption: t("MTVal"),
        editorType: "dxNumberBox",
        visible: true,
      },
      {
        dataField: "MNVal", // Tỷ lệ Cầu map Miền Nam (%)
        caption: t("MNVal"),
        editorType: "dxNumberBox",
        visible: true,
      },
    ],
    [listModel, listSpec, listColor]
  );

  const handleGridReady = useCallback((grid: any) => {
    gridRef.current = grid;
  }, []);

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (
      e.dataField === "ModelCode" ||
      e.dataField === "ColorExtCode" ||
      e.dataField === "SpecCode"
    ) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (!e?.row?.data.ModelCode) {
      if (e.dataField === "ColorExtCode") {
        e.editorOptions.readOnly = true;
      }
      if (e.dataField === "SpecCode") {
        e.editorOptions.readOnly = true;
      }
    }
  };

  const handleDeleteRows = async (a: any) => {
    const resp = await api.Auto_MapVIN_DistributionSumRate_DeleteMultiple(a);
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
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              {t("Auto_MapVIN_DistributionSumRate")}
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
          isLoading={
            isLoading || isLoadingModel || isLoadingSpec || isLoadingColor
          }
          defaultPageSize={config.PAGE_SIZE}
          dataSource={data?.DataList ?? []}
          columns={columns}
          keyExpr={["ModelCode", "SpecCode", "ColorExtCode"]}
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
