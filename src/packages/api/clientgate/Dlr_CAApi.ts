import { ApiResponse, Dlr_CA, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useDlr_CA = (apiBase: AxiosInstance) => {
  return {
    Dlr_CA_Search: async (param: SearchParam): Promise<ApiResponse<Dlr_CA>> => {
      return await apiBase.post<SearchParam, ApiResponse<Dlr_CA>>(
        "/DlrCA/Search",
        {
          ...param,
        }
      );
    },

    Dlr_CA_Delete: async (key: string): Promise<ApiResponse<Dlr_CA>> => {
      console.log("key ", key);

      return await apiBase.post<string, ApiResponse<Dlr_CA>>("/DlrCA/Delete", {
        AutoId: key,
      });
    },

    Dlr_CA_Create: async (
      data: Partial<Dlr_CA>
    ): Promise<ApiResponse<Partial<Dlr_CA>>> => {
      return apiBase.post<Partial<Dlr_CA>, ApiResponse<Dlr_CA>>(
        "/DlrCA/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Dlr_CA_Update: async (
      key: string,
      data: Partial<Dlr_CA>
    ): Promise<ApiResponse<Dlr_CA>> => {
      return await apiBase.post("/DlrCA/Update", {
        strJson: JSON.stringify({
          ...data,
          AutoId: key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Dlr_CA_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<Partial<Dlr_CA>, ApiResponse<string>>(
          "/DlrCA/ExportByListAutoId",
          {
            ListAutoId: keys.join(","),
          }
        );
      }

      return await apiBase.post<Partial<Dlr_CA>, ApiResponse<string>>(
        "/DlrCA/Export",
        {
          KeyWord: keyword,
          FlagActive: "",
        }
      );
    },

    Dlr_CA_ExportExcel_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Dlr_CA>, ApiResponse<string>>(
        "/DlrCA/ExportTemplate"
      );
    },

    Dlr_CA__DeleteMultiple: async (provinceCodes: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Dlr_CA>>(
        "/DlrCA/DeleteMultiple",
        {
          strJson: JSON.stringify(
            provinceCodes.map((item) => ({
              AutoId: item,
            }))
          ),
        }
      );
    },

    Dlr_CA_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>("/DlrCA/Import", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  };
};
