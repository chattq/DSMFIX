import { ApiResponse, Mst_StorageGlobal, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_StorageGlobalApi = (apiBase: AxiosInstance) => {
  return {
    Mst_StorageGlobal_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_StorageGlobal>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_StorageGlobal>>(
        "/MstStorageGlobal/Search",
        {
          ...params,
        }
      );
    },

    Mst_StorageGlobal_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_StorageGlobal>,
        ApiResponse<Mst_StorageGlobal>
      >("/MstStorageGlobal/GetAllActive");
    },

    Mst_StorageGlobal_GetByStorageCode: async (
      StorageCode: string
    ): Promise<ApiResponse<Mst_StorageGlobal>> => {
      return await apiBase.post<string, ApiResponse<Mst_StorageGlobal>>(
        "/MstStorageGlobal/GetByStorageCode",
        {
          StorageCode: StorageCode,
        }
      );
    },

    Mst_StorageGlobal_Update: async (
      key: any,
      data: Partial<Mst_StorageGlobal>
    ): Promise<ApiResponse<Mst_StorageGlobal>> => {
      return await apiBase.post<
        Partial<Mst_StorageGlobal>,
        ApiResponse<Mst_StorageGlobal>
      >("/MstStorageGlobal/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_StorageGlobal_Create: async (
      StorageGlobal: Partial<Mst_StorageGlobal>
    ): Promise<ApiResponse<Mst_StorageGlobal>> => {
      return await apiBase.post<
        Partial<Mst_StorageGlobal>,
        ApiResponse<Mst_StorageGlobal>
      >("/MstStorageGlobal/Create", {
        strJson: JSON.stringify(StorageGlobal),
      });
    },

    Mst_StorageGlobal_Delete: async (StorageGlobal: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_StorageGlobal>>(
        "/MstStorageGlobal/Delete",
        { ...StorageGlobal }
      );
    },

    Mst_StorageGlobal_DeleteMultiple: async (listStorageGlobal: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_StorageGlobal>>(
        "/MstStorageGlobal/DeleteMultiple",
        {
          strJson: JSON.stringify(listStorageGlobal),
        }
      );
    },

    Mst_StorageGlobal_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstStorageGlobal/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_StorageGlobal_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_StorageGlobal>,
        ApiResponse<string>
      >("/MstStorageGlobal/ExportTemplate", {});
    },

    Mst_StorageGlobal_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_StorageGlobal>,
          ApiResponse<string>
        >("/MstStorageGlobal/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_StorageGlobal_ExportByListStorageCode: async (
      object: any
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_StorageGlobal>,
          ApiResponse<string>
        >("/MstStorageGlobal/ExportByListStorageCode", object);
      }
    },
  };
};
