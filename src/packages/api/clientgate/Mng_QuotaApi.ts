import { ApiResponse, Mng_Quota, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMng_Quota = (apiBase: AxiosInstance) => {
  return {
    Mng_Quota_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mng_Quota>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mng_Quota>>(
        "/MngQuota/Search",
        {
          ...param,
        }
      );
    },

    Mng_Quota_Delete: async (key: string): Promise<ApiResponse<Mng_Quota>> => {
      return await apiBase.post<string, ApiResponse<Mng_Quota>>(
        "/MngQuota/Delete",
        {
          CustomerBaseCode: key,
        }
      );
    },

    Mng_Quota_Create: async (
      data: Partial<Mng_Quota>
    ): Promise<ApiResponse<Partial<Mng_Quota>>> => {
      return apiBase.post<Partial<Mng_Quota>, ApiResponse<Mng_Quota>>(
        "/MngQuota/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mng_Quota_Update: async (
      key: string,
      data: Partial<Mng_Quota>
    ): Promise<ApiResponse<Mng_Quota>> => {
      return await apiBase.post("/MngQuota/Update", {
        strJson: JSON.stringify({
          ...data,
          CustomerBaseCode: key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mng_Quota_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mng_Quota>, ApiResponse<string>>(
        "/MngQuota/Export",
        {
          KeyWord: keyword,
          FlagActive: "",
        }
      );
    },

    Mng_Quota_ExportExcel_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mng_Quota>, ApiResponse<string>>(
        "/MngQuota/ExportTemplate"
      );
    },

    Mng_Quota_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MngQuota/Import",
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
