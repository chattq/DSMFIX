import {
  ApiResponse,
  Mst_RateApprOrderModelMax,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_RateApprOrderModelMaxApi = (apiBase: AxiosInstance) => {
  return {
    Mst_RateApprOrderModelMax_Search: async (
      params: Partial<SearchParam>
    ): Promise<ApiResponse<Mst_RateApprOrderModelMax>> => {
      return await apiBase.post<
        Partial<SearchParam>,
        ApiResponse<Mst_RateApprOrderModelMax>
      >("/MstRateApprOrderModelMax/Search", {
        ...params,
      });
    },
    Mst_RateApprOrderModelMax_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_RateApprOrderModelMax>,
        ApiResponse<Mst_RateApprOrderModelMax>
      >("/MstRateApprOrderModelMax/GetAllActive");
    },
    Mst_RateApprOrderModelMax_Create: async (
      values: Partial<Mst_RateApprOrderModelMax>
    ) => {
      return await apiBase.post<any, ApiResponse<Mst_RateApprOrderModelMax>>(
        "/MstRateApprOrderModelMax/Create",
        {
          strJson: JSON.stringify({
            ...values,
          }),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Mst_RateApprOrderModelMax_Update: async (
      code: any,
      values: Partial<Mst_RateApprOrderModelMax>
    ) => {
      return await apiBase.post<string, ApiResponse<Mst_RateApprOrderModelMax>>(
        "/MstRateApprOrderModelMax/Update",
        {
          strJson: JSON.stringify({
            ...code,
            ...values,
          }),
          ColsUpd: Object.keys(values),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Mst_RateApprOrderModelMax_Delete: async (
      code: any
    ): Promise<ApiResponse<Mst_RateApprOrderModelMax>> => {
      return await apiBase.post<string, ApiResponse<Mst_RateApprOrderModelMax>>(
        "/MstRateApprOrderModelMax/Delete",
        code
      );
    },
    Mst_RateApprOrderModelMax_DeleteMultiple: async (
      code: any
    ): Promise<ApiResponse<Mst_RateApprOrderModelMax>> => {
      return await apiBase.post<string, ApiResponse<Mst_RateApprOrderModelMax>>(
        "/MstRateApprOrderModelMax/DeleteMultiple",
        { strJson: JSON.stringify(code) }
      );
    },
    Mst_RateApprOrderModelMax_Export: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_RateApprOrderModelMax>>(
        "/MstRateApprOrderModelMax/Export",
        params
      );
    },
    Mst_RateApprOrderModelMax_ExportByListDealerCode: async (
      obj: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_RateApprOrderModelMax>>(
        "/MstRateApprOrderModelMax/ExportByListDealerCode",
        obj
      );
    },
    Mst_RateApprOrderModelMax_Import: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      const resp = await apiBase.post<File, ApiResponse<any>>(
        "/MstRateApprOrderModelMax/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return {
        ...resp,
        isSuccess: resp.Data._strErrCode === "0",
      };
    },
    Mst_RateApprOrderModelMax_ExportTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_RateApprOrderModelMax>,
        ApiResponse<string>
      >("/MstRateApprOrderModelMax/ExportTemplate", {});
    },
  };
};
