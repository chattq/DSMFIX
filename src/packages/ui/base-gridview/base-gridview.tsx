import { Button, DataGrid, LoadPanel } from "devextreme-react";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Button as DxButton,
  Editing,
  HeaderFilter,
  Paging,
  Selection,
  Texts,
  Toolbar,
  Item as ToolbarItem, Pager, Scrolling, IStateStoringProps,
} from "devextreme-react/data-grid";

import { PageSize } from "@packages/ui/page-size";
import CustomStore from "devextreme/data/custom_store";
import {
  ForwardedRef,
  forwardRef,
  useCallback, useEffect, useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import ScrollView from "devextreme-react/scroll-view";
import "./base-gridview.scss";

import { useI18n } from "@/i18n/useI18n";
import { logger } from "@/packages/logger";
import { useVisibilityControl } from "@packages/hooks";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { IFormOptions } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { DeleteConfirmationBox } from "../modal";
import { ColumnOptions, ToolbarItemProps } from "./types";
import { useSavedState } from "@packages/ui/base-gridview/use-saved-state";
import { NormalGridPageNavigator } from "./normal-grid-page-navigator";
import {gridStateAtom} from "@packages/ui/base-gridview/normal-grid-store";
import {useSetAtom} from "jotai";
import {NormalGridPageSummary} from "@packages/ui/base-gridview/normal-grid-page-summary";

interface GridViewProps {
  defaultPageSize?: number;
  dataSource: CustomStore | Array<any>;
  columns: ColumnOptions[];
  allowSelection: boolean;
  ref: ForwardedRef<any>;
  onReady?: (ref: any) => void;
  allowInlineEdit?: boolean;
  inlineEditMode?: "row" | "popup" | "form";
  onEditorPreparing?: (e: EditorPreparingEvent<any, any>) => void;
  onSaveRow?: (option: any) => void;
  isLoading?: boolean;
  keyExpr?: string | string[];
  onDeleteRows?: (rows: string[]) => void;
  onSelectionChanged: (rowKeys: string[]) => void;
  popupSettings?: IPopupOptions;
  formSettings?: IFormOptions;
  toolbarItems?: ToolbarItemProps[];
  onEditRowChanges?: (changes: any) => void;
  storeKey?: string;
  stateStoring?: IStateStoringProps;
}

const GridViewRaw = ({
  ref,
  defaultPageSize = 100,
  onEditorPreparing,
  onSaveRow,
  isLoading = false,
  keyExpr,
  onDeleteRows,
  onSelectionChanged,
  dataSource,
  columns,
  onReady,
  inlineEditMode = "form",
  popupSettings,
  formSettings,
  toolbarItems,
  onEditRowChanges,
  storeKey,
  stateStoring,
}: GridViewProps) => {
  const datagridRef = useRef<DataGrid | null>(null)
  const windowSize = useWindowSize();
  const onChangePageSize = (pageSize: number) => {
    datagridRef?.current?.instance.pageSize(pageSize);
  };
  const onChangePageIndex = (pageIndex: number) => {
    datagridRef?.current?.instance.pageIndex(pageIndex);
  }

  const chooserVisible = useVisibilityControl({defaultVisible: false});

  const { saveState, loadState } = useSavedState({ storeKey: storeKey ?? "empty" });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );

  // I want to restore columns from localStorage if it exists
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      // savedState is an array of ColumnOptions objects
      // we need merge this array with `columns` array.
      // which column exists in savedState will be set to be visible
      // otherwise will be hide
      const outputColumns = columns.map(
        (column: ColumnOptions) => {
          const filterResult = savedState.filter((c: ColumnOptions) => c.dataField === column.dataField);
          column.visible = filterResult.length > 0;
          return column;
        }
      );
      setColumnsState(outputColumns);
    }
  }, []);
  const onHiding = useCallback(() => {
    chooserVisible.close()
  }, []);

  const onApply = useCallback(
    (changes: any) => {
      setColumnsState(changes);
      chooserVisible.close()
    },
    [setColumnsState]
  );
  const onToolbarPreparing = useCallback((e: any) => {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      location: "after",
      options: {
        icon: "/images/icons/settings.svg",
        elementAttr: {
          id: "myColumnChooser",
        },
        onClick: () => chooserVisible.toggle()
      },
    });
  }, []);
  const [selectionKeys, setSelectionKeys] = useState<string[]>([]);
  const handleSelectionChanged = (e: any) => {
    setSelectionKeys(e.selectedRowKeys);
    onSelectionChanged?.(e.selectedRowKeys);
  };

  const switchEditMode = (e: any, isOn: boolean) => {
    if(isOn) {
      e.component.option('sorting.mode', 'none');
      e.component.option("headerFilter.visible", false);
    } else {
      e.component.option('sorting.mode', 'single');
      e.component.option("headerFilter.visible", true);
    }
  }
  const handleEditingStart = (e: any) => {
    switchEditMode(e, true)
  }
  const handleEditCancelled = (e: any) => {
    console.log('editing cancelled', e);
    switchEditMode(e, false)
  };

  const handleSaved = (e: any) => {
    logger.debug("saved event:", e);
    switchEditMode(e, false)
  };

  const handleNewRow = (e: any) => {
    switchEditMode(e, true)
  }
  const { t } = useI18n("Common");
  let innerGridRef = useRef<DataGrid>(null);

  const setRef = (ref: any) => {
    datagridRef.current = ref;
    innerGridRef = ref;
    onReady?.(ref)
  };

  const onCancelDelete = () => { };
  const onDelete = () => {
    onDeleteRows?.(selectionKeys);
  };
  const controlConfirmBoxVisible = useVisibilityControl({
    defaultVisible: false,
  });
  const handleConfirmDelete = () => {
    controlConfirmBoxVisible.open();
  };

  const renderPageSize = useCallback(() => {
    return (
      <PageSize
        title={t("Showing")}
        onChangePageSize={onChangePageSize}
        allowdPageSizes={[100, 200, 500, 1000]}
        showAllOption={true}
        showAllOptionText={t("ShowAll")}
        defaultPageSize={datagridRef.current?.instance.pageSize()}
      />
    )
  }, [])
  const renderPageNavigator = useCallback(() => {
    return (
      <NormalGridPageNavigator onPageChanged={onChangePageIndex} />
    )
  }, [])
  
  const renderPageSummary = useCallback(() => {
    return (
      <NormalGridPageSummary />
    )
  }, [])
  const renderColumnChooser = useCallback(() => {
    return (
      <CustomColumnChooser
        title={t("ToggleColumn")}
        applyText={t("Apply")}
        cancelText={t("Cancel")}
        selectAllText={t("SelectAll")}
        container={"#gridContainer"}
        button={"#myColumnChooser"}
        visible={chooserVisible.visible}
        columns={columns}
        onHiding={onHiding}
        onApply={onApply}
        actualColumns={realColumns}
      />
    );
  }, [chooserVisible, realColumns, columns]);
  const allToolbarItems: ToolbarItemProps[] = [
    ...(toolbarItems || []),
    {
      location: "before",
      widget: "dxButton",
      options: {
        text: t("Delete"),
        onClick: handleConfirmDelete,
        visible: selectionKeys.length >= 1,
        stylingMode: "contained",
        type: "default",
      },
    },
    {
      location: "after",
      render: renderPageSize,
    },
    {
      location: "after",
      render: renderPageNavigator
    },
    {
      location: "after",
      render: renderPageSummary,
    },
    {
      location: "after",
      render: renderColumnChooser,
    },
  ]

  const handleEditorPreparing = (e: any) => {
    onEditorPreparing?.(e);
  };
  const setGridAtom = useSetAtom(gridStateAtom);
  return (
    <div className={"base-gridview bg-white"}>
      <ScrollView showScrollbar={"always"}>
        <LoadPanel visible={isLoading} position={{ of: "#gridContainer" }} />
        <DataGrid
          keyExpr={keyExpr}
          errorRowEnabled={false}
          cacheEnabled={false}
          id="gridContainer"
          height={`${windowSize.height - 115}px`}
          width={"100%"}
          ref={(r) => setRef(r)}
          dataSource={dataSource}
          noDataText={t("ThereIsNoData")}
          remoteOperations={false}
          columnAutoWidth={true}
          repaintChangesOnly
          showBorders
          onContentReady={(e) => {
            console.log('content change', chooserVisible.visible)
            setGridAtom({
              pageIndex: datagridRef.current?.instance.pageIndex() ?? 0,
              pageSize: datagridRef.current?.instance.pageSize() ?? 0,
              pageCount: datagridRef.current?.instance.pageCount() ?? 0,
              totalCount: datagridRef.current?.instance.totalCount() ?? 0
            })
          }}
          onInitialized={(e) => {
            e.component?.option("headerFilter.visible", true);
            onReady?.(datagridRef.current);
          }}
          allowColumnResizing
          showColumnLines
          showRowLines
          columnResizingMode={"widget"}
          allowColumnReordering={false}
          onToolbarPreparing={onToolbarPreparing}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={handleEditorPreparing}
          onEditCanceled={handleEditCancelled}
          onEditingStart={handleEditingStart}
          onSaved={handleSaved}
          onInitNewRow={handleNewRow}
          onSaving={(e: any) => {
            onSaveRow?.(e);
            e.cancel = true;
          }}
          stateStoring={stateStoring}
        >
          <ColumnChooser enabled={true} />
          <ColumnFixing enabled={true} />
          <Paging enabled={true} defaultPageSize={defaultPageSize}  />
          <Pager visible={false} showInfo={true} displayMode={'adaptive'} showPageSizeSelector />
          <HeaderFilter
            allowSearch={true}
          />
          <Scrolling renderAsync={true} mode={'standard'} showScrollbar={'always'} />
          <Toolbar>
            {!!allToolbarItems &&
              allToolbarItems.map((item, index) => {
                return (
                  <ToolbarItem key={index} location={item.location}>
                    {item.widget === "dxButton" && <Button {...item.options} />}
                    {!!item.render && item.render()}
                  </ToolbarItem>
                );
              })}
          </Toolbar>
          <Editing
            mode={inlineEditMode}
            useIcons={true}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
            popup={inlineEditMode === "popup" ? popupSettings : {}}
            form={formSettings ?? {}}
            onChangesChange={onEditRowChanges ? onEditRowChanges : () => { }}
          >
            <Texts
              confirmDeleteMessage={t("DeleteConfirmation")}
              ok={t("OK")}
              cancel={t("Cancel")}
            />
          </Editing>
          <Column
            visible
            type="buttons"
            width={110}
            fixed={false}
            allowResizing={false}
          >
            <DxButton name="edit" />
            <DxButton name="delete" />
          </Column>
          <Selection mode="multiple" selectAllMode="page" />
          {realColumns.map((col: any) => (
            <Column
              key={col.dataField}
              {...col}
            />
          ))}
        </DataGrid>
      </ScrollView>
      <DeleteConfirmationBox
        control={controlConfirmBoxVisible}
        title={t("Delete")}
        onYesClick={onDelete}
        onNoClick={onCancelDelete}
      />
    </div>
  );
};

export const BaseGridView = forwardRef(
  (props: Omit<GridViewProps, "ref">, ref: any) => {
    return props.isLoading ? null : <GridViewRaw ref={ref} {...props} />;
  }
);
BaseGridView.displayName = "BaseGridView";
