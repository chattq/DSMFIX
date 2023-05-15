import { ApiResponse, Dlr_StorageLocal, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useDlr_StorageLocalApi = (apiBase: AxiosInstance) => {
  return {
    Dlr_StorageLocal_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Dlr_StorageLocal>> => {
      return await apiBase.post<SearchParam, ApiResponse<Dlr_StorageLocal>>(
        "/DlrStorageLocal/Search",
        {
          ...params,
        }
      );
    },

    Dlr_StorageLocal_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Dlr_StorageLocal>,
        ApiResponse<Dlr_StorageLocal>
      >("/DlrStorageLocal/GetAllActive");
    },

    Dlr_StorageLocal_GetByStorageCode: async (
      StorageCode: string
    ): Promise<ApiResponse<Dlr_StorageLocal>> => {
      return await apiBase.post<string, ApiResponse<Dlr_StorageLocal>>(
        "/DlrStorageLocal/GetByStorageCode",
        {
          StorageCode: StorageCode,
        }
      );
    },

    Dlr_StorageLocal_Update: async (
      key: any,
      data: Partial<Dlr_StorageLocal>
    ): Promise<ApiResponse<Dlr_StorageLocal>> => {
      return await apiBase.post<
        Partial<Dlr_StorageLocal>,
        ApiResponse<Dlr_StorageLocal>
      >("/DlrStorageLocal/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Dlr_StorageLocal_Create: async (
      StorageGlobal: Partial<Dlr_StorageLocal>
    ): Promise<ApiResponse<Dlr_StorageLocal>> => {
      return await apiBase.post<
        Partial<Dlr_StorageLocal>,
        ApiResponse<Dlr_StorageLocal>
      >("/DlrStorageLocal/Create", {
        strJson: JSON.stringify(StorageGlobal),
      });
    },

    Dlr_StorageLocal_Delete: async (StorageGlobal: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Dlr_StorageLocal>>(
        "/DlrStorageLocal/Delete",
        { ...StorageGlobal }
      );
    },

    Dlr_StorageLocal_DeleteMultiple: async (listStorageGlobal: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Dlr_StorageLocal>>(
        "/DlrStorageLocal/DeleteMultiple",
        {
          strJson: JSON.stringify(listStorageGlobal),
        }
      );
    },

    Dlr_StorageLocal_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/DlrStorageLocal/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Dlr_StorageLocal_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Dlr_StorageLocal>, ApiResponse<string>>(
        "/DlrStorageLocal/ExportTemplate",
        {}
      );
    },

    Dlr_StorageLocal_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Dlr_StorageLocal>,
          ApiResponse<string>
        >("/DlrStorageLocal/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Dlr_StorageLocal_ExportByListStorageCode: async (
      object: any
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Dlr_StorageLocal>,
          ApiResponse<string>
        >("/DlrStorageLocal/ExportByListStorageCode", object);
      }
    },
  };
};
