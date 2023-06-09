import dxTreeView, { ItemClickEvent } from 'devextreme/ui/tree_view';
import { EventInfo } from 'devextreme/events';
import { ClickEvent } from "devextreme/ui/button";
import { ClientGateInfo, IOrg, IUser, Row } from "@packages/types";
import {IFormOptions, IItemProps, Item as FormItem} from "devextreme-react/form";
export interface AuthState {
    networkId: string;
    token?: string;
    currentUser?: IUser;
    permissions?: string[];
    orgData?: IOrg;
    clientGate?: ClientGateInfo;
    clientGateUrl?: string;
}
export interface AuthContextData {
    auth: AuthState;
    loggedIn: boolean;
    login: (accessToken: string, user?: IUser, orgData?: IOrg, clientGate?: ClientGateInfo) => void;
    logout: () => void;
    selectNetwork: (networkId: string) => void;
    setClientGateInfo: (clientGate: ClientGateInfo) => void;
}
export interface SidebarItem {
    text: string;
    path: string;
    key: string;
}
export interface HeaderProps {
    menuToggleEnabled: boolean;
    title?: string;
    logo?: boolean;
    toggleMenu?: (e: ClickEvent) => void;
    items?: MenuBarItem[];
    onMenuItemClick?: (item: MenuBarItem) => void;
}

export interface MenuBarProps {
    items: MenuBarItem[];
    bgColor?: string;
    textColor?: string;
    onClick?: (item: MenuBarItem) => void;
}

export interface MenuBarItem {
    [x: string]: any;
    text: string;
    path: string;
    icon?: string;
}

export interface SideNavigationMenuProps {
    selectedItemChanged: (e: ItemClickEvent) => void;
    openMenu: (e: React.PointerEvent) => void;
    compactMode: boolean;
    onMenuReady: (e: EventInfo<dxTreeView>) => void;
}

export interface UserPanelProps {
    menuMode: 'context' | 'list';
}

export interface SideNavToolbarProps {
    title: string;
}

export interface SingleCardProps {
    title?: string;
    description?: string;
}

export type Handle = () => void;

interface NavigationData {
    currentPath: string;
}

export type NavigationContextType = {
    setNavigationData?: ({ currentPath }: NavigationData) => void;
    navigationData: NavigationData;
};

export type ValidationType = {
    value: string;
};


export interface CellInfo<T> {
    data: T;
    row: Row;
    value: any;
    setValue: (value: string, text: string) => void;
}

export interface RouteItem {
    key: string;
    path: string;
    pageTitle?: string;
    mainMenuTitle?: string;
    subMenuTitle?: string;
    mainMenuKey: string;
    subMenuKey?: string;
    permissions?: string;
    getPageElement: Function;
}

export interface ExItem extends IItemProps {
  disableCollapsible?: boolean;
}
export interface FormOptions extends Omit<IFormOptions, 'items'> {
  items: ExItem[]
}
