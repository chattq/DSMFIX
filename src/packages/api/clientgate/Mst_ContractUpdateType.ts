import {
  ApiResponse,
  Mst_ContractUpdateType,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_ContractUpdateTypeApi = (apiBase: AxiosInstance) => {
  return {
    Mst_ContractUpdateType_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_ContractUpdateType>> => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_ContractUpdateType>
      >("/MstContractUpdateType/Search", {
        ...params,
      });
    },
    Mst_ContractUpdateType_GetByContractUpdateType: async (
      ContractUpdateType: string
    ): Promise<ApiResponse<Mst_ContractUpdateType>> => {
      return await apiBase.post<string, ApiResponse<Mst_ContractUpdateType>>(
        "/MstContractUpdateType/GetByContractUpdateType",
        {
          ContractUpdateType: ContractUpdateType,
        }
      );
    },

    Mst_ContractUpdateType_Update: async (
      key: string[],
      data: Partial<Mst_ContractUpdateType>
    ): Promise<ApiResponse<Mst_ContractUpdateType>> => {
      return await apiBase.post<
        Partial<Mst_ContractUpdateType>,
        ApiResponse<Mst_ContractUpdateType>
      >("/MstContractUpdateType/Update", {
        strJson: JSON.stringify({
          ContractUpdateType: key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_ContractUpdateType_Create: async (
      ContractUpdateTypeMst_ContractUpdateType: Partial<Mst_ContractUpdateType>
    ): Promise<ApiResponse<Mst_ContractUpdateType>> => {
      return await apiBase.post<
        Partial<Mst_ContractUpdateType>,
        ApiResponse<Mst_ContractUpdateType>
      >("/MstContractUpdateType/Create", {
        strJson: JSON.stringify(ContractUpdateTypeMst_ContractUpdateType),
      });
    },

    Mst_ContractUpdateType_Delete: async (ContractUpdateType: string) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_ContractUpdateType>
      >("/MstContractUpdateType/Delete", {
        ContractUpdateType: ContractUpdateType,
      });
    },

    Mst_ContractUpdateType_DeleteMultiple: async (
      contractUpdateType: string[]
    ) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_ContractUpdateType>
      >("/MstContractUpdateType/DeleteMultiple", {
        strJson: JSON.stringify(contractUpdateType),
      });
    },

    Mst_ContractUpdateType_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstContractUpdateType/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_ContractUpdateType_ExportTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_ContractUpdateType>,
        ApiResponse<string>
      >("/MstContractUpdateType/ExportTemplate", {});
    },

    Mst_ContractUpdateType_ExportByListContractUpdateType: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_ContractUpdateType>,
        ApiResponse<string>
      >("/MstContractUpdateType/ExportByListContractUpdateType", {
        ListContractUpdateType: keys.join(","),
      });
    },

    Mst_ContractUpdateType_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_ContractUpdateType>,
        ApiResponse<string>
      >("/MstContractUpdateType/Export", {
        KeyWord: keyword,
      });
    },
  };
};
