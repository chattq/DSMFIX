import { useEffect, useMemo, useRef, useState } from "react";

import "./Mst_PointRegisManagementPage.scss";
import { PageHeaderLayout } from "@layouts/page-header-layout";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { BaseGridView, ColumnOptions } from "@packages/ui/base-gridview";
import { StatusButton } from "@/packages/ui/status-button";
import { FlagActiveEnum, Mst_PointRegis, SearchParam } from "@/packages/types";
import { useI18n } from "@/i18n/useI18n";
import { useConfiguration } from "@/packages/hooks";
import { logger } from "@/packages/logger";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { toast } from "react-toastify";
import { useAtomValue, useSetAtom } from "jotai";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";

export const Mst_PointRegisManagementPage = () => {
  const { t } = useI18n("Mst_PointRegis");
  const api = useClientgateApi();
  const config = useConfiguration();
  let gridRef: any = useRef(null);
  const keyword = useAtomValue(keywordAtom);

  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  // load all data
  const { data, isLoading, refetch } = useQuery(
    ["Mst_PointRegis_Keyword", keyword],
    () =>
      api.Mst_PointRegis_Search({
        KeyWord: keyword,
        FlagActive: FlagActiveEnum.All,
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );
  logger.debug("isLoading", isLoading, data);
  useEffect(() => {
    if (!!data && !data.isSuccess) {
      showError({
        message: t(data.errorCode),
        debugInfo: data.debugInfo,
        errorInfo: data.errorInfo,
      });
    }
  }, [data]);

  // Load Mst_Dealer FlagActive = 1

  const { data: Lst_Mst_Dealer } = useQuery(["Mst_Dealer_Keyword"], () => {
    var list = api.Mst_Dealer_GetAllActive();
    return list;
  });

  const onCreate = async (data: Partial<Mst_PointRegis>) => {
    const resp = await api.Mst_PointRegis_Create({
      ...data,
      FlagActive: !!data.FlagActive ? (data.FlagActive ? "1" : "0") : "0",
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
  const onUpdate = async (
    key: Mst_PointRegis,
    data: Partial<Mst_PointRegis>
  ) => {
    const resp = await api.Mst_PointRegis_Update(key, data);
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
  const onDelete = async (key: Mst_PointRegis) => {
    const resp = await api.Mst_PointRegis_Delete(key);
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

  const dealerCodeFilter = useMemo(() => {
    if (data?.isSuccess) {
      console.log("data Mst_Dealer", data);
      // group item in data.DataList by DealerCode
      // return an array of unique DealerCode
      return data.DataList?.reduce((acc, cur) => {
        const value = cur.DealerCode;
        const existingItem = acc.find((item: any) => item.DealerCode === value);
        if (!existingItem) {
          acc.push({ DealerCode: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { DealerCode: string; count: number }[])
        .sort((a: any, b: any) => a.DealerCode.localeCompare(b.DealerCode))
        .map((item: any) => ({
          text: `${item.DealerCode} (${item.count})`,
          value: item.DealerCode,
        }));
    } else {
      return [];
    }
  }, [data]);

  const pointRegisCodeFilter = useMemo(() => {
    if (data?.isSuccess) {
      // group item in data.DataList by PointRegisCode
      // return an array of unique PointRegisCode
      return data.DataList?.reduce((acc, cur) => {
        const value = cur.PointRegisCode;
        const existingItem = acc.find(
          (item: any) => item.PointRegisCode === value
        );
        if (!existingItem) {
          acc.push({ PointRegisCode: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { PointRegisCode: string; count: number }[])
        .sort((a: any, b: any) =>
          a.PointRegisCode.localeCompare(b.PointRegisCode)
        )
        .map((item: any) => ({
          text: `${item.PointRegisCode} (${item.count})`,
          value: item.PointRegisCode,
        }));
    } else {
      return [];
    }
  }, [data]);

  const pointRegisNameFilter = useMemo(() => {
    if (data?.isSuccess) {
      // group item in data.DataList by PointRegisName
      // return an array of unique PointRegisName
      return data.DataList?.reduce((acc, cur) => {
        const value = cur.PointRegisName;
        const existingItem = acc.find(
          (item: any) => item.PointRegisName === value
        );
        if (!existingItem) {
          acc.push({ PointRegisName: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { PointRegisName: string; count: number }[])
        .sort((a: any, b: any) =>
          a.PointRegisName.localeCompare(b.PointRegisName)
        )
        .map((item: any) => ({
          text: `${item.PointRegisName} (${item.count})`,
          value: item.PointRegisName,
        }));
    } else {
      return [];
    }
  }, [data]);

  const md_DealerNameFilter = useMemo(() => {
    if (data?.isSuccess) {
      // group item in data.DataList by md_DealerName
      // return an array of unique md_DealerName
      return data.DataList?.reduce((acc, cur) => {
        const value = cur.md_DealerName;
        const existingItem = acc.find(
          (item: any) => item.md_DealerName === value
        );
        if (!existingItem) {
          acc.push({ md_DealerName: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { md_DealerName: string; count: number }[])
        .sort((a: any, b: any) =>
          a.md_DealerName.localeCompare(b.md_DealerName)
        )
        .map((item: any) => ({
          text: `${item.md_DealerName} (${item.count})`,
          value: item.md_DealerName,
        }));
    } else {
      return [];
    }
  }, [data]);

  const flagActiveFilter = useMemo(() => {
    if (data?.isSuccess) {
      return data.DataList?.reduce((acc, cur) => {
        const value = cur.FlagActive;
        const existingItem = acc.find((item) => item.FlagActive === value);
        if (!existingItem) {
          acc.push({ FlagActive: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { FlagActive: string; count: number }[])
        .sort((a, b) => a.FlagActive?.localeCompare(b.FlagActive))
        .map((item) => ({
          text: `${t(`FlagActive.${item.FlagActive}`)} (${item.count})`,
          value: item.FlagActive,
        }));
    }
  }, [data]);

  const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  const regexNumber =
    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;

  const columns: ColumnOptions[] = [
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      editorType: "dxSelectBox",
      visible: true,
      headerFilter: {
        dataSource: dealerCodeFilter,
      },
      editorOptions: {
        dataSource: Lst_Mst_Dealer?.DataList || [],
        displayExpr: "DealerCode",
        valueExpr: "DealerCode",
      },
      setCellValue: (newData: any, value: any, currentRowData: any) => {
        let md_DealerName = "";
        if (
          value !== undefined &&
          value !== null &&
          value.toString().trim().length > 0
        ) {
          value = value.toString().trim();
          const listMst_Dealer = Lst_Mst_Dealer?.DataList || [];
          var objMst_Dealer = listMst_Dealer.find(
            (it) => it.DealerCode === value
          );
          md_DealerName = objMst_Dealer?.DealerName || "";
        }
        newData.DealerCode = value;
        newData.md_DealerName = `${md_DealerName}`;
      },
    },
    {
      dataField: "PointRegisCode",
      caption: t("PointRegisCode"),
      editorType: "dxTextBox",
      visible: true,
      //allowFiltering: false,
      headerFilter: {
        dataSource: pointRegisCodeFilter,
      },
      editorOptions: {
        placeholder: t("Input"),
      },
      validationRules: [
        {
          type: "required",
        },
        {
          type: "pattern",
          pattern: /[a-zA-Z0-9]/,
        },
      ],
    },
    {
      dataField: "md_DealerName",
      caption: t("md_DealerName"),
      defaultSortOrder: "asc",
      editorType: "dxTextBox",
      visible: true,
      allowFiltering: false,
      headerFilter: {
        dataSource: md_DealerNameFilter,
      },
      editorOptions: {
        placeholder: t("Input"),
      },
      setCellValue: (newData: any, value: any, currentRowData: any) => {},
      // validationRules: [
      //   {
      //     type: "required",
      //   },
      //   {
      //     type: "pattern",
      //     pattern: /[a-zA-Z0-9]/,
      //   },
      // ],
    },
    {
      dataField: "PointRegisName",
      caption: t("PointRegisName"),
      defaultSortOrder: "asc",
      editorType: "dxTextBox",
      visible: true,
      //allowFiltering: false,
      minWidth: 150,
      width: 250,
      headerFilter: {
        dataSource: pointRegisNameFilter,
      },
      editorOptions: {
        placeholder: t("Input"),
      },
      validationRules: [
        {
          type: "required",
        },
      ],
    },
    {
      dataField: "MapLatitude",
      caption: t("MapLatitude"),
      defaultSortOrder: "asc",
      editorType: "dxTextBox",
      visible: true,
      allowFiltering: false,
      editorOptions: {
        placeholder: t("Input"),
      },
      validationRules: [
        {
          type: "required",
        },
        {
          type: "pattern",
          pattern: regexLat,
        },
      ],
    },
    {
      dataField: "MapLongitude",
      caption: t("MapLongitude"),
      defaultSortOrder: "asc",
      editorType: "dxTextBox",
      visible: true,
      allowFiltering: false,
      editorOptions: {
        placeholder: t("Input"),
      },
      validationRules: [
        {
          type: "required",
        },
        {
          type: "pattern",
          pattern: regexLon,
        },
      ],
    },
    {
      dataField: "Radius",
      caption: t("Radius"),
      defaultSortOrder: "asc",
      editorType: "dxTextBox",
      visible: true,
      allowFiltering: false,
      editorOptions: {
        placeholder: t("Input"),
      },
      validationRules: [
        {
          type: "required",
        },
        {
          type: "pattern",
          pattern: regexNumber,
        },
      ],
    },
    {
      dataField: "Remark",
      caption: t("Remark"),
      defaultSortOrder: "asc",
      editorType: "dxTextBox",
      visible: true,
      allowFiltering: false,
      minWidth: 100,
      width: 250,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      editorType: "dxSwitch",
      visible: true,
      alignment: "center",
      width: 135,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
      headerFilter: {
        dataSource: flagActiveFilter,
      },
    },
  ];

  const handleAddNew = () => {
    if (gridRef.instance) {
      gridRef.instance.addRow();
    }
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "PointRegisCode" || e.dataField === "DealerCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "md_DealerName") {
      e.editorOptions.readOnly = true;
    } else if (e.dataField === "FlagActive") {
      const isNewRow = e.row?.isNewRow;
      if (isNewRow) {
        //e.editorOptions.readOnly = true;
        e.editorOptions.value = true;
      } else {
        var flagActive = "0";
        const objMst_PointRegis = e?.row?.data;
        if (objMst_PointRegis !== undefined && objMst_PointRegis !== null) {
          flagActive = objMst_PointRegis?.FlagActive ?? "0";
        }

        e.editorOptions.value = flagActive === "1" ? true : false;
      }
    }
  };
  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_PointRegis_DeleteMultiple(rows);
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

  const handleSavingRow = async (e: any) => {
    logger.debug("e:", e);
    // stop grid behaviour
    if (e.changes && e.changes.length > 0) {
      debugger;
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      if (type === "remove") {
        const objKey = e.changes[0].key;
        const data: Mst_PointRegis = e.changes[0].data!;
        logger.debug("data delete: ", data);
        e.promise = onDelete(objKey);
      } else if (type === "insert") {
        const data: Mst_PointRegis = e.changes[0].data!;
        console.log("data insert: ", data);
        e.promise = onCreate(data);
      } else if (type === "update") {
        debugger;
        const objKey: Mst_PointRegis = e.changes[0].key;
        const data: Mst_PointRegis = e.changes[0].data!;
        console.log("data update: ", data);
        e.promise = onUpdate(objKey, data);
      }
    }
    e.cancel = true;
    logger.debug("e after:", e);
  };

  const handleUploadFile = async (file: File, progressCallback?: Function) => {
    const resp = await api.Mst_PointRegis_ImportExcel(file);
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
  const handleDownloadTemplate = async () => {
    const resp = await api.Mst_PointRegis_ExportTemplate();
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
  return (
    <AdminContentLayout className={"Mst_PointRegis-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name={"Before"}>
            <div className="font-bold dx-font-m">
              {t("Mst_PointRegisManagement")}
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
          isLoading={isLoading}
          defaultPageSize={config.PAGE_SIZE}
          dataSource={data?.DataList ?? []}
          columns={columns}
          keyExpr={["PointRegisCode", "DealerCode"]}
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
