import {
  ApiResponse,
  Mst_CarStdOpt,
  SearchMst_CarStdOptParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarStdOptApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CarStdOpt_Search: async (
      params: Partial<SearchMst_CarStdOptParam>
    ): Promise<ApiResponse<Mst_CarStdOpt>> => {
      return await apiBase.post<
        Partial<SearchMst_CarStdOptParam>,
        ApiResponse<Mst_CarStdOpt>
      >("/MstCarStdOpt/Search", {
        ...params,
      });
    },
    Mst_CarStdOpt_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_CarStdOpt>,
        ApiResponse<Mst_CarStdOpt>
      >("/MstCarStdOpt/GetAllActive");
    },
    Mst_CarStdOpt_Create: async (values: Partial<Mst_CarStdOpt>) => {
      return await apiBase.post<any, ApiResponse<Mst_CarStdOpt>>(
        "/MstCarStdOpt/Create",
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
    Mst_CarStdOpt_Update: async (code: any, values: Partial<Mst_CarStdOpt>) => {
      return await apiBase.post<string, ApiResponse<Mst_CarStdOpt>>(
        "/MstCarStdOpt/Update",
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
    Mst_CarStdOpt_Delete: async (
      code: any
    ): Promise<ApiResponse<Mst_CarStdOpt>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarStdOpt>>(
        "/MstCarStdOpt/Delete",
        code
      );
    },
    Mst_CarStdOpt_DeleteMultiple: async (
      code: any
    ): Promise<ApiResponse<Mst_CarStdOpt>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarStdOpt>>(
        "/MstCarStdOpt/DeleteMultiple",
        { strJson: JSON.stringify(code) }
      );
    },
    Mst_CarStdOpt_Export: async (params: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_CarStdOpt>>(
        "/MstCarStdOpt/Export",
        params
      );
    },
    Mst_CarStdOpt_ExportByListCode: async (
      obj: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_CarStdOpt>>(
        "/MstCarStdOpt/ExportByListCode",
        obj
      );
    },
    Mst_CarStdOpt_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      const resp = await apiBase.post<File, ApiResponse<any>>(
        "/MstCarStdOpt/Import",
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
    Mst_CarStdOpt_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_CarStdOpt>, ApiResponse<string>>(
        "/MstCarStdOpt/ExportTemplate",
        {}
      );
    },
  };
};
