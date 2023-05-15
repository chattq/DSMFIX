import { AuthState } from "@/types";
import { atom } from "jotai";
import {atomsWithQuery} from "jotai-tanstack-query";
import {createClientGateApi} from "@packages/api";
import {logger} from "@packages/logger";
import { atomWithLocalStorage } from "./utils";

const emptyState: AuthState = {
  token: localStorage.getItem("token") || undefined,
  networkId: localStorage.getItem("networkId") || '0',
  clientGateUrl: localStorage.getItem("clientGateUrl") || undefined,
  currentUser: undefined,
  clientGate: undefined,
  permissions: undefined,
};
export const authAtom = atomWithLocalStorage<AuthState>('auth', emptyState);
export const loggedInAtom = atom((get) => {
  return !!get(authAtom).token;
});

const [permissionAtom] = atomsWithQuery((get) => ({
  queryKey: ['permissions'],
  queryFn: async ({ }) => {
    const auth = get(authAtom);
    logger.debug('auth:', auth)
    if(auth) {
      const { currentUser, networkId, orgData, clientGateUrl } = auth;
      if(!currentUser) {
        return {}
      }
      const api = createClientGateApi(
        currentUser!,
        clientGateUrl!,
        networkId,
        orgData?.Id!
      )
      const res = await api.getUserPermissions();
      if (res.isSuccess) {
        return res.Data
      } else {
        return {};
      }
    } 
    return {};
  },
  keepPreviousData: false,
}));

export {
  permissionAtom
}