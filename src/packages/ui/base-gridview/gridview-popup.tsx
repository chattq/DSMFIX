import { Button, DataGrid, LoadPanel } from "devextreme-react";
import {
  Button as DxButton,
  Column,
  ColumnChooser,
  ColumnFixing,
  Editing,
  HeaderFilter, IStateStoringProps,
  Item as ToolbarItem,
  Pager,
  Paging,
  Scrolling,
  Selection,
  Texts,
  Toolbar,
} from "devextreme-react/data-grid";

import { PageSize } from "@packages/ui/page-size";
import CustomStore from "devextreme/data/custom_store";
import {ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useReducer, useRef, useState,} from "react";

import ScrollView from "devextreme-react/scroll-view";
import "./base-gridview.scss";

import { useI18n } from "@/i18n/useI18n";
import { logger } from "@/packages/logger";
import { useVisibilityControl } from "@packages/hooks";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { IFormOptions } from "devextreme-react/form";
import {IPopupOptions} from "devextreme-react/popup";
import { EditingStartEvent, EditorPreparingEvent, } from "devextreme/ui/data_grid";
import { DeleteConfirmationBox } from "../modal";
import { ColumnOptions, ToolbarItemProps } from "./types";
import {useSavedState} from "@packages/ui/base-gridview/use-saved-state";
import {PopupGridPageNavigator} from "@packages/ui/base-gridview/popup-grid-page-navigator";
import {PopupGridPageSummary} from "@packages/ui/base-gridview/popup-grid-page-summary";
import {useSetAtom} from "jotai";
import {popupGridStateAtom} from "@packages/ui/base-gridview/popup-grid-store";


interface GridViewProps {
  defaultPageSize?: number;
  dataSource: CustomStore | Array<any>;
  columns: ColumnOptions[];
  allowSelection: boolean;
  ref: ForwardedRef<any>;
  onReady?: (ref: any) => void;
  allowInlineEdit?: boolean;
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
  onEditingStart?: (e: EditingStartEvent) => void;
  stateStoring?: IStateStoringProps;
  storeKey: string;
}

