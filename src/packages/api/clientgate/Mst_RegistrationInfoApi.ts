import {
  ApiResponse,
  Mst_RegistrationInfo,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_RegistrationInfo = (apiBase: AxiosInstance) => {
  return {
    Mst_RegistrationInfo_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_RegistrationInfo>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_RegistrationInfo>>(
        "/MstRegistrationInfo/Search",
        {
          ...param,
        }
      );
    },

    Mst_RegistrationInfo_Delete: async (
      key: Partial<Mst_RegistrationInfo>
    ): Promise<ApiResponse<Mst_RegistrationInfo>> => {
      return await apiBase.post<string, ApiResponse<Mst_RegistrationInfo>>(
        "/MstRegistrationInfo/Delete",
        {
          ...key,
        }
      );
    },

    Mst_RegistrationInfo_Create: async (
      data: Partial<Mst_RegistrationInfo>
    ): Promise<ApiResponse<Partial<Mst_RegistrationInfo>>> => {
      return apiBase.post<
        Partial<Mst_RegistrationInfo>,
        ApiResponse<Mst_RegistrationInfo>
      >("/MstRegistrationInfo/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_RegistrationInfo_Update: async (
      key: Partial<Mst_RegistrationInfo>,
      data: Partial<Mst_RegistrationInfo>
    ): Promise<ApiResponse<Mst_RegistrationInfo>> => {
      return await apiBase.post("/MstRegistrationInfo/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_RegistrationInfo_ExportExcel: async (
      keys: Partial<Mst_RegistrationInfo>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_RegistrationInfo>,
          ApiResponse<string>
        >("/MstRegistrationInfo/ExportByListCode", {
          ListRegistYear: keys
            .map((item: Partial<Mst_RegistrationInfo>) => {
              return item.RegistYear;
            })
            .join(","),
          ListProvinceCode: keys
            .map((item: Partial<Mst_RegistrationInfo>) => {
              return item.ProvinceCode;
            })
            .join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Mst_RegistrationInfo>,
          ApiResponse<string>
        >("/MstRegistrationInfo/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_RegistrationInfo_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_RegistrationInfo>,
        ApiResponse<string>
      >("/MstRegistrationInfo/ExportTemplate");
    },

    Mst_RegistrationInfo_DeleteMultiple: async (
      data: Partial<Mst_RegistrationInfo>[]
    ) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_RegistrationInfo>>(
        "/MstRegistrationInfo/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_RegistrationInfo_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstRegistrationInfo/Import",
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
