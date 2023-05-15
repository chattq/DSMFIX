import { ApiResponse, Mst_Storage, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_StorageApi = (apiBase: AxiosInstance) => {
  return {
    Mst_Storage_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_Storage>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Storage>>(
        "/MstStorage/Search",
        {
          ...params,
        }
      );
    },

    Mst_Storage_GetAllActive: async () => {
      return await apiBase.post<Partial<Mst_Storage>, ApiResponse<Mst_Storage>>(
        "/MstStorage/GetAllActive"
      );
    },

    Mst_Storage_GetByStorageCode: async (
      StorageCode: string
    ): Promise<ApiResponse<Mst_Storage>> => {
      return await apiBase.post<string, ApiResponse<Mst_Storage>>(
        "/MstStorage/GetAreaByCode",
        {
          StorageCode: StorageCode,
        }
      );
    },

    Mst_Storage_Update: async (
      key: any[],
      data: Partial<Mst_Storage>
    ): Promise<ApiResponse<Mst_Storage>> => {
      console.log(data);
      return await apiBase.post<Partial<Mst_Storage>, ApiResponse<Mst_Storage>>(
        "/MstStorage/Update",
        {
          strJson: JSON.stringify({
            ...key,
            ...data,
          }),
          ColsUpd: Object.keys(data).join(","),
        }
      );
    },

    Mst_Storage_Create: async (
      storage: Partial<Mst_Storage>
    ): Promise<ApiResponse<Mst_Storage>> => {
      return await apiBase.post<Partial<Mst_Storage>, ApiResponse<Mst_Storage>>(
        "/MstStorage/Create",
        {
          strJson: JSON.stringify(storage),
        }
      );
    },

    Mst_Storage_Delete: async (StorageCode: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Storage>>(
        "/MstStorage/Delete",
        {
          StorageCode: StorageCode,
        }
      );
    },

    Mst_Storage_DeleteMultiple: async (listSalesOrderType: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Storage>>(
        "/MstStorage/DeleteMultiple",
        {
          strJson: JSON.stringify(listSalesOrderType),
        }
      );
    },

    Mst_Storage_ImportExcel: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstStorage/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_Storage_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Storage>, ApiResponse<string>>(
        "/MstStorage/ExportTemplate",
        {}
      );
    },

    Mst_Storage_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<Partial<Mst_Storage>, ApiResponse<string>>(
          "/MstStorage/Export",
          {
            KeyWord: keyword,
            FlagActive: "",
          }
        );
      }
    },

    Mst_Storage_ExportByListStorageCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Storage>, ApiResponse<string>>(
        "/MstStorage/ExportByListStorageCode",
        {
          ListStorageCode: keys.join(","),
        }
      );
    },
  };
};
