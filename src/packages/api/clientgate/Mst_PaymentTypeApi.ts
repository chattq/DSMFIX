import { ApiResponse, Mst_PaymentType, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_PaymentTypeApi = (apiBase: AxiosInstance) => {
  return {
    Mst_PaymentType_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_PaymentType>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_PaymentType>>(
        "/MstPaymentType/Search",
        {
          ...params,
        }
      );
    },
    Mst_PaymentType_GetByPaymentType: async (
      PaymentType: string
    ): Promise<ApiResponse<Mst_PaymentType>> => {
      return await apiBase.post<string, ApiResponse<Mst_PaymentType>>(
        "/MstPaymentType/GetByPaymentType",
        {
          PaymentType: PaymentType,
        }
      );
    },

    Mst_PaymentType_Update: async (
      key: string,
      data: Partial<Mst_PaymentType>
    ): Promise<ApiResponse<Mst_PaymentType>> => {
      return await apiBase.post<
        Partial<Mst_PaymentType>,
        ApiResponse<Mst_PaymentType>
      >("/MstPaymentType/Update", {
        strJson: JSON.stringify({
          PaymentType: key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_PaymentType_Create: async (
      PaymentType: Partial<Mst_PaymentType>
    ): Promise<ApiResponse<Mst_PaymentType>> => {
      return await apiBase.post<
        Partial<Mst_PaymentType>,
        ApiResponse<Mst_PaymentType>
      >("/MstPaymentType/Create", {
        strJson: JSON.stringify(PaymentType),
      });
    },

    Mst_PaymentType_Delete: async (PaymentType: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_PaymentType>>(
        "/MstPaymentType/Delete",
        {
          PaymentType: PaymentType,
        }
      );
    },

    Mst_PaymentType_DeleteMultiple: async (listPaymentType: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_PaymentType>>(
        "/MstPaymentType/DeleteMultiple",
        {
          strJson: JSON.stringify(listPaymentType),
        }
      );
    },

    Mst_PaymentType_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstPaymentType/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_PaymentType_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_PaymentType>, ApiResponse<string>>(
        "/MstPaymentType/ExportTemplate",
        {}
      );
    },

    Mst_PaymentType_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_PaymentType>,
          ApiResponse<string>
        >("/MstPaymentType/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_PaymentType_ExportByListPaymentType: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_PaymentType>, ApiResponse<string>>(
        "/MstPaymentType/ExportByListPaymentType",
        {
          ListPaymentType: keys.join(","),
        }
      );
    },
  };
};