const GridViewRaw = ({
  ref,
  onEditorPreparing,
  onSaveRow,
  isLoading = false,
  keyExpr,
  onDeleteRows,
  onSelectionChanged,
  dataSource,
  columns,
  onReady,
  allowInlineEdit = true,
  popupSettings,
  formSettings,
  toolbarItems,
  onEditRowChanges,
  onEditingStart,
  stateStoring,
  storeKey
}: GridViewProps) => {
  const dataGridRef = useRef<DataGrid | null>(null);
  
  const popupSettingsMemo = useMemo(() => popupSettings, [popupSettings])
  const formSettingsMemo = useMemo(() => formSettings, [formSettings])
  const windowSize = useWindowSize();
  const onChangePageSize = (pageSize: number) => {
    dataGridRef.current?.instance.pageSize(pageSize);
  };
  logger.debug("rerender grid")

  const [visible, setVisible] = useState(false);

  const {saveState, loadState} = useSavedState<ColumnOptions[]>({storeKey})
  
  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      // save changes into localStorage
      saveState(changes)
      return changes;
    },
    columns
  );
  const [isLoadingState, setIsLoadingState] = useState(true);
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
      )
      setColumnsState(outputColumns);
      setIsLoadingState(false)
    }
  }, [])

  const onHiding = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onApply = useCallback(
    (changes: any) => {
      setColumnsState(changes);
      setVisible(false);
    },
    [setColumnsState, setVisible]
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
        onClick: () => setVisible(!visible),
      },
    });
  }, []);
  const [selectionKeys, setSelectionKeys] = useState<string[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const handleSelectionChanged = useCallback( (e: any) => {
    setSelectionKeys(e.selectedRowKeys);
    onSelectionChanged?.(e.selectedRowKeys);
  }, []);

  const handleEditingStart = useCallback( (e: EditingStartEvent) => {
    logger.debug("e:", e);
    onEditingStart?.(e);
  }, []);
  const handleEditCancelled = useCallback( () => {
  }, []);

  const handleSaved = useCallback((e: any) => {
    logger.debug("saved event:", e);
  }, []);
  const handleAddingNewRow = () => {
  };

  const { t, tf } = useI18n("Common");
  let innerGridRef = useRef<DataGrid>(null);

  const setRef = (ref: any) => {
    dataGridRef.current = ref
    innerGridRef = ref;
  };

  const onCancelDelete = useCallback( () => {
  }, []);
  const onDelete = useCallback( () => {
    onDeleteRows?.(selectionKeys);
  }, []);
  const onDeleteSingle = useCallback(() => {
    if(deletingId) {
      onDeleteRows?.([deletingId]);
    }
  }, []);
  const controlConfirmBoxVisible = useVisibilityControl({
    defaultVisible: false,
  });
  const controlDeleteSingleConfirmBox = useVisibilityControl({
    defaultVisible: false
  })
  const handleConfirmDelete = useCallback(() => {
    controlConfirmBoxVisible.open();
  }, []);
  const handlePageChanged = useCallback((pageIndex: number) => {
    dataGridRef.current?.instance.pageIndex(pageIndex)
  }, [])
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
      render: () => {
        return (
          <PageSize
            title={t("Showing")}
            onChangePageSize={onChangePageSize}
            allowdPageSizes={[100, 200, 500, 1000]}
            showAllOption={true}
            showAllOptionText={t("ShowAll")}
            defaultPageSize={100}
          />
        );
      },
    },
    {
      location: "after",
      render: () => {
        return (
          <PopupGridPageNavigator
            onPageChanged={handlePageChanged}
          />
        );
      },
    },
    {
      location: "after",
      render: () => {
        return (
          <PopupGridPageSummary/>
        );
      },
    },
    {
      location: "after",
      render: () => {
        return (
          <CustomColumnChooser
            title={t("ToggleColumn")}
            applyText={t("Apply")}
            cancelText={t("Cancel")}
            selectAllText={t("SelectAll")}
            container={"#gridContainer"}
            button={"#myColumnChooser"}
            visible={visible}
            columns={columns}
            actualColumns={realColumns}
            onHiding={onHiding}
            onApply={onApply}
          />
        );
      },
    },
  ];
  
  const innerSavingRowHandler = useCallback((e: any) => {
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const {type} = e.changes[0];
      if(type === "insert" || type === "update") {
        // pass handle to parent page
        onSaveRow?.(e);
      } else {
        // set selected keys, then open the confirmation
        setDeletingId(e.changes[0].key)
        
        // show the confirmation box of Delete single case
        controlDeleteSingleConfirmBox.open();
        
        // this one to clear `changes` set from grid.
        dataGridRef.current?.instance.cancelEditData()
      }
    }
    e.cancel = true;
  }, [])
  const setGridAtom = useSetAtom(popupGridStateAtom)
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
          noDataText={t("There is no data")}
          remoteOperations={false}
          columnAutoWidth={true}
          repaintChangesOnly
          showBorders
          onInitialized={() => {
            onReady?.(dataGridRef);
          }}
          onContentReady={() => {
            setGridAtom({
              pageIndex: dataGridRef.current?.instance.pageIndex() ?? 0,
              pageSize: dataGridRef.current?.instance.pageSize() ?? 0,
              pageCount: dataGridRef.current?.instance.pageCount() ?? 0,
              totalCount: dataGridRef.current?.instance.totalCount() ?? 0
            })
          }}
          allowColumnResizing
          showColumnLines
          showRowLines
          columnResizingMode={"widget"}
          onToolbarPreparing={onToolbarPreparing}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={onEditorPreparing}
          onEditingStart={handleEditingStart}
          onEditCanceled={handleEditCancelled}
          onSaved={handleSaved}
          onInitNewRow={handleAddingNewRow}
          onSaving={innerSavingRowHandler}
          onRowRemoved={(e: any) => {
            // to support custom delete confirmation
            e.cancel = true;
          }}
          onRowRemoving={(e: any) => {
            // to support custom delete confirmation
            e.cancel = true;
          }}
          stateStoring={stateStoring}
        >
          <ColumnChooser enabled={true} allowSearch={true} mode={"select"} />
          <ColumnFixing enabled={true} />
          <Pager visible={false} />
          <Paging enabled={true} defaultPageSize={100} />
          <HeaderFilter
            visible={true}
            dataSource={dataSource}
            allowSearch={true}
          />
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
            mode={'popup'}
            useIcons={true}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
            popup={popupSettingsMemo}
            form={formSettingsMemo ?? {}}
            confirmDelete={false} // custom confirm delete dialog
            onChangesChange={onEditRowChanges}
          >
            <Texts
              confirmDeleteMessage={t("Are you sure to delete those records?")}
              ok={t("OK")}
              cancel={t("Cancel")}
            />
          </Editing>
          <Column
            visible={allowInlineEdit}
            type="buttons"
            width={110}
            fixed={false}
            allowResizing={false}
          >
            <DxButton name="edit" />
            <DxButton name="delete" />
          </Column>
          <Selection mode="multiple" selectAllMode="page" />
          <Scrolling renderAsync={true} mode={'standard'} showScrollbar={'always'} rowRenderingMode={'standard'} />
          {realColumns.map((col: any) => (
            <Column key={col.dataField}
              {...col}
              allowSorting={true}
            />
          ))}
        </DataGrid>
      </ScrollView>
      <DeleteConfirmationBox
        control={controlConfirmBoxVisible}
        title={t("Are you sure to delete selected records")}
        onYesClick={onDelete}
        onNoClick={onCancelDelete}
      />
      <DeleteConfirmationBox
        control={controlDeleteSingleConfirmBox}
        title={tf("Are you sure to delete this {0} record?", deletingId)}
        onYesClick={onDeleteSingle}
        onNoClick={onCancelDelete}
      />
    </div>
  );
};

export const GridViewPopup = forwardRef(
  (props: Omit<GridViewProps, "ref">, ref: any) => {
    if(props.isLoading) {
      return null;
    } else {
      return <GridViewRaw ref={ref} {...props} />;
    }
  }
);
GridViewPopup.displayName = "GridViewPopup";