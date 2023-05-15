import {useCallback, useEffect, useMemo, useRef} from "react";

import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { logger } from "@/packages/logger";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Province, SearchParam } from "@/packages/types";
import { StatusButton } from "@/packages/ui/status-button";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { PageHeaderLayout } from "@layouts/page-header-layout";
import { BaseGridView, ColumnOptions } from "@packages/ui/base-gridview";
import { useQuery } from "@tanstack/react-query";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
import "./province-management.scss";
import {filterByFlagActive, uniqueFilterByDataField} from "@packages/common";
import {ExcludeSpecialCharactersType, requiredType} from "@packages/common/Validation_Rules";
import {ProvinceDto} from "@packages/api/clientgate/Mst_ProvinceApi";
import {DataGrid} from "devextreme-react";


export const ProvinceManagementPage = () => {
  const { t } = useI18n("Province");
  const api = useClientgateApi();
  const config = useConfiguration();
  let gridRef: any = useRef<DataGrid|null>(null);
  const keyword = useAtomValue(keywordAtom);

  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  // load all data
  const { data, isLoading, refetch } = useQuery(
    ["provinces", keyword],
    () =>
      api.Mst_Province_Search({
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

  const { data: areasData, isLoading: isLoadingArea } = useQuery(["areas"], () =>
    api.Mst_Area_Search({
      KeyWord: "",
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as SearchParam)
  );

  const onCreate = async (data: Partial<ProvinceDto>) => {
    logger.debug('onCreate', data)
    const resp = await api.Mst_Province_Create({
      ...data,
    });
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
  const onUpdate = async (key: string, data: Partial<ProvinceDto>) => {
    const resp = await api.Mst_Province_Update(key, data);
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
  const onDelete = async (key: string) => {
    const resp = await api.Mst_Province_Delete(key);
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

  const columns: ColumnOptions[] = useMemo(() => [
    {
      dataField: "ProvinceCode",
      caption: t("Province Code"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      headerFilter: {
        allowSearch: true,
        dataSource: uniqueFilterByDataField(data?.DataList, 'ProvinceCode')
      },
      validationRules: [
        requiredType,
        ExcludeSpecialCharactersType
      ],
    },
    {
      dataField: "AreaCode",
      caption: t("Area Code"),
      editorType: "dxSelectBox",
      visible: true,
      headerFilter: {
        dataSource: uniqueFilterByDataField(data?.DataList, 'AreaCode', t('( Empty )')),
      },
      validationRules: [
        requiredType,
      ],
      editorOptions: {
        dataSource: areasData?.DataList ?? [],
        validationMessageMode: "always",
        displayExpr: "AreaCode",
        valueExpr: "AreaCode",
        searchEnabled: true
      },
    },
    {
      dataField: "ProvinceName",
      caption: t("Province Name"),
      defaultSortOrder: "asc",
      editorType: "dxTextBox",
      visible: true,
      headerFilter: {
        dataSource: uniqueFilterByDataField(data?.DataList, 'ProvinceName', t('( Empty )')),
      },
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [
        requiredType
      ],
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      editorType: "dxSwitch",
      dataType: "boolean",
      visible: true,
      alignment: "center",
      width: 120,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
      headerFilter: {
        dataSource: filterByFlagActive(data?.DataList, {
          true: t('Active'),
          false: t('Inactive'),
        })
      },
    },
  ], [areasData]);

  const handleAddNew = () => {
    console.log('gridRef:', gridRef)
    gridRef.current.instance.addRow()
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "ProvinceCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      if(e.row?.isNewRow) {
        e.editorOptions.value = true;
      }
    }
  };
  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_Province_DeleteMultiple(rows);
    if (resp.isSuccess) {
      toast.success(t("DeleteSuccessfully"));
      await refetch();
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const handleSavingRow = async (e: any) => {
    logger.debug("e:", e);
    // stop grid behaviour
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        let newData: ProvinceDto  = e.changes[0].data!;
        // if doesn't change flag active. set it as active by default
        if(!Object.keys(newData).includes('FlagActive')) {
          newData = {
            ...newData,
            FlagActive: true
          }
        }
        e.promise = onCreate(newData);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
    logger.debug("e after:", e);
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_Province_Import(file);
    if (resp.isSuccess) {
      toast.success(t("UploadSuccessfully"));
      await refetch();
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };
  const handleDownloadTemplate = async () => {
    const resp = await api.Mst_Provice_ExportTemplate();
    if (resp.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
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
  const handleGridReady = useCallback((grid: any) => {
    console.log('grid:', grid)
    gridRef.current = grid
  }, [])
  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name={"Before"}>
            <div className="font-bold dx-font-m">
              {t("ProvinceManagement")}
            </div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name={"Center"}>
            <HeaderPart
              onAddNew={handleAddNew}
              onUploadFile={handleUploadFile}
              onDownloadTemplate={handleDownloadTemplate}
            />
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        
        <BaseGridView
          isLoading={isLoading || isLoadingArea}
          defaultPageSize={config.PAGE_SIZE}
          dataSource={data?.DataList ?? []}
          columns={columns}
          keyExpr="ProvinceCode"
          allowSelection={true}
          allowInlineEdit={true}
          onReady={handleGridReady}
          onEditorPreparing={handleEditorPreparing}
          onSelectionChanged={handleSelectionChanged}
          onSaveRow={handleSavingRow}
          inlineEditMode={"row"}
          onDeleteRows={handleDeleteRows}
          storeKey={"province-management-columns"}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
