import {
  ApiResponse,
  SearchParam,
  Mst_InsuranceCompany,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_InsuranceCompany = (apiBase: AxiosInstance) => {
  return {
    Mst_InsuranceCompany_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_InsuranceCompany>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InsuranceCompany>>(
        "/MstInsuranceCompany/Search",
        {
          ...params,
        }
      );
    },
    Mst_InsuranceCompany_GetAllActive: async (): Promise<
      ApiResponse<Mst_InsuranceCompany>
    > => {
      return await apiBase.post<any, ApiResponse<Mst_InsuranceCompany>>(
        "/MstInsuranceCompany/GetAllActive"
      );
    },
    Mst_InsuranceCompany_Create: async (
      InsCompanyCode: Partial<Mst_InsuranceCompany>
    ): Promise<ApiResponse<Mst_InsuranceCompany>> => {
      return await apiBase.post<
        Partial<Mst_InsuranceCompany>,
        ApiResponse<Mst_InsuranceCompany>
      >("/MstInsuranceCompany/Create", {
        strJson: JSON.stringify(InsCompanyCode),
      });
    },

    Mst_InsuranceCompany_Delete: async (InsCompanyCode: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InsuranceCompany>>(
        "/MstInsuranceCompany/Delete",
        {
          InsCompanyCode: InsCompanyCode,
        }
      );
    },
    Mst_InsuranceCompany_Delete_Multiple: async (InsCompanyCodes: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InsuranceCompany>>(
        "/MstInsuranceCompany/DeleteMultiple",
        {
          strJson: JSON.stringify(
            InsCompanyCodes.map((InsCompanyCode) => ({
              InsCompanyCode: InsCompanyCode,
            }))
          ),
        }
      );
    },
    Mst_InsuranceCompany_Update: async (
      key: string,
      data: Partial<Mst_InsuranceCompany>
    ): Promise<ApiResponse<Mst_InsuranceCompany>> => {
      return await apiBase.post<
        Partial<Mst_InsuranceCompany>,
        ApiResponse<Mst_InsuranceCompany>
      >("/MstInsuranceCompany/Update", {
        strJson: JSON.stringify({
          InsCompanyCode: key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },
    Mst_InsuranceCompany_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/MstInsuranceCompany/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Mst_InsuranceCompany_ExportTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_InsuranceCompany>,
        ApiResponse<string>
      >("/MstInsuranceCompany/ExportTemplate", {});
    },
    Mst_InsuranceCompany_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      console.log("key ", keys);
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_InsuranceCompany>,
          ApiResponse<string>
        >("/MstInsuranceCompany/ExportByListCode", {
          ListInsCompanyCode: keys.join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Mst_InsuranceCompany>,
          ApiResponse<string>
        >("/MstInsuranceCompany/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },
  };
};
