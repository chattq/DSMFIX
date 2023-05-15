import {useSlot, withSlot} from "@packages/hooks/useSlot";
import React, {PropsWithChildren, useMemo} from "react";
import Drawer from "devextreme-react/drawer";
import {atom, useAtomValue} from "jotai";


export const searchPanelVisibleAtom = atom(false)
interface ContentSearchPanelLayoutProps {
}

export const InnerContentSearchPanelLayout = ({children}: PropsWithChildren<ContentSearchPanelLayoutProps>) => {
  const searchPanelVisible = useAtomValue(searchPanelVisibleAtom)
  const SearchPanelSlot = useSlot({
    children,
    name: "SearchPanel",
  });
  const ContentPanelSlot = useSlot({
    children,
    name: "ContentPanel",
  });
  const contentPanelMemo = useMemo(() => {
    return ( <ContentPanelSlot />
    )
  }, [])
  return (
    <div className={'h-full'}>
      <Drawer
        opened={searchPanelVisible}
        openedStateMode={'shrink'}
        position='left'
        revealMode={'slide'}
        render={() => <div className={''}>
          <SearchPanelSlot />
        </div>}
        height={'100%'}>
        <div className="w-full h-full">
          {contentPanelMemo}
        </div>
      </Drawer>
    </div>
  )
}

export const ContentSearchPanelLayout = withSlot(InnerContentSearchPanelLayout)