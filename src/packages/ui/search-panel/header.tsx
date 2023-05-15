import {useI18n} from "@/i18n/useI18n";
import {Button} from "devextreme-react";

interface HeaderProps {
  onToggleSettings?: () => void;
  onCollapse?: () => void;
}
export const Header = ({onCollapse, onToggleSettings}: HeaderProps) => {
  const {t} = useI18n("Common")
  return (
    <div className={'flex flex-row p-1 items-center'}>
      <div className={'mr-auto flex items-center'}>
        <img src={'/images/icons/search.svg'} alt={'Search'} className={'w-[20px]'} />
        <span className={'ml-2 text-primary'}>{t('Search')}</span>
      </div>
      <div className={'flex-end ml-auto'} >
        <Button icon={'/images/icons/settings.svg'} onClick={onToggleSettings}/>
        <Button icon={'/images/icons/collapse-left.svg'} onClick={onCollapse} />
      </div>
    </div>
  )
}
