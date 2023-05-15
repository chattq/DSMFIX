import {useI18n} from "@/i18n/useI18n";
import {useSetAtom} from "jotai";
import {searchPanelVisibleAtom} from "@layouts/content-searchpanel-layout";
import Form, {IItemProps} from "devextreme-react/form";
import {useCallback, useEffect, useMemo, useReducer, useRef} from "react";
import {Header} from "./header";
import {useVisibilityControl} from "@packages/hooks";
import {SearchPanelSettings} from "@packages/ui/search-panel/search-panel-settings";
import {useSavedState} from "@packages/ui/base-gridview/use-saved-state";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import {ColumnOptions} from "@packages/ui/base-gridview";

interface ItemProps extends IItemProps {
  order?: number
}
interface SearchPanelProps {
  conditionFields: ItemProps[];
  data?: any;
  onSearch?: (data: any) => void;
  storeKey: string;
}
export const SearchPanelV2 = ({conditionFields = [], data, onSearch, storeKey}: SearchPanelProps) => {
  const {t} = useI18n("Common")
  const {loadState, saveState} = useSavedState<ColumnOptions[]>({storeKey: `search-panel-settings-${storeKey}`})
  
  const [realColumns, setRealColumns] = useReducer(
    (state: any, changes: any) => {
      // save changes into localStorage
      saveState(changes)
      return changes;
    },
    conditionFields
  );
  
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      // savedState is an array of ColumnOptions objects
      // we need merge this array with `columns` array.
      // which column exists in savedState will be set to be visible
      // otherwise will be hide
      const outputColumns = conditionFields.map(
        (column: ColumnOptions) => {
          const filterResult = savedState.filter((c: ColumnOptions) => c.dataField === column.dataField && c.visible);
          column.visible = filterResult.length > 0;
          return column;
        }
      )
      setRealColumns(outputColumns);
    }
  }, [])

  
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom)
  const onToggleSettings = () => {
    settingPopupVisible.toggle()
  }
  const onClose = () => {
    setSearchPanelVisible(false)
  }
  const formRef = useRef<Form | null>(null);
  const settingPopupVisible = useVisibilityControl({defaultVisible: false})
  const handleSearch = (e: any) => {
    const data = formRef.current?.instance?.option('formData');
    onSearch?.(data)
    e.preventDefault()
  }
  const items = useMemo( () => {
    return ([
      ...realColumns,
      {
        itemType: 'button',
        cssClass: 'w-full flex items-center justify-center',
        visible: true,
        order: 9999,
        buttonOptions: {
          text: t('Search'),
          stylingMode: 'contained',
          type: 'default',
          width: '100%',
          useSubmitBehavior: true,
        }
      }
    ])
  }, [realColumns])
  
  const handleApplySettings = useCallback((items: ItemProps[]) => {
    setRealColumns(items);
    settingPopupVisible.close()
  }, [])
  
  const handleCloseSearchSettings = useCallback(() => {
    settingPopupVisible.close()
  }, [])
  return (
    <div className={'h-full p-1'} id={'search-panel'}>
      <Header onCollapse={onClose} onToggleSettings={onToggleSettings}/>
      <form onSubmit={handleSearch}>
        <Form
          ref={r => formRef.current = r}
          formData={data}
          labelLocation={'top'}
          colCount={1}
          className={'p-2'}
          items={items}>
        </Form>
      </form>
      <CustomColumnChooser
        title={t('SearchPanelSettings')}
        applyText={t('Apply')}
        cancelText={t('Cancel')}
        selectAllText={t('SelectAll')}
        container={"body"}
        button={'#toggle-search-settings'}
        onHiding={handleCloseSearchSettings}
        onApply={handleApplySettings}
        visible={settingPopupVisible.visible} 
        columns={conditionFields}
        actualColumns={realColumns}
        position={'left'}
        storeKey={'search-panel'}
      />
    </div>
  )
}
