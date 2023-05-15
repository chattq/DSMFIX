import {useI18n} from "@/i18n/useI18n";
import {useSetAtom} from "jotai";
import {searchPanelVisibleAtom} from "@layouts/content-searchpanel-layout";
import Form, {IItemProps} from "devextreme-react/form";
import { useMemo, useRef} from "react";
import {Header} from "./header";


interface SearchPanelProps {
  conditionFields: IItemProps[];
  data?: any;
  onSearch?: (data: any) => void;
}

export const SearchPanelV2 = ({conditionFields = [], data, onSearch}: SearchPanelProps) => {
  const {t} = useI18n("Common")
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom)
  const onToggleSettings = () => {

  }
  let formData = {...data};
  const onClose = () => {
    setSearchPanelVisible(false)
  }
  const formRef = useRef<Form | null>(null);
  const handleSearch = (e: any) => {
    const data = formRef.current?.instance?.option('formData');
    onSearch?.(data)
    e.preventDefault()
  }
  const items = [
    ...conditionFields,
    {
      itemType: 'button',
      cssClass: 'w-full flex items-center justify-center',
      buttonOptions: {
        text: t('Search'),
        stylingMode: 'contained',
        type: 'default',
        width: '100%',
        useSubmitBehavior: true,
      }
    }
  ]
  const searchForm = useMemo(() => {
    return (
      <Form
        ref={r => formRef.current = r}
        formData={data}
        labelLocation={'top'}
        colCount={1}
        className={'p-2'}
        items={items}>
      </Form>
    )
  }, [data])
  return (
    <div className={'h-full p-1'}>
      <Header onCollapse={onClose} onToggleSettings={onToggleSettings}/>
      <form onSubmit={handleSearch}>
        {searchForm}
      </form>
    </div>
  )
}
