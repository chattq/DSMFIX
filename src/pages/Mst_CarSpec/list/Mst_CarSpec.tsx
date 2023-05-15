import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useClientgateApi } from "@packages/api";
import { ColumnOptions, GridViewPopup } from "@packages/ui/base-gridview";
import { useRef, useState } from "react";

import {
  searchParams,
  selectedItemsAtom,
} from "@/pages/Mst_CarSpec/components/Mst_CarSpecStore";
import { HeaderPart } from "@/pages/Mst_CarSpec/components/header-part";
import { LinkCell } from "@/pages/Mst_CarSpec/components/link-cell";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { zip } from "@packages/common";
import { useConfiguration } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";
import {
  FlagActiveEnum,
  Mst_CarSpec,
  SearchMst_CarSpecParam,
} from "@packages/types";
import { useQuery } from "@tanstack/react-query";
import { IPopupOptions } from "devextreme-react/popup";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { toast } from "react-toastify";
import "./Mst_CarSpec.scss";

import { requiredType } from "@/packages/common/Validation_Rules";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { StatusButton } from "@/packages/ui/status-button";
import { FormOptions } from "@/types";
import { DataGrid } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { usePopupView } from "../components";

export const Mst_CarSpecPage = () => {
  const { t } = useI18n("Mst_CarSpec");
  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom);

  const [searchCondition, setSearchCondition] = useState<
    Partial<SearchMst_CarSpecParam>
  >({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS,
    SpecCode: "",
    SpecDescription: "",
    AssemblyStatus: "",
  });

  const setSelectedItems = useSetAtom(selectedItemsAtom);

  const api = useClientgateApi();

  const { data, isLoading, refetch } = useQuery(
    ["Mst_CarSpec", JSON.stringify(searchCondition)],
    () =>
      api.Mst_CarSpec_Search({
        ...searchCondition,
      })
  );

  const { data: listSpec } = useQuery(
    ["ListSpec"],
    api.Mst_CarSpec_GetAllActive
  );

  const { data: listModel } = useQuery(
    ["ListModel"],
    api.Mst_CarModel_GetAllActive
  );

  const { data: listCarStdOpt } = useQuery(
    ["ListCarStdOpt"],
    api.Mst_CarStdOpt_GetAllActive
  );

  const { data: listCarOCN } = useQuery(
    ["ListCarOCN"],
    api.Mst_CarOCN_GetAllActive
  );

  const flagEditorOptions = {
    searchEnabled: true,
    valueExpr: "value",
    displayExpr: "text",
    items: [
      {
        value: "1",
        text: "1",
      },
      {
        value: "0",
        text: "0",
      },
    ],
  };

  // Column settings
  const columns: ColumnOptions[] = [
    {
      dataField: "SpecCode",
      caption: t("SpecCode"),
      visible: true,
      columnIndex: 1,
      order: 2,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, rowIndex, value }: any) => {
        return <LinkCell rowIndex={rowIndex} value={value} rowData={data} />;
      },
      validationRules: [requiredType],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "RootSpec",
      caption: t("RootSpec"),
      editorType: "dxSelectBox",
      editorOptions: {
        items: listSpec?.DataList || [],
        displayExpr: (item: any) =>
          item ? `${item.SpecCode} - ${item.SpecDescription}` : "",
        valueExpr: "SpecCode",
        searchEnabled: true,
        validationMessageMode: "always",
      },
      columnIndex: 1,
      order: 3,
      groupKey: "BASIC_INFORMATION",
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "ModelCode",
      caption: t("ModelCode"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        validationMessageMode: "always",
      },
      lookup: {
        dataSource: listModel?.DataList ?? [],
        displayExpr: (item: any) =>
          item ? `${item.ModelCode} - ${item.ModelName}` : "",
        valueExpr: "ModelCode",
      },
      setCellValue: (rowData: any, value: any) => {
        rowData.ModelCode = value;
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
      validationRules: [requiredType],
      order: 1,
    },
    {
      dataField: "StdOptCode",
      caption: t("StdOptCode"),
      editorType: "dxSelectBox",
      lookup: {
        dataSource: (options: any) => {
          return {
            store: listCarStdOpt?.DataList,
            filter: options.data
              ? ["ModelCode", "=", options.data.ModelCode]
              : null,
          };
        },
        displayExpr: (item: any) =>
          item ? `${item.StdOptCode} - ${item.StdOptDescription}` : "",
        valueExpr: "StdOptCode",
      },
      editorOptions: {
        searchEnabled: true,
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      order: 5,
      visible: true,
      validationRules: [requiredType],
      setCellValue: (rowData: any, value: any) => {
        rowData.StdOptCode = value;
      },
    },
    {
      dataField: "GradeCode",
      caption: t("GradeCode"),
      editorType: "dxSelectBox",
      lookup: {
        dataSource: (options: any) => {
          return {
            store: listCarStdOpt?.DataList,
            filter: options.data
              ? ["ModelCode", "=", options.data.ModelCode] && [
                  "StdOptCode",
                  "=",
                  options.data.StdOptCode,
                ]
              : null,
          };
        },
        displayExpr: (item: any) =>
          item ? `${item.GradeCode} - ${item.GradeDescription}` : "",
        valueExpr: "GradeCode",
      },
      editorOptions: {
        searchEnabled: true,
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      order: 7,
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "OCNCode",
      caption: t("OCNCode"),
      editorType: "dxSelectBox",
      lookup: {
        dataSource: (options: any) => {
          return {
            store: listCarOCN?.DataList,
            filter: options.data
              ? ["ModelCode", "=", options.data.ModelCode]
              : null,
          };
        },
        displayExpr: (item: any) =>
          item ? `${item.OCNCode} - ${item.OCNDescription}` : "",
        valueExpr: "OCNCode",
      },
      editorOptions: {
        searchEnabled: true,
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      order: 6,
      visible: true,
      width: 300,
      validationRules: [requiredType],
    },
    {
      dataField: "SpecDescription",
      caption: t("SpecDescription"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 1,
      order: 4,
      groupKey: "BASIC_INFORMATION",
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "AssemblyStatus",
      caption: t("AssemblyStatus"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "value",
        displayExpr: "text",
        items: [
          {
            value: "CKD",
            text: "CKD",
          },
          {
            value: "CBU",
            text: "CBU",
          },
        ],
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      order: 1,
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "FlagInvoiceFactory",
      caption: t("FlagInvoiceFactory"),
      columnIndex: 2,
      order: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: flagEditorOptions,
      validationRules: [requiredType],
    },
    {
      dataField: "FlagActive",
      caption: t("Status"),
      editorType: "dxSwitch",
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      order: 6,
      visible: true,
      width: 100,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive === "1"} />;
      },
    },
    {
      dataField: "FlagAmbulance",
      caption: t("FlagAmbulance"),
      columnIndex: 2,
      order: 3,
      groupKey: "BASIC_INFORMATION",
      visible: false,
      editorType: "dxSelectBox",
      editorOptions: flagEditorOptions,
      validationRules: [requiredType],
    },
    {
      dataField: "NumberOfSeats",
      caption: t("NumberOfSeats"),
      editorType: "dxNumberBox",
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      order: 4,
      visible: false,
      validationRules: [requiredType],
    },
    {
      dataField: "QuotaDate",
      caption: t("QuotaDate"),
      editorType: "dxDateBox",
      format: "yyyy-MM-dd",
      editorOptions: {
        type: "date",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      order: 5,
      visible: false,
      validationRules: [requiredType],
    },
  ];

  const handleSelectionChanged = (rows: string[]) => {
    setSelectedItems(rows);
  };
  const handleAddNew = () => {
    gridRef.current?.instance?.addRow();
  };

  // toggle search panel
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const handleCancel = () => {
    gridRef.current?.instance?.cancelEditData();
  };
  const handleEdit = (rowIndex: number) => {
    gridRef?.instance?.editRow(rowIndex);
  };
  const handleSubmit = () => {
    gridRef?.instance?.saveEditData();
  };

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    // use this function to control how the editor looks like
    if (
      [
        "ModelCode",
        "SpecCode",
        "RootSpec",
        "StdOptCode",
        "OCNCode",
        "GradeCode",
      ].includes(e.dataField!)
    ) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      e.editorOptions.value = false;
    }
  };

  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: t("Mst_CarSpec Information"),
    className: "dealer-information-popup",
    toolbarItems: [
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Save"),
          stylingMode: "contained",
          type: "default",
          onClick: handleSubmit,
        },
      },
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Cancel"),
          type: "default",
          onClick: handleCancel,
        },
      },
    ],
  };
  const firstRow_Col1 = columns
    .filter((c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 1)
    .sort((a: any, b: any) => a.order - b.order)
    .map((item: any) => {
      return {
        ...item,
        visible: true,
      };
    });
  const firstRow_Col2 = columns
    .filter((c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 2)
    .sort((a: any, b: any) => a.order - b.order)
    .map((item: any) => {
      return {
        ...item,
        visible: true,
      };
    });

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "left",
    items: [
      {
        itemType: "group",
        colCount: 2,
        items: zip(firstRow_Col1, firstRow_Col2),
        caption: t("BASIC_INFORMATION"),
      },
    ],
  };
  const onModify = async (id: string, data: Mst_CarSpec) => {
    const resp = await api.Mst_CarSpec_Update(id, {
      ...data,
    });
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
  // Section: CRUD operations
  const onCreate = async (data: Mst_CarSpec & { __KEY__: string }) => {
    const { __KEY__, ...rest } = data;
    const resp = await api.Mst_CarSpec_Create({
      ...rest,
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
  const onDelete = async (id: any) => {
    const resp = await api.Mst_CarSpec_Delete(id);
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
  const handleDeleteRows = async (rows: string[]) => {
    const resp = await api.Mst_CarSpec_DeleteMultiple(rows);

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
  const handleSavingRow = (e: any) => {
    // stop grid behaviour
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        const data = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onModify(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };
  // End Section: CRUD operations

  const handleSearch = async (data: any) => {
    setSearchCondition({ ...searchCondition, ...data });
    setSearchParams({ ...data });
  };
  const { PopupView } = usePopupView({ formSettings });
  const handleEditRowChanges = () => {};

  const setSearchParams = useSetAtom(searchParams);

  const searchConditions: IItemProps[] = [
    {
      caption: t("SpecCode"),
      dataField: "SpecCode",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "SpecDescription",
      caption: t("SpecDescription"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "AssemblyStatus",
      caption: t("AssemblyStatus"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "value",
        displayExpr: "text",
        items: [
          {
            value: "",
            text: "All",
          },
          {
            value: "CKD",
            text: "CKD",
          },
          {
            value: "CBU",
            text: "CBU",
          },
        ],
      },
    },
    {
      dataField: "FlagActive",
      caption: t("FlagActive"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "value",
        displayExpr: "text",
        items: [
          {
            value: "",
            text: t("All"),
          },
          {
            value: "1",
            text: t("Active"),
          },
          {
            value: "0",
            text: t("Inactive"),
          },
        ],
      },
    },
  ];

  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart onAddNew={handleAddNew}></HeaderPart>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[200px]"}>
              <SearchPanelV2
                data={searchCondition}
                onSearch={handleSearch}
                conditionFields={searchConditions}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewPopup
              isLoading={isLoading}
              dataSource={data?.isSuccess ? data.DataList ?? [] : []}
              columns={columns}
              keyExpr={["SpecCode", "ModelCode", "StdOptCode", "GradeCode"]}
              popupSettings={popupSettings}
              formSettings={formSettings}
              onReady={(ref) => (gridRef = ref)}
              allowSelection={true}
              onSelectionChanged={handleSelectionChanged}
              onSaveRow={handleSavingRow}
              onEditorPreparing={handleEditorPreparing}
              onEditRowChanges={handleEditRowChanges}
              toolbarItems={[
                {
                  location: "before",
                  widget: "dxButton",
                  options: {
                    icon: "search",
                    onClick: handleToggleSearchPanel,
                  },
                },
              ]}
              storeKey={"dealer-management-columns"}
              onDeleteRows={handleDeleteRows}
            />
            <PopupView handleCancel={handleCancel} handleEdit={handleEdit} />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
