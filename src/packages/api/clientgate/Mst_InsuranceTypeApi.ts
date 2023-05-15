import { ApiResponse, Mst_InsuranceType, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_InsuranceType = (apiBase: AxiosInstance) => {
  return {
    Mst_InsuranceType_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_InsuranceType>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InsuranceType>>(
        "/MstInsuranceType/Search",
        {
          ...param,
        }
      );
    },

    Mst_InsuranceType_Delete: async (
      key: Object
    ): Promise<ApiResponse<Mst_InsuranceType>> => {
      return await apiBase.post<string, ApiResponse<Mst_InsuranceType>>(
        "/MstInsuranceType/Delete",
        {
          ...key,
        }
      );
    },

    Mst_InsuranceType_Create: async (
      data: Partial<Mst_InsuranceType>
    ): Promise<ApiResponse<Partial<Mst_InsuranceType>>> => {
      return apiBase.post<
        Partial<Mst_InsuranceType>,
        ApiResponse<Mst_InsuranceType>
      >("/MstInsuranceType/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_InsuranceType_Update: async (
      key: Object,
      data: Partial<Mst_InsuranceType>
    ): Promise<ApiResponse<Mst_InsuranceType>> => {
      return await apiBase.post("/MstInsuranceType/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_InsuranceType_ExportExcel: async (
      keys: any[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_InsuranceType>,
          ApiResponse<string>
        >("/MstInsuranceType/ExportByListCode", {
          ListInsCompanyCode: keys
            .map((item: Partial<Mst_InsuranceType>) => item.InsCompanyCode)
            .join(","),
          ListInsTypeCode: keys
            .map((item: Partial<Mst_InsuranceType>) => item.InsTypeCode)
            .join(","),
          ListEffectiveDate: keys
            .map((item: Partial<Mst_InsuranceType>) => item.EffectiveDate)
            .join(","),
        });
      }

      return await apiBase.post<
        Partial<Mst_InsuranceType>,
        ApiResponse<string>
      >("/MstInsuranceType/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_InsuranceType_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_InsuranceType>,
        ApiResponse<string>
      >("/MstInsuranceType/ExportTemplate");
    },

    Mst_InsuranceType__DeleteMultiple: async (data: Object[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_InsuranceType>>(
        "/MstInsuranceType/DeleteMultiple",
        {
          strJson: JSON.stringify(
            data.map((item) => ({
              item,
            }))
          ),
        }
      );
    },

    Mst_InsuranceType_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstInsuranceType/Import",
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
