import { ApiResponse, Mst_InsuranceFee, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_InsuranceFee = (apiBase: AxiosInstance) => {
  return {
    Mst_InsuranceFee_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_InsuranceFee>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InsuranceFee>>(
        "/MstInsuranceFee/Search",
        {
          ...param,
        }
      );
    },

    Mst_InsuranceFee_Delete: async (
      key: string
    ): Promise<ApiResponse<Mst_InsuranceFee>> => {
      return await apiBase.post<string, ApiResponse<Mst_InsuranceFee>>(
        "/MstInsuranceFee/Delete",
        {
          InsuranceContractNo: key,
        }
      );
    },

    Mst_InsuranceFee_Create: async (
      data: Partial<Mst_InsuranceFee>
    ): Promise<ApiResponse<Partial<Mst_InsuranceFee>>> => {
      return apiBase.post<
        Partial<Mst_InsuranceFee>,
        ApiResponse<Mst_InsuranceFee>
      >("/MstInsuranceFee/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_InsuranceFee_Update: async (
      key: string,
      data: Partial<Mst_InsuranceFee>
    ): Promise<ApiResponse<Mst_InsuranceFee>> => {
      return await apiBase.post("/MstInsuranceFee/Update", {
        strJson: JSON.stringify({
          ...data,
          InsuranceContractNo: key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_InsuranceFee_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_InsuranceFee>,
          ApiResponse<string>
        >("/MstInsuranceFee/ExportByListCode", {
          ListInsuranceContractNo: keys.join(","),
        });
      }

      return await apiBase.post<Partial<Mst_InsuranceFee>, ApiResponse<string>>(
        "/MstInsuranceFee/Export",
        {
          KeyWord: keyword,
          FlagActive: "",
        }
      );
    },

    Mst_InsuranceFee_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<Mst_InsuranceFee>, ApiResponse<string>>(
        "/MstInsuranceFee/ExportTemplate"
      );
    },

    Mst_InsuranceFee_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InsuranceFee>>(
        "/MstInsuranceFee/DeleteMultiple",
        {
          strJson: JSON.stringify(
            data.map((item) => ({
              InsuranceContractNo: item,
            }))
          ),
        }
      );
    },

    Mst_InsuranceFee_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstInsuranceFee/Import",
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
