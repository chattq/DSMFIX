import { ApiResponse, Mst_StorageAreaRate, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_StorageAreaRate = (apiBase: AxiosInstance) => {
  return {
    Mst_StorageAreaRate_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_StorageAreaRate>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_StorageAreaRate>>(
        "/MstStorageAreaRate/Search",
        {
          ...param,
        }
      );
    },

    Mst_StorageAreaRate_Delete: async (
      key: Partial<Mst_StorageAreaRate>
    ): Promise<ApiResponse<Mst_StorageAreaRate>> => {
      return await apiBase.post<string, ApiResponse<Mst_StorageAreaRate>>(
        "/MstStorageAreaRate/Delete",
        {
          ...key,
        }
      );
    },

    Mst_StorageAreaRate_Create: async (
      data: Partial<Mst_StorageAreaRate>
    ): Promise<ApiResponse<Partial<Mst_StorageAreaRate>>> => {
      return apiBase.post<
        Partial<Mst_StorageAreaRate>,
        ApiResponse<Mst_StorageAreaRate>
      >("/MstStorageAreaRate/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_StorageAreaRate_Update: async (
      key: Partial<Mst_StorageAreaRate>,
      data: Partial<Mst_StorageAreaRate>
    ): Promise<ApiResponse<Mst_StorageAreaRate>> => {
      return await apiBase.post("/MstStorageAreaRate/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_StorageAreaRate_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_StorageAreaRate>,
          ApiResponse<string>
        >("/MstStorageAreaRate/ExportByListCode", {
          ListCustomerBaseCode: keys.join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Mst_StorageAreaRate>,
          ApiResponse<string>
        >("/MstStorageAreaRate/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_StorageAreaRate_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_StorageAreaRate>,
        ApiResponse<string>
      >("/MstStorageAreaRate/ExportTemplate");
    },

    Mst_StorageAreaRate_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_StorageAreaRate>>(
        "/MstStorageAreaRate/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_StorageAreaRate_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstStorageAreaRate/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};
