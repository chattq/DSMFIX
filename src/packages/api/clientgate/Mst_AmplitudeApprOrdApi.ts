import {
  ApiResponse,
  Mst_AmplitudeApprOrd,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_AmplitudeApprOrd = (apiBase: AxiosInstance) => {
  return {
    Mst_AmplitudeApprOrd_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_AmplitudeApprOrd>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_AmplitudeApprOrd>>(
        "/MstAmplitudeApprOrd/Search",
        {
          ...param,
        }
      );
    },

    Mst_AmplitudeApprOrd_Delete: async (
      key: Partial<Mst_AmplitudeApprOrd>
    ): Promise<ApiResponse<Mst_AmplitudeApprOrd>> => {
      return await apiBase.post<string, ApiResponse<Mst_AmplitudeApprOrd>>(
        "/MstAmplitudeApprOrd/Delete",
        {
          ...key,
        }
      );
    },

    Mst_AmplitudeApprOrd_Create: async (
      data: Partial<Mst_AmplitudeApprOrd>
    ): Promise<ApiResponse<Partial<Mst_AmplitudeApprOrd>>> => {
      return apiBase.post<
        Partial<Mst_AmplitudeApprOrd>,
        ApiResponse<Mst_AmplitudeApprOrd>
      >("/MstAmplitudeApprOrd/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_AmplitudeApprOrd_Update: async (
      key: Partial<Mst_AmplitudeApprOrd>,
      data: Partial<Mst_AmplitudeApprOrd>
    ): Promise<ApiResponse<Mst_AmplitudeApprOrd>> => {
      return await apiBase.post("/MstAmplitudeApprOrd/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_AmplitudeApprOrd_ExportExcel: async (
      keys: Partial<Mst_AmplitudeApprOrd>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_AmplitudeApprOrd>,
          ApiResponse<string>
        >("/MstAmplitudeApprOrd/ExportByListDealerCode", {
          ListDealerCode: keys
            .map((item: Partial<Mst_AmplitudeApprOrd>) => item.DealerCode)
            .join(","),
          ListModelCode: keys
            .map((item: Partial<Mst_AmplitudeApprOrd>) => item.ModelCode)
            .join(","),
        });
      }

      return await apiBase.post<
        Partial<Mst_AmplitudeApprOrd>,
        ApiResponse<string>
      >("/MstAmplitudeApprOrd/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_AmplitudeApprOrd_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_AmplitudeApprOrd>,
        ApiResponse<string>
      >("/MstAmplitudeApprOrd/ExportTemplate");
    },

    Mst_AmplitudeApprOrd_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_AmplitudeApprOrd>>(
        "/MstAmplitudeApprOrd/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_AmplitudeApprOrd_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstAmplitudeApprOrd/Import",
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
