import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useClientgateApi } from "@packages/api";
import { ColumnOptions, GridViewPopup } from "@packages/ui/base-gridview";
import { useRef, useState } from "react";

import {
  searchParams,
  selectedItemsAtom,
} from "@/pages/Mst_CarStdOpt/components/Mst_CarStdOptStore";
import { HeaderPart } from "@/pages/Mst_CarStdOpt/components/header-part";
import { LinkCell } from "@/pages/Mst_CarStdOpt/components/link-cell";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { zip } from "@packages/common";
import { useConfiguration } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";
import { Mst_CarStdOpt, SearchMst_CarStdOptParam } from "@packages/types";
import { useQuery } from "@tanstack/react-query";
import { IPopupOptions } from "devextreme-react/popup";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { toast } from "react-toastify";
import "./Mst_CarStdOpt.scss";

import { requiredType } from "@/packages/common/Validation_Rules";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { FormOptions } from "@/types";
import { DataGrid } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { usePopupView } from "../components";

export const Mst_CarStdOptPage = () => {
  const { t } = useI18n("Mst_CarStdOpt");
  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom);

  const [searchCondition, setSearchCondition] = useState<
    Partial<SearchMst_CarStdOptParam>
  >({
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS,
    ModelCode: "",
    StdOptCode: "",
    StdOptDescription: "",
  });

  const setSelectedItems = useSetAtom(selectedItemsAtom);

  const api = useClientgateApi();

  const { data, isLoading, refetch } = useQuery(
    ["Mst_CarStdOpt", JSON.stringify(searchCondition)],
    () =>
      api.Mst_CarStdOpt_Search({
        ...searchCondition,
      })
  );

  const { data: listSpec } = useQuery(
    ["ListSpec"],
    api.Mst_CarStdOpt_GetAllActive
  );

  const { data: listModel } = useQuery(
    ["ListModel"],
    api.Mst_CarModel_GetAllActive
  );

  // Column settings
  const columns: ColumnOptions[] = [
    {
      dataField: "StdOptCode",
      caption: t("StdOptCode"),
      visible: true,
      columnIndex: 1.2,
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
      dataField: "StdOptDescription",
      caption: t("StdOptDescription"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 1.3,
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
      columnIndex: 1.1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
      validationRules: [requiredType],
    },

    {
      dataField: "GradeCode",
      caption: t("GradeCode"),
      editorType: "dxTextBox",
      editorOptions: {
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "GradeDescription",
      caption: t("GradeDescription"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
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
    if (["ModelCode", "StdOptCode"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      e.editorOptions.value = false;
    }
  };

  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: t("Mst_CarStdOpt Information"),
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
    .filter(
      (c) =>
        c.groupKey === "BASIC_INFORMATION" &&
        (c.columnIndex === 1.1 ||
          c.columnIndex === 1.2 ||
          c.columnIndex === 1.3)
    )
    .sort((a: any, b: any) => a.columnIndex - b.columnIndex);
  const firstRow_Col2 = columns.filter(
    (c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 2
  );

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "left",
    items: [
      {
        itemType: "group",
        colCount: 2,
        items: zip(firstRow_Col1, firstRow_Col2),
        caption: t("BASIC_INFORMATION"),
        cssClass: "collapsible form-group",
      },
    ],
  };
  const onModify = async (id: string, data: Mst_CarStdOpt) => {
    const resp = await api.Mst_CarStdOpt_Update(id, {
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
  const onCreate = async (data: Mst_CarStdOpt & { __KEY__: string }) => {
    const { __KEY__, ...rest } = data;
    const resp = await api.Mst_CarStdOpt_Create({
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
    const resp = await api.Mst_CarStdOpt_Delete(id);
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
    const resp = await api.Mst_CarStdOpt_DeleteMultiple(rows);

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
      dataField: "StdOptCode",
      caption: t("StdOptCode"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "StdOptDescription",
      caption: t("StdOptDescription"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("ModelCode"),
      dataField: "ModelCode",
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: t("Input"),
        items: listModel?.DataList || [],
        displayExpr: (item: any) =>
          item ? `${item.ModelCode} - ${item.ModelName}` : "",
        valueExpr: "ModelCode",
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
              keyExpr={["ModelCode", "StdOptCode", "GradeCode"]}
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
