import { convertDateToString } from "@/packages/common";
import {
  ApiResponse,
  FlagActiveEnum,
  Mst_CarSpec,
  SearchMst_CarSpecParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarSpecApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CarSpec_Search: async (
      params: Partial<SearchMst_CarSpecParam>
    ): Promise<ApiResponse<Mst_CarSpec>> => {
      return await apiBase.post<
        Partial<SearchMst_CarSpecParam>,
        ApiResponse<Mst_CarSpec>
      >("/MstCarSpec/Search", {
        ...params,
      });
    },
    Mst_CarSpec_GetAllActive: async () => {
      return await apiBase.post<Partial<Mst_CarSpec>, ApiResponse<Mst_CarSpec>>(
        "/MstCarSpec/GetAllActive"
      );
    },
    Mst_CarSpec_GetForCreate: async () => {
      return await apiBase.post<any, ApiResponse<Mst_CarSpec>>(
        "/MstCarSpec/GetForCreate",
        {
          ModelCode: "",
          StdOptCode: "",
          OCNCode: "",
          FlagActive: "",
        }
      );
    },
    Mst_CarSpec_Create: async (values: Partial<Mst_CarSpec>) => {
      return await apiBase.post<any, ApiResponse<Mst_CarSpec>>(
        "/MstCarSpec/Create",
        {
          strJson: JSON.stringify({
            ...values,
            QuotaDate: values.QuotaDate
              ? convertDateToString(values.QuotaDate)
              : "",
            FlagActive: !!values.FlagActive
              ? values.FlagActive
                ? FlagActiveEnum.Active
                : FlagActiveEnum.Inactive
              : FlagActiveEnum.Inactive,
          }),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Mst_CarSpec_Update: async (code: any, values: Partial<Mst_CarSpec>) => {
      return await apiBase.post<string, ApiResponse<Mst_CarSpec>>(
        "/MstCarSpec/Update",
        {
          strJson: JSON.stringify({
            ...code,
            ...values,
            QuotaDate: values.QuotaDate
              ? convertDateToString(values.QuotaDate)
              : "",
            FlagActive: !!values.FlagActive
              ? values.FlagActive
                ? FlagActiveEnum.Active
                : FlagActiveEnum.Inactive
              : FlagActiveEnum.Inactive,
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
    Mst_CarSpec_Delete: async (
      code: any
    ): Promise<ApiResponse<Mst_CarSpec>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarSpec>>(
        "/MstCarSpec/Delete",
        code
      );
    },
    Mst_CarSpec_DeleteMultiple: async (
      code: any
    ): Promise<ApiResponse<Mst_CarSpec>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarSpec>>(
        "/MstCarSpec/DeleteMultiple",
        { strJson: JSON.stringify(code) }
      );
    },
    Mst_CarSpec_Export: async (params: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_CarSpec>>(
        "/MstCarSpec/Export",
        params
      );
    },
    Mst_CarSpec_ExportByListCode: async (
      obj: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_CarSpec>>(
        "/MstCarSpec/ExportByListCode",
        {
          ListSpecCode: obj,
        }
      );
    },
    Mst_CarSpec_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      const resp = await apiBase.post<File, ApiResponse<any>>(
        "/MstCarSpec/Import",
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
    Mst_CarSpec_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_CarSpec>, ApiResponse<string>>(
        "/MstCarSpec/ExportTemplate",
        {}
      );
    },
  };
};
